import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveOrder,
  declineOrder,
  getGroupLeadOrderApproveLabels,
  getOrdersToApprove,
} from "../../../store/Orders/thunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { PDFDocument } from "pdf-lib";
import { Collapse, Tooltip } from "antd";
const { Panel } = Collapse;
import Swal from "sweetalert2";
import { useScrollPosition } from "~/hooks/useScrollPosition";
import useGenaToast from "../toasts-modals/GenaToast";
import { formatDate } from "../../../func/resuableFunctions";

const LeadsOrderApproval = () => {
  const dispatch = useDispatch();
  const [modifiedPdfDataUris, setModifiedPdfDataUris] = useState([]);
  const [orderCollapse, setOrderCollapse] = useState(false);
  const [decline, setDecline] = useState(false);
  const order = useSelector((state) => state.Orders.leadDepartmentOrders);
  const labels = useSelector((state) => state.Orders.labelsToApprove);
  const containerRef = useRef(null);
  const scrollPosition = useScrollPosition(containerRef);
  const { successToast, errorToast, contextHolder } = useGenaToast();
  const statusColors = {
    "waiting for approval": "bg-[#ef5350]",
    processing: "bg-[#ff9800]",
    approved: "bg-[#1baded]",
    delivered: "bg-[#63cb67]",
  };

  const getLabels = () => {
    let arr = [];
    for (let i = 0; i < order.length; i++) {
      const ord = order[i];
      arr.push(ord._id);
    }
    dispatch(getGroupLeadOrderApproveLabels(arr));
  };

  useEffect(() => {
    getLabels();
  }, []);

  const handleOrderDeletion = (orderId) => {
    setModifiedPdfDataUris((prevModifiedPdfDataUris) => {
      const updatedModifiedPdfDataUris = prevModifiedPdfDataUris.filter(
        (_, index) => index !== orderId
      );
      return updatedModifiedPdfDataUris;
    });
    getLabels();
  };

  const stopOrder = async (id, name, index) => {
    const token = sessionStorage.getItem("accessToken");
    Swal.fire({
      title: `Decline ${name}'s Order?`,
      text: "You will not be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let timerInterval;
        await Swal.fire({
          title: `Declining Order: <br> ${id}`,
          html: `${name} will be notified`,
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        await dispatch(declineOrder({ token, id }));
        handleOrderDeletion(index);
        setDecline(!decline);
      }
    });
  };

  const approveOrderNow = async (id, name, index) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      await dispatch(approveOrder({ token, id }));
      await handleOrderDeletion(index);
      successToast(`Approved ${name}'s order!`, `OrderId: ${id}`);
    } catch (error) {
      console.log(error);
      errorToast(`Couldn't Approve order`, error);
    }
  };

  useEffect(() => {
    const modifyAndStorePdfDataUris = async () => {
      try {
        const modifiedPdfDataUris = await Promise.all(
          order.map(async (o, index) => {
            const dataURI = await Promise.all(
              labels[index].map(async (l, i) => {
                const uri = await modifyPdf(
                  `/api/getPdfs?categoryName=${l.categoryName}&subCategoryName=${l.subCategoryName}&fileName=${l.fileName}`,
                  o.labels[i].textToPut
                );
                return uri;
              })
            );
            return dataURI;
          })
        );
        setModifiedPdfDataUris(modifiedPdfDataUris);
      } catch (error) {
        console.error("Error modifying PDF:", error);
      }
    };
    modifyAndStorePdfDataUris();
  }, [labels, order]);

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
      }
      const modifiedPdfBytes = await pdfDoc.save();
      const pdfDataUri = createDataUri(modifiedPdfBytes);
      return pdfDataUri;
    } catch (error) {
      const existingPdfBytes = await fetch(path).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const form = pdfDoc.getForm();
      const fieldNames = form.getFields().map((field) => field.getName());

      for (let i = 0; i < fieldNames.length; i++) {
        const fieldName = fieldNames[i];
        const checkbox = form.getCheckBox(fieldName);
        if (text[i].text == "true") {
          checkbox.check();
        }
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const pdfDataUri = await createDataUri(modifiedPdfBytes);

      return pdfDataUri;
    }
  };

  const createDataUri = async (pdfBytes) => {
    const pdfData = await new Blob([pdfBytes], { type: "application/pdf" });
    const dataUri = await URL.createObjectURL(pdfData);
    return dataUri;
  };

  return (
    <div ref={containerRef}>
      {order.length > 0
        ? order.map((o, index) => (
            <div
              key={o._id}
              className="border-t"
              onClick={() => {
                setOrderCollapse(!orderCollapse);
              }}
            >
              <Collapse
                size="large"
                bordered={false}
                className=" hover:bg-slate-100 "
              >
                <Panel
                  showArrow={false}
                  header={
                    <div
                      className="grid grid-cols-4 justify-items-center justify-between"
                      key={o._id}
                    >
                      <p>{o.creatorName}</p>
                      {/* <p>{o._id}</p> */}
                      {/* <p className=''>{o.labels.length}</p> */}
                      <p className="">{formatDate(o.createdOn)}</p>
                      <span
                        className={`px-5 ${
                          statusColors[o.status]
                        } text-white rounded-lg max-h-8 flex items-center`}
                      >
                        {o.status}
                      </span>
                      <div className="flex gap-5 w-32 place-self-end">
                        <Tooltip placement="top" title="Approve Order">
                          <button
                            onClick={() =>
                              approveOrderNow(o._id, o.creatorName, index)
                            }
                            className="text-[#233043] hover:bg-[#25d125] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full"
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </button>
                        </Tooltip>
                        <Tooltip placement="top" title="Decline Order">
                          <button
                            onClick={() =>
                              stopOrder(o._id, o.creatorName, index)
                            }
                            className="text-[#233043] hover:bg-[#ff1b1b] hover:text-white transition-all 
                            ease-in-out w-7 h-7 rounded-full"
                          >
                            <FontAwesomeIcon icon={faXmarkCircle} />
                          </button>
                        </Tooltip>
                        {o.notes ? (
                          <Tooltip placement="top" title={o.notes}>
                            <button className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full">
                              <FontAwesomeIcon icon={faNoteSticky} />
                            </button>
                          </Tooltip>
                        ) : null}
                      </div>
                    </div>
                  }
                >
                  <div className="grid grid-cols-3 pt-3 border-t">
                    {modifiedPdfDataUris.length > 0
                      ? modifiedPdfDataUris[index].map((d) => (
                          <div key={d}>
                            <div className="mx-2 mb-3 text-center">
                              <iframe src={d} className="w-full"></iframe>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  <div className="grid grid-cols-3 pt-3">
                    {labels.length > 0 && order.length > 0
                      ? labels[index].map((l, i) => (
                          <div key={i} className="text-center mx-2 ">
                            <div className=" bg-gray-200 rounded-md">
                              {o.labels &&
                              o.labels[i] &&
                              o.labels[i].qty !== undefined ? (
                                <b>
                                  Printing QTY: {o.labels[i].qty * l.unitPack}
                                </b>
                              ) : (
                                <b>Printing QTY: N/A</b>
                              )}
                            </div>
                            <div className=" bg-gray-200 rounded-md mt-2">
                              <b>DOC: {l.docNum}</b>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </Panel>
              </Collapse>
            </div>
          ))
        : null}
    </div>
  );
};

export default LeadsOrderApproval;
