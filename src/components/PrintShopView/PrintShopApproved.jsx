import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Collapse, Divider, Tooltip } from "antd";
import {
  PrinterOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import fontkit from '@pdf-lib/fontkit';
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
import { PDFDocument, StandardFonts } from "pdf-lib";
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
              o.labels?.map(async (label, i) => {
                const p = pdf[index][i];
                const modifiedPdfDataUri = await modifyPdf(
                  `/api/getPdfs?categoryName=${p.categoryName}&subCategoryName=${p.subCategoryName}&fileName=${p.fileName}`,
                  label.textToPut,
                  p.subCategoryName
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

  const modifyPdf = async (path, text, subCategory) => {
    try {
      const existingPdfBytes = await fetch(path).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      let customFont;
      if (subCategory == 'floor-labels') {
        try {
          console.log("FONTKIT RUNNING", subCategory)
          pdfDoc.registerFontkit(fontkit)
        const bytes = await fetch('/fonts/impact.ttf').then((res) => res.arrayBuffer())
        customFont = await pdfDoc.embedFont(bytes)
        } catch (error) {
          console.log(error)
        }

      } else {

        customFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      }

      
      const form = pdfDoc.getForm();
      const fieldNames = form.getFields().map((field) => field.getName());

  


      for (let i = 0; i < fieldNames.length; i++) {
        const fieldName = fieldNames[i];
        if (fieldName == "AREA") {
          const dropdown = form.getDropdown(fieldName);
          if (!text[i].text || text[i].text == "") {
            continue
          } else {
            dropdown.select(text[i].text);
          }
        } else {
          const fieldToFill = form.getTextField(fieldName);
          fieldToFill.setText(text[i].text);
          fieldToFill.updateAppearances(customFont)

          
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
      return modifiedPdfDataUris[index]?.map((m) => {
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
                  header={`${o.creatorName} - ${o._id} - ${formatDate(
                    o.createdOn
                  )}`}
                  key={o._id}
                  extra={
                    <div className="flex">
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
                    </div>
                  }
                > 
                  <div className="relative -top-5 text-gray-500">{o.orderName}</div>
                  {/* <div className="grid grid-cols-3">{seeString(index)}</div> */}
                  <div className="grid grid-cols-3">
                    {pdf && o.labels.length > 0
                      ? pdf[index].map((p, i) => {
                          return (
                            <div key={i} className="mb-5 border-b">
                              <div key={modifiedPdfDataUris?.[index]?.[i]} className="">
                                <iframe src={modifiedPdfDataUris?.[index]?.[i]} className="w-11/12"></iframe>
                              </div>
                              <div className="text-sm mt-1 mb-3 pl-[4%]">
                                DOCNUM: {p.docNum}
                              </div>
                              <div className="mb-3 pl-[4%]">
                                QTY to be Printed:{" "}
                                {o.labels[i].qty * p.unitPack}
                              </div>
                              <div className="mb-3 pl-[4%]">
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
