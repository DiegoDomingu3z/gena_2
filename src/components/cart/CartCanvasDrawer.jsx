import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  clearBasket,
  getBasketLabels,
  placeOrder,
  removeFromBasket,
  getMyOrders
} from "../../../store/Orders/thunks";
import Swal from "sweetalert2";
import { PDFDocument } from "pdf-lib";
import Image from "next/image";
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
    dispatch(getMyOrders(token));
    setTimeout(() => {
      setToggleCartCanvas(!toggleCartCanvas);
    }, 500);
  };

  const noteCharacterIndicator = orderInput.orderNote?.length ?? 0;

  return (
    <div
      className={
        toggleCartCanvas
          ? "py-6 top-0 right-0 w-96 bg-white drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col gap-5 overflow-hidden"
          : "py-6 top-0 w-96 bg-white drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col -right-full gap-20 overflow-hidden"
      }
    >
      <div className="px-5 mb-5">
        <button
          onClick={() => setToggleCartCanvas(!toggleCartCanvas)}
          className="btn w-full rounded-md bg-darkBlue hover:bg-darkBlue hover:bg-opacity-90"
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
      <div className="w-full flex flex-col items-center px-5 mt-auto">
        <div className="mb-1 text-center rounded-md w-full">
          <label className="label label-text">Order Details</label>
          <input
            id="orderNameInput"
            type="text"
            className="input rounded-md input-bordered w-full input-sm font-light"
            placeholder="Order Name"
            name="orderName"
            maxLength={24}
            onChange={handleInput}
            value={orderInput.orderName}
          ></input>
        </div>
        <div className="mb-1 text-center rounded-md w-full relative">
          <textarea
            id="noteInput"
            onChange={handleInput}
            value={orderInput.orderNote}
            className="textarea textarea-bordered rounded-md max-h-[8rem] min-h-[8rem] font-light w-full"
            placeholder="Notes..."
            name="orderNote"
            maxLength={80}
            cols="40"
            rows="6"
          ></textarea>
          <span
            className={`absolute bottom-2 right-4 text-xs ${
              noteCharacterIndicator === 80
                ? "text-error"
                : noteCharacterIndicator >= 50 && noteCharacterIndicator <= 80
                ? "text-orange-400"
                : "text-black"
            }`}
          >
            {noteCharacterIndicator}/80
          </span>
        </div>
        <div className="w-full">
          <button
            onClick={() => submitOrder()}
            disabled={basket.length > 0 && invalidLabel != true ? false : true}
            className={`${
              invalidLabel
                ? "bg-red-500 hover:bg-red-400"
                : "bg-darkBlue hover:bg-darkBlue"
            } btn hover:bg-opacity-90 w-full rounded-md`}
          >
            {invalidLabel != true
              ? "Submit Order"
              : "Will not submit until order is fixed"}
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
    if (blobs[index] != "") {
      return (
        <div className="">
          <iframe
            className="rounded pointer-events-none"
            src={blobs[index]}
            width="120px"
            height="100px"
            frameBorder="0"
          ></iframe>
        </div>
      );
    } else {
      return (
        <div className="text-sm w-full">
          <Image
            className="m-auto"
            height={120}
            width={100}
            src="https://img.freepik.com/premium-vector/hand-sign-icon-no-entry-stop-symbol-give-me-five-graphic-element-white-background-vector_549897-1642.jpg"
            alt="Label broke order"
          />
          The input exceeds the labels character count and will not print.
          Please delete this label from your order.
        </div>
      );
    }
  };

  return (
    <div className="overflow-y-auto grow border-b-2 px-5 flex flex-col gap-3">
      {basketLabels.length > 0 ? (
        basketLabels.map((label, i) => (
          <div className="flex gap-3 border rounded-md shadow-md p-2" key={i}>
            {seeLabel(i)}
            <div className="w-full relative flex flex-col">
              <button
                key={label._id}
                onClick={() => removeFromOrder(i)}
                className="btn btn-square bg-white min-h-0 h-6 w-6 absolute right-0 drop-shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="red"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div>
                <h4 className="font-medium">{label.docNum}</h4>
                <h3 className="text-sm text-gray-500">{label.name}</h3>
              </div>
              <div className="border-t-[1px] mt-auto">
                <h4 className="text-gray-500 text-sm">
                  {basket.length > 0 ? (
                    <div>
                      Qty: <span className="text-black">{basket[i]?.qty}</span>
                    </div>
                  ) : null}
                </h4>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col w-full justify-center h-80 mt-20">
          {/* <div className="text-center text-xl text-semibold animate-bounce">
            No Labels in Cart
          </div> */}
          <div className="text-center text-lg">No labels in cart</div>
          <div className="m-auto relative bg-darkBlue rounded-full overflow-clip">
            <Image
              src={"/images/shopping.png"}
              height={200}
              width={200}
              alt="empty cart"
            />
            <span className="h-[5px] w-[5px] bg-white absolute rotate-45 bottom-[158px] animate-duration-[2000ms] left-[46px] animate-fade animate-infinite animate-ease-linear animate-alternate"></span>
            <span className="h-[5px] w-[5px] bg-white absolute rotate-45 bottom-12 right-[49.5px] animate-fade animate-infinite animate-ease-linear animate-alternate"></span>
          </div>
        </div>
      )}
    </div>
  );
};
