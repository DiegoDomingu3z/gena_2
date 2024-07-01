import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { getMyOrders, updateLabel } from "../../../store/Orders/thunks";
import Swal from "sweetalert2";
import { PDFDocument, fill } from "pdf-lib";
import { RingLoader } from "react-spinners";
import { Popover, Tag } from "antd";
import { editableStatus } from "../../../lib/vars";

const UpdateOrderCard = ({ modalState, blobs, setBlobs }) => {
  const dispatch = useDispatch();
  const [modifiedPDFs, setModifiedPDFs] = useState({});
  const [triggerPdfRender, setTriggerPdfRender] = useState(0);
  const [labelOptions, setLabelOptions] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [iframeKeys, setIframeKeys] = useState({});
  const [activeOrder] = useSelector((state) => state.Orders.activeOrder);
  const labelsArray = useSelector((state) => state.Orders.myOrders.arr);
  const labels = activeOrder ? activeOrder.labels : [];
  const activeLabels = labelsArray
    ?.flatMap((innerArray) => innerArray)
    ?.filter((value, i) => {
      return value.orderId == activeOrder?._id;
    }) ?? []

  useEffect(() => {
    activeLabels.forEach((l, i) => {
      fetch(
        `/api/getPdfs?categoryName=${l.categoryName}&subCategoryName=${l.subCategoryName}&fileName=${l.fileName}`
      )
        .then((res) => res.arrayBuffer())
        .then(async (data) => {
          try {
            const pdfDoc = await PDFDocument.load(data);
            const form = pdfDoc.getForm();
            const fieldNames = form.getFields().map((field) => field.getName());
            if (fieldNames.includes("AREA")) {
              const dropdown = form.getDropdown("AREA");
              const options = dropdown.getOptions();
              let filtered = [];
              for (let i = 0; i < options.length; i++) {
                if (!filtered.includes(options[i])) {
                  filtered.push(options[i]);
                } else {
                  continue;
                }
              }
              setLabelOptions(options);
            }
            labels[i].textToPut?.map((field) => {
              if (field.text === "true" || field.text === "false") {
                setCheckboxStates((prevStates) => ({
                  ...prevStates,
                  [field._id]: field.text === "true",
                }));
              }
            });
          } catch (error) {
            console.error("Error loading PDF document:", error);
          }
        });
    });
  }, [activeOrder]);

  useEffect(() => {
    setBlobs([]);
    const l = [];
    const modifyPaths = async () => {
      for (let i = 0; i < activeLabels.length; i++) {
        const label = activeLabels[i];
        const modifiedLabel = await modifyPdf(
          `/api/getPdfs?categoryName=${label.categoryName}&subCategoryName=${label.subCategoryName}&fileName=${label.fileName}`,
          labels[i].textToPut
        );
        setBlobs((prev) => [...prev, modifiedLabel]);
        l.push(modifiedLabel);
      }
      setBlobs(l);
    };
    modifyPaths();
  }, [activeOrder]);

  const toast = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
        container: "addToCartToast",
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: "success",
      title: "Label Updated!",
    });
  };
  const qtyTooHighToast = async (qty) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      iconColor: "orange",
      customClass: {
        popup: "colored-toast",
        container: "addToCartToast",
      },
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: "warning",
      title: `Exceeds Max Quantity of ${qty}`,
    });
  };
  const handleCheckboxChange = (fieldId, isChecked) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [fieldId]: isChecked,
    }));
  };

  const modifyPdf = async (path, text) => {
    try {
      const existingPdfBytes = await fetch(path).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const form = pdfDoc.getForm();
      const fieldNames = form.getFields().map((field) => field.getName());
      for (let i = 0; i < fieldNames.length; i++) {
        const fieldName = fieldNames[i];
        try {
          if (fieldName == "AREA") {
            const dropdown = form.getDropdown(fieldName);
            if (!text[i].text || text[i].text == "") {
              continue;
            } else {
              dropdown.select(text[i].text);
            }
          } else {
            const fieldToFill = form.getTextField(fieldName);
            fieldToFill.setText(text[i].text);
          }
        } catch (error) {
          const checkbox = form.getCheckBox(fieldName);
          if (text[i].text == "true") {
            checkbox.check();
          }
        }
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const pdfDataUri = createDataUri(modifiedPdfBytes);

      return pdfDataUri;
    } catch (error) {
      console.error("Error modifying PDF:", error);
      throw error;
    }
  };

  const createDataUri = (pdfBytes) => {
    const pdfData = new Blob([pdfBytes], { type: "application/pdf" });
    const dataUri = URL.createObjectURL(pdfData);
    return dataUri;
  };

  const seeLabels = (index) => {
    if (blobs.length > 0) {
      return (
        <div className="w-full h-[15rem] rounded-md justify-center flex items-center">
          <iframe
            src={blobs[index]}
            width="100%"
            height="100%"
            className="rounded-t-md"
            key={index}
          ></iframe>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <RingLoader color="#36d7b7" />
        </div>
      );
    }
  };

  const label = activeLabels.map((label, i) => {
    const { pdf, docNum, name } = label;
    let vals = labels[i].textToPut.reduce(
      (acc, curr) => {
        acc[curr.name] = curr.text || "";
        return acc;
      },
      {
        showFields: false,
      }
    );
    vals.qty = labels[i].qty;

    return (
      <div key={label._id}>
        <Formik
          initialValues={vals}
          enableReinitialize
          onSubmit={async (values) => {
            delete values.showFields;
            const valuesArray = Object.keys(values).map((key) => {
              return { [key]: values[key] };
            });
            const token = sessionStorage.getItem("accessToken");
            const orderId = label.orderId;
            const labelId = label._id;
            try {
              if (values.qty <= label.maxOrderQty) {
                await dispatch(
                  updateLabel({ token, orderId, labelId, valuesArray })
                );
                await dispatch(getMyOrders(token));
                toast();
                return;
              }
              qtyTooHighToast(label.maxOrderQty);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form key={i} id={label.labelId}>
              <div className="bg-white w-full max-w-[300px] h-76 laptop:h-auto rounded-md drop-shadow-md">
                {seeLabels(i)}
                <div className="px-4 pt-4 pb-2">
                  <div className="font-medium">{label.docNum}</div>
                  <Popover content={label.name}>
                    <div className=" text-gray-500 text-sm truncate max-w-[220px]">
                      {label.name}
                    </div>
                  </Popover>
                  <div className="text-sm text-gray-500">
                    <span>Pack of {label.unitPack}</span>
                  </div>
                  {activeOrder.labels[i].serialRange && (
                    <div className="text-sm text-gray-500 mt-2 flex items-center">
                      <Tag color="green">Serial Number</Tag>
                      <span className="ml-auto label-text-alt">
                        {activeOrder.labels[i].serialRange}
                      </span>
                    </div>
                  )}
                  {editableStatus.includes(activeOrder.status) && (
                    <div className="h-[1px] w-full bg-gray-200 my-3"></div>
                  )}
                  {editableStatus.includes(activeOrder.status) && (
                    <div
                      className="text-gray-400 font-light w-full cursor-pointer flex gap-2 items-center"
                      onClick={() =>
                        setFieldValue("showFields", !values.showFields)
                      }
                    >
                      <svg
                        className="w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M7.2 21C6.07989 21 5.51984 21 5.09202 20.782C4.71569 20.5903 4.40973 20.2843 4.21799 19.908C4 19.4802 4 18.9201 4 17.8V6.2C4 5.07989 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V7M8 7H14M8 15H9M8 11H12M11.1954 20.8945L12.5102 20.6347C13.2197 20.4945 13.5744 20.4244 13.9052 20.2952C14.1988 20.1806 14.4778 20.0317 14.7365 19.8516C15.0279 19.6486 15.2836 19.393 15.7949 18.8816L20.9434 13.7332C21.6306 13.0459 21.6306 11.9316 20.9434 11.2444C20.2561 10.5571 19.1418 10.5571 18.4546 11.2444L13.2182 16.4808C12.739 16.96 12.4994 17.1996 12.3059 17.4712C12.1341 17.7123 11.9896 17.9717 11.8751 18.2447C11.7461 18.5522 11.6686 18.882 11.5135 19.5417L11.1954 20.8945Z"
                            stroke="#6b7280"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      <span>{values.showFields ? "Hide" : "Show"} fields</span>
                      <svg
                        className={`w-7 ml-auto transition-all ease-in-out ${
                          values.showFields ? "" : "rotate-90"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M16.0686 9H7.9313C7.32548 9 7.02257 9 6.88231 9.1198C6.76061 9.22374 6.69602 9.37967 6.70858 9.53923C6.72305 9.72312 6.93724 9.93731 7.36561 10.3657L11.4342 14.4343C11.6322 14.6323 11.7313 14.7313 11.8454 14.7684C11.9458 14.8011 12.054 14.8011 12.1544 14.7684C12.2686 14.7313 12.3676 14.6323 12.5656 14.4343L16.6342 10.3657C17.0626 9.93731 17.2768 9.72312 17.2913 9.53923C17.3038 9.37967 17.2392 9.22374 17.1175 9.1198C16.9773 9 16.6744 9 16.0686 9Z"
                            stroke="#6b7280"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                  )}
                  {editableStatus.includes(activeOrder.status) && (
                    <div
                      className={`transition-all overflow-hidden ease-in-out ${
                        values.showFields ? "max-h-[600px]" : "max-h-[0px]"
                      }`}
                      key={label._id}
                    >
                      <div className="flex flex-col">
                        <label
                          className="label pb-[2px] label-text-alt font-medium uppercase text-gray-500"
                          htmlFor={label.docNum}
                        >
                          Quantity{" "}
                          <span className="lowercase text-gray-500 font-light text-sm">
                            (Max: {label.maxOrderQty})
                          </span>
                        </label>
                        <Field
                          className="input mb-2 input-bordered rounded-md focus:outline-none input-sm w-20"
                          type="number"
                          max={label.maxOrderQty}
                          placeholder={`Qty`}
                          name="qty"
                          required
                          key={label.docNum}
                          id={label.docNum}
                          min="1"
                        />
                      </div>
                      {labels[i].textToPut.map((field, index) => {
                        if (field.name == "AREA") {
                          return (
                            <div
                              key={field._id}
                              className={
                                field.text === "true" || field.text === "false"
                                  ? "flex gap-5"
                                  : ""
                              }
                            >
                              <label
                                htmlFor={`${index}_${field._id}`}
                                className="label label-text-alt uppercase text-gray-500 font-medium pb-[2px]"
                              >
                                {field.name}
                              </label>
                              <Field
                                component="select"
                                className="input input-bordered rounded-md w-full max-w-xs input-sm focus:outline-none"
                                name={field.name}
                                id={field.name}
                                key={field._id}
                                required
                              >
                                {labelOptions.length > 0
                                  ? labelOptions.map((o, index) => (
                                      <option
                                        key={`${index}_${field._id}`}
                                        id={o}
                                        name={o}
                                        value={o}
                                      >
                                        {o}
                                      </option>
                                    ))
                                  : null}
                              </Field>
                            </div>
                          );
                        } else if (field.text != "") {
                          return (
                            <div
                              key={field._id}
                              className={
                                field.text === "true" || field.text === "false"
                                  ? "flex gap-5 mt-1"
                                  : "mt-1"
                              }
                            >
                              <div
                                className={`${
                                  field.text === "true" ||
                                  field.text === "false"
                                    ? "flex items-center gap-3"
                                    : ""
                                }`}
                              >
                                <label
                                  htmlFor={field._id}
                                  className={`label-text-alt uppercase text-gray-500 font-medium pb-[2px] ${
                                    field.text === "true" ||
                                    field.text === "false"
                                      ? "order-2"
                                      : ""
                                  }`}
                                >
                                  {field.name}
                                </label>

                                {/* This renders if the field is NOT a checkbox */}

                                {field.text !== "true" &&
                                  field.text !== "false" && (
                                    <Field
                                      className={
                                        "input rounded-md input-bordered w-full max-w-xs input-sm focus:outline-none"
                                      }
                                      name={field.name}
                                      type="text"
                                      id={field._id}
                                      key={field._id}
                                      required={false}
                                    />
                                  )}

                                {/* This renders if the field IS a checkbox */}

                                {(field.text === "true" ||
                                  field.text === "false") && (
                                  <Field
                                    className={"checkbox rounded-md"}
                                    name={field.name}
                                    type="checkbox"
                                    checked={checkboxStates[field._id] || false}
                                    id={field._id}
                                    key={field._id}
                                    required={false}
                                    onChange={(e) => {
                                      handleCheckboxChange(
                                        field._id,
                                        e.target.checked
                                      );
                                      setFieldValue(
                                        field.name,
                                        e.target.checked.toString()
                                      );
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                  {editableStatus.includes(activeOrder.status) && (
                    <div
                      className={`mt-3 overflow-hidden transition-all ease-in-out ${
                        values.showFields ? "max-h-[500px]" : "max-h-[0px]"
                      }`}
                    >
                      <button
                        className="btn w-full btn-sm bg-darkBlue hover:bg-darkBlue hover:bg-opacity-90"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Update Label
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  });

  return <>{label}</>;
};

export default UpdateOrderCard;
