import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Collapse, Divider, Tooltip } from "antd";
import {
  PrinterOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { BeatLoader, RingLoader } from "react-spinners";
import { getAllUsers } from "../../../store/Account/thunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNoteSticky,
  faCheckCircle,
  faAdd,
  faFile,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  getApprovedOrders,
  getDeliveredOrders,
  getProcessingOrder,
  printOrder,
} from "../../../store/PrintShop/Thunks";
import { PDFDocument } from "pdf-lib";
import Swal from "sweetalert2";
import { getMaterials } from "../../../store/Material/Thunks";
const { Panel } = Collapse;
const PrintShopApproved = ({ multipleOrders, setMultipleOrders }) => {
  //////////////////////////////////// VARIABLES ///////////////////////////////////
  const order = useSelector((state) => state.PrintShop.approvedOrders.orders);
  const pdf = useSelector((state) => state.PrintShop.approvedOrders.arr);
  const user = useSelector((state) => state.Account.users);
  const materials = useSelector((state) => state.Material.materials);
  const [orders, setOrders] = useState([]);
  const [modifiedPdfDataUris, setModifiedPdfDataUris] = useState([]);
  const dispatch = useDispatch();
  ///////////////////////////////////////////////////////////////////////////////////

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(getAllUsers());
    dispatch(getMaterials(token));
  }, []);

  const getUser = (id) => {
    const singleUser = user.filter((u) => u._id == id).shift();
    console.log(singleUser);
    return `${singleUser?.department}`;
  };

  const printLabels = async (id) => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(printOrder({ token, id }))
      .then(async (res) => {
        await dispatch(getApprovedOrders(token));
        await dispatch(getProcessingOrder(token));
        await dispatch(getDeliveredOrders(token));
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
            container: "top-margin",
          },
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        await Toast.fire({
          icon: "success",
          title: `Processing Order ID: ${id}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const modifyAndStorePdfDataUris = async () => {
      try {
        const modifiedPdfDataUris = await Promise.all(
          order.map(async (o, index) => {
            const modifiedPdfDataUrisForOrder = await Promise.all(
              o.labels.map(async (label, i) => {
                const p = pdf[index][i];
                const modifiedPdfDataUri = await modifyPdf(
                  `/api/getPdfs?categoryName=${p.categoryName}&subCategoryName=${p.subCategoryName}&fileName=${p.fileName}`,
                  label.textToPut
                );
                return modifiedPdfDataUri;
              })
            );
            return modifiedPdfDataUrisForOrder;
          })
        );
        setModifiedPdfDataUris(modifiedPdfDataUris);
      } catch (error) {
        console.error("Error modifying PDF:", error);
      }
    };

    modifyAndStorePdfDataUris();
  }, [pdf]);

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
          dropdown.select(text[i].text);
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
      const pdfDataUri = createDataUri(modifiedPdfBytes);

      return pdfDataUri;
    }
  };

  // create blob to make new
  const createDataUri = (pdfBytes) => {
    const pdfData = new Blob([pdfBytes], { type: "application/pdf" });
    const dataUri = URL.createObjectURL(pdfData);
    return dataUri;
  };

  const seeString = (index) => {
    if (modifiedPdfDataUris.length > 0) {
      return modifiedPdfDataUris[index].map((m) => {
        return (
          <div key={m} className="">
            <iframe src={m} className="w-11/12"></iframe>
          </div>
        );
      });
    } else {
      return <div>&quot;SYSTEM DOWN&quot;</div>;
    }
  };

  return (
    <div>
      {order
        ? order.map((o, index) => (
            <div key={o._id}>
              <Divider orientation="left" className="flex">
                {" "}
                Department:{" "}
                {user.length > 0 ? (
                  <span>{getUser(o.creatorId)}</span>
                ) : (
                  <RingLoader size={6} />
                )}{" "}
              </Divider>
              <Collapse size="large">
                <Panel
                  onClick={() => console.log(o._id)}
                  header={`${o.creatorName} - ${o._id} - ${formatDate(
                    o.createdOn
                  )}`}
                  key={o._id}
                  extra={
                    <div>
                      {o.notes || o.notes != "" ? (
                        <Tooltip placement="top" title={o.notes}>
                          <button className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-8 rounded-full py-1">
                            <FontAwesomeIcon icon={faNoteSticky} />
                          </button>
                        </Tooltip>
                      ) : null}
                      {!multipleOrders.includes(o._id) ? (
                        <Tooltip
                          placement="top"
                          title={`Print ${o.creatorName}'s order?`}
                        >
                          <button
                            onClick={(event) => {
                              printLabels(o._id);
                              event.stopPropagation();
                            }}
                            className="text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-8 rounded-full pb-2"
                          >
                            <PrinterOutlined />
                          </button>
                        </Tooltip>
                      ) : null}
                      {/* {!multipleOrders.includes(o._id)
                                        ?
                                        <Tooltip placement="top" title={`Add to process multiple?`} >
                                            <button className='text-[#233043] hover:bg-[#22eb5e] hover:text-white transition-all ease-in-out w-8 rounded-full pb-2'>
                                                <UploadOutlined
                                                    onClick={(event) => {
                                                        setMultipleOrders(prevIds => [...prevIds, o._id])
                                                        event.stopPropagation();
                                                    }}
                                                />
                                            </button>
                                        </Tooltip>
                                        :
                                        <Tooltip title={`Remove from process multiple`}>
                                            <button>
                                                <BeatLoader size={8} color="red"
                                                    onClick={(event) => {
                                                        let newList = multipleOrders.filter(i => i != o._id)
                                                        setMultipleOrders(newList)
                                                        event.stopPropagation();
                                                    }}
                                                />
                                            </button>
                                        </Tooltip>
                                    } */}
                    </div>
                  }
                >
                  <div className="grid grid-cols-3">{seeString(index)}</div>
                  <div className="grid grid-cols-3">
                    {pdf && o.labels.length > 0
                      ? pdf[index].map((p, i) => {
                          return (
                            <div key={i} className="mb-5 border-b">
                              <div className="text-center text-sm">
                                DOCNUM: {p.docNum}
                              </div>
                              <div className="text-center mb-3 mt-1">
                                QTY to be Printed:{" "}
                                {o.labels[i].qty * p.unitPack}
                              </div>
                              <div className="text-center">
                                Material Type: {p.material}
                              </div>
                            </div>
                          );
                        })
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

export default PrintShopApproved;
