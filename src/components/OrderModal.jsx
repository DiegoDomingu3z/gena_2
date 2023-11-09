import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import OrderModalCard from "./OrderModalCard";
import { useScrollPosition } from "~/hooks/useScrollPosition";
import { useRef } from "react";

const OrderModal = ({ modalState, setModalState, blobs, setBlobs }) => {
  const containerRef = useRef(null);
  const scrollPosition = useScrollPosition(containerRef);

  return (
    <div className="fixed left-0 w-screen h-screen bg-slate-400 bg-opacity-80 z-40 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-[#f7f9fc] w-4/5 laptop:w-3/5 h-[50rem] laptop:h-[44rem] lg:h-[88rem] rounded-lg px-10 py-5 flex flex-col">
        <button
          onClick={() => {
            setModalState(!modalState);
            setBlobs([]);
          }}
          className="text-2xl self-end hover:bg-[#233043] rounded-full h-8 w-8 hover:text-white transition-all ease-in-out"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h1 className="font-medium mb-12">Labels in this order</h1>
        <div
          ref={containerRef}
          className={`grid justify-items-center laptoplg:grid-cols-4 grid-cols-2 gap-8 max-h-[80rem] laptop:h-[37.5rem] overflow-auto pb-4 p-2 pr-10 rounded-sm ${
            scrollPosition > 1 && "shadow-inset-top"
          } transition-all ease-in-out duration-500`}
        >
          <OrderModalCard
            modalState={modalState}
            blobs={blobs}
            setBlobs={setBlobs}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
