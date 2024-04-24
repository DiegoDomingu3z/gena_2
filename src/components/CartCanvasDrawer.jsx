import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  clearBasket,
  getBasketLabels,
  placeOrder,
  removeFromBasket,
} from "../../store/Orders/thunks";
import Swal from "sweetalert2";
import { PDFDocument } from "pdf-lib";
const CartCanvasDrawer = ({
  toggleCartCanvas,
  setToggleCartCanvas,
  render,
}) => {
  const [basketLabels, setBasketLabels] = useState([]);
  const [orderNote, setOrderNote] = useState("");
  const [orderName, setOrderName] = useState("");
  const [orderInput, setOrderInput] = useState({});
  const basket = useSelector((state) => state.Orders.labelBasket);
  const [invalidLabel, setInvalidLabel] = useState(false);
  const dispatch = useDispatch();
  // const handleNote = (event) => {
  //   let note = event.target.value;
  //   setOrderNote(note);
  // };
  // const handleOrderName = (event) => {
  //   let name = event.target.value;
  //   setOrderName(name);
  // };
  const handleInput = (event) => {
    let input = event.target.value;
    setOrderInput((previousInput) => {
      return {
        ...previousInput,
        [event.target.name]: input,
      };
    });
  };

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
      title: "Order Submitted!",
    });
  };

  const submitOrder = async () => {
    const token = sessionStorage.getItem("accessToken");
    await dispatch(placeOrder({ orderInput, basket, token }));
    setOrderInput({ orderNote: "", orderName: "" });
    const basketLabelsCopy = basketLabels.slice();
    basketLabelsCopy.splice(0, 1);
    setBasketLabels(basketLabelsCopy);
    toast();
    dispatch(clearBasket());
    setTimeout(() => {
      setToggleCartCanvas(!toggleCartCanvas);
    }, 500);
  };

  return (
    <div
      className={
        toggleCartCanvas
          ? "pt-6 top-0 right-0 w-96 bg-white drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col gap-5 overflow-hidden"
          : "pt-5 top-0 w-96 bg-white drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col -right-full gap-20 overflow-hidden"
      }
    >
      <div className="w-full flex flex-col justify-center mb-8">
        <button
          onClick={() => setToggleCartCanvas(!toggleCartCanvas)}
          className="border transition-all ease-in-out duration-300 hover:scale-110 bg-[#233043] hover:bg-white hover:text-inherit w-3/4 self-center rounded-md h-10 text-white text flex items-center justify-center gap-5"
        >
          <FontAwesomeIcon className="text-xl" icon={faArrowRightLong} /> Close
        </button>
      </div>
      <CartCanvasLabelCard
        toggleCartCanvas={toggleCartCanvas}
        basketLabels={basketLabels}
        setBasketLabels={setBasketLabels}
        render={render}
        setInvalidLabel={setInvalidLabel}
      />
      <div className="absolute bottom-8 w-full flex flex-col items-center">
        <div className="mb-1 text-center rounded-lg w-[calc(100%_-_33px)]">
          <label className="w-full inline-block text-left mb-[5px]">
            Order Details
          </label>
          <input
            id="orderNameInput"
            type="text"
            className="rounded-lg bg-[#233042] text-white px-5 py-1 w-full"
            placeholder="Order Name"
            name="orderName"
            maxLength={24}
            onChange={handleInput}
            value={orderInput.orderName}
          ></input>
        </div>
        <div className="mb-1 text-center rounded-lg w-full">
          <textarea
            id="noteInput"
            onChange={handleInput}
            value={orderInput.orderNote}
            className="rounded-lg bg-[#233042] text-white px-5 py-1 max-h-32 min-h-[6rem]"
            placeholder="Notes..."
            name="orderNote"
            cols="40"
            rows="6"
          ></textarea>
        </div>
        <div className="w-full flex flex-col justify-center">
          <button
            onClick={() => submitOrder()}
            disabled={basket.length > 0 && invalidLabel != true ? false : true}
            className={`${
              invalidLabel
                ? "bg-red-500 hover:bg-red-400"
                : "bg-[#1baded]  hover:bg-[#16b9ff]"
            } mx-3 p-3 rounded-xl text-white hover:tracking-widest transition-all ease-in-out`}
          >
            {invalidLabel != true
              ? "Submit Label"
              : "Will not Submit Until Order is Fixed"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCanvasDrawer;

const CartCanvasLabelCard = ({
  toggleCartCanvas,
  basketLabels,
  setBasketLabels,
  render,
  setInvalidLabel,
}) => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.Orders.labelBasket);
  const labels = useSelector((state) => state.Label.activeLabels);
  const [blobs, setBlobs] = useState([]);
  const [runEffect, setRunEffect] = useState(true);
  const prevRunEffect = useRef(runEffect);
  const removeFromOrder = async (index) => {
    await dispatch(removeFromBasket(index));
    const updatedBasketLabels = basketLabels.filter((_, i) => i !== index);
    setRunEffect(!runEffect);
    setBasketLabels(updatedBasketLabels);
  };

  useEffect(() => {
    const getLabels = async () => {
      let start = basketLabels;
      setBasketLabels([]);
      for (let i = 0; i < basket.length; i++) {
        const label = basket[i];
        let showLabels = labels.filter((l) => l._id == label.labelId);
        let labelObj = showLabels.shift();
        if (labelObj != undefined) {
          setBasketLabels(start);
          setBasketLabels((prevFiles) => [...prevFiles, labelObj]);
        }
      }
    };
    getLabels();
  }, [basket]);

  useEffect(() => {
    setBlobs([]);
    if (basket.length < 1) {
      return;
    } else {
      const modifyPaths = async () => {
        for (let i = 0; i < basketLabels.length; i++) {
          const actualLabel = basketLabels[i];
          let modifiedPdf;
          try {
            modifiedPdf = await modifyPdf(
              `/api/getPdfs?categoryName=${actualLabel.categoryName}&subCategoryName=${actualLabel.subCategoryName}&fileName=${actualLabel.fileName}`,
              basket[i]?.textToPut
            );
            setBlobs((prev) => [...prev, modifiedPdf]);
            setInvalidLabel(false);
          } catch (error) {
            setBlobs((prev) => [...prev, ""]);
            setInvalidLabel(true);
          }
        }
      };
      modifyPaths();
    }
  }, [basketLabels]);

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
        let check;
        try {
          const checkbox = form.getCheckBox(fieldName);
          check = true;
          if (text[i].text) {
            checkbox.check();
          }
        } catch (error) {
          if (check != true) {
            if (fieldName == "AREA") {
              const dropdown = form.getDropdown(fieldName);
              if (!text[i].text || text[i].text == "") {
                continue;
              } else {
                dropdown.select(text[i].text);
              }
            } else {
              const fieldToFill = form.getTextField(fieldName);
              if (!text) {
                return;
              } else {
                fieldToFill.setText(text[i].text);
              }
            }
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

  const seeLabel = (index) => {
    console.log(blobs);
    if (blobs[index] != "") {
      return (
        <div className="flex justify-center">
          <iframe
            className="rounded"
            src={blobs[index]}
            width="80%"
            height="50%"
            frameBorder="0"
          ></iframe>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <b>
            <img
              className="m-auto"
              height="300px"
              width="150px"
              src="https://img.freepik.com/premium-vector/hand-sign-icon-no-entry-stop-symbol-give-me-five-graphic-element-white-background-vector_549897-1642.jpg"
            />
            The input exceeds the labels character count and will not print.
            Please delete this label from your order.
          </b>
        </div>
      );
    }
  };

  return (
    <div className="overflow-y-auto	h-3/5 border-b-2">
      {basketLabels.length > 0 ? (
        basketLabels.map((label, i) => (
          <div key={i}>
            {seeLabel(i)}
            <div className="border-b-2 p-4 flex mb-2">
              <div className="flex gap-24 mr-auto">
                <h4 className="text-gray-500">
                  DOC #:{" "}
                  <span className="ms-1 font-semibold">{label.docNum}</span>
                </h4>
                <h4 className="text-gray-500">
                  {basket.length > 0 ? (
                    <div>
                      Qty:{" "}
                      <span className="ms-1 font-semibold">
                        {basket[i]?.qty}
                      </span>
                    </div>
                  ) : null}
                </h4>
              </div>
              <div>
                <button
                  className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full"
                  key={label._id}
                  onClick={() => removeFromOrder(i)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col w-full justify-center h-80 mt-20">
          <div className="text-center text-xl text-semibold animate-bounce">
            No Labels in Cart
          </div>
        </div>
      )}
    </div>
  );
};
