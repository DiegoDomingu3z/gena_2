import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PDFDocument } from "pdf-lib";
import { RingLoader } from "react-spinners";
import { Popover } from "antd";
import Swal from "sweetalert2";

const OrderApprovalModalCard = ({ blobs, setBlobs }) => {
  const [activeOrder] = useSelector((state) => state.Orders.activeOrder);
  const labelsArray = useSelector((state) => state.Orders.labelsToApprove);
  const labels = activeOrder ? activeOrder.labels : [];
  const activeLabels = labelsArray
    ?.flatMap((innerArray) => innerArray)
    ?.filter((value) => {
      return value.orderId == activeOrder?._id;
    }) ?? []

  useEffect(() => {
    activeLabels.forEach(({ _doc: l }, i) => {
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
        const label = activeLabels[i]._doc;
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

  const label = activeLabels.map(({ _doc: label }, i) => {
    const quantity = labels[i].qty;

    return (
      <div key={i}>
        <div className="bg-white w-full max-w-[300px] h-76 laptop:h-auto rounded-md drop-shadow-md">
          {seeLabels(i)}
          <div className="px-4 pt-4 pb-2">
            <div className="font-medium">{label.docNum}</div>
            <Popover content={label.name}>
              <div className=" text-gray-500 text-sm truncate max-w-[220px]">
                {label.name}
              </div>
            </Popover>
            {activeOrder.labels[i].serialRange && (
              <div className="text-center text-md text-gray-500 mb-2">
                <div className="text-red-500 w-full">Serials on this roll:</div>
                {activeOrder.labels[i].serialRange}
              </div>
            )}
            <div className="text-sm text-gray-500">
              <span>Pack of {label.unitPack}</span>
            </div>
            <div className="text-sm text-gray-500">
              <span>
                Qty ordered: <span className="font-medium">{quantity}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <>{label}</>;
};

export default OrderApprovalModalCard;
