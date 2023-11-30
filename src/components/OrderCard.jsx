import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faNoteSticky,
  faEllipsisVertical,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyOrders,
  getOrdersToApprove,
  removeOrder,
  setActiveOrder,
} from "../../store/Orders/thunks";
import { Tooltip } from "antd";
import Swal from "sweetalert2";

const OrderCard = ({
  deleted,
  setDeleted,
  modalState,
  setModalState,
  blobs,
  setBlobs,
  toggleSort,
  openAction,
  setOpenAction,
}) => {
  const dispatch = useDispatch();
  // const [selectedOrder, setSelectedOrder] = useState();
  let order = useSelector((state) => state.Orders.myOrders.orders);
  const activeOrder = useSelector((state) => state.Orders.activeOrder);
  const [notesModal, setNotesModal] = useState(false);
  const [notes, setNotes] = useState({});

  const statusColors = {
    "waiting for approval": "bg-[#ef5350]",
    processing: "bg-[#ff9800]",
    approved: "bg-[#1baded]",
    delivered: "bg-[#63cb67]",
    declined: "bg-[#fb3939]",
    "ready for pickup": "bg-[#706ff1]"
  };

  const deleteOrder = async (id) => {
    const token = sessionStorage.getItem("accessToken");
    Swal.fire({
      title: `Remove Order: <br> ${id}?`,
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
          title: `Deleting Order: <br> ${id}`,
          html: "This may take some time <br> <b></b> Seconds left.",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        dispatch(removeOrder({ id, token }));
        setDeleted(!deleted);
      }
    });
  };
  useEffect(() => {
    const getOrders = async () => {
      const token = sessionStorage.getItem("accessToken");
      await dispatch(getMyOrders(token));
      await dispatch(getOrdersToApprove(token));
    };
    getOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleUpdateModal = async (id) => {
    const orderId = id;

    const singleOrder = await order.filter((order) => {
      return order._id == orderId;
    });

    await dispatch(setActiveOrder(singleOrder));
    setModalState(!modalState);
  };

  const handleActionPopup = async (orderId) => {
    setOpenAction((prevOpenAction) => {
      const newOpenAction = { ...prevOpenAction };

      Object.keys(newOpenAction).forEach((id) => {
        if (id !== orderId) {
          newOpenAction[id] = false;
        }
      });

      newOpenAction[orderId] = !newOpenAction[orderId];

      return newOpenAction;
    });
  };

  const userNotes = async (notes, order) => {
    await setNotes((prevNotes) => ({
      ...prevNotes,
      orderNumber: order,
      notes: notes,
    }));
    setNotesModal(!notesModal);
  };

  const NotesModal = ({ notes }) => {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-slate-400 bg-opacity-80 z-40 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-[#f7f9fc] w-4/5 laptop:w-3/5 h-[20rem] laptop:h-[44rem] lg:h-[88rem] rounded-lg px-10 py-5 flex flex-col">
          <button
            onClick={() => setNotesModal(!notesModal)}
            className="text-2xl self-end hover:bg-[#233043] rounded-full h-8 w-8 hover:text-white transition-all ease-in-out"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div>
            <span className="font-semibold">
              Notes for Order &apos;
              <span className="text-orange-500">{notes.orderNumber}</span>&apos;
            </span>
          </div>
          <div className="mt-12">
            <span>{notes.notes}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-5">
      {notesModal && <NotesModal notes={notes} />}
      {order
        ? (toggleSort === "newest"
            ? [...order].sort(
                (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
              )
            : order
          ).map((o) => {
            return (
              <div
                className="grid grid-cols-5 justify-items-center bg-white border-t py-5 justify-between hover:bg-slate-100 pl-2 items-center"
                key={o._id}
              >
                <div className="break-all">
                  <p className="text-sm w-full break-words">
                    {o._id}
                  </p>
                  <p className="text-sm w-full break-words relative text-gray-500 top-2">
                    {o.orderName && o.orderName}
                  </p>
                </div>
                <p className="">{o.labels.length}</p>
                <p className="">{formatDate(o.createdOn)}</p>
                <span
                  className={`px-5 ${
                    statusColors[o.status]
                  } text-center text-white rounded-lg flex items-center text-sm w-full max-w-[170px] justify-center`}
                >
                  {o.status}
                </span>
                <div className="flex gap-5 w-32 relative">
                  <Tooltip placement="top" title="Edit Order">
                    <button
                      onClick={() => {
                        setBlobs([]);
                        handleUpdateModal(o._id);
                      }}
                      data-order-id={o._id}
                      className={`text-[#233043] hover:bg-[#ff9800] hidden lg:block hover:text-white transition-all ease-in-out w-7 h-7 rounded-full`}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </Tooltip>
                  <Tooltip placement="top" title="Delete Order">
                    <button
                      onClick={() => deleteOrder(o._id)}
                      className={`text-[#233043] hover:bg-[#ff1b1b] hidden lg:block hover:text-white transition-all ease-in-out w-7 h-7 rounded-full ${
                        o.status === "processing" && "pointer-events-none"
                      }`}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </Tooltip>
                  <button
                    onClick={() => handleActionPopup(o._id)}
                    className="border border-black py-1 px-4 rounded-full absolute right-12 lg:hidden"
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                    {openAction && (
                      <div
                        className={`absolute ${
                          o.notes ? "-top-32" : "-top-24"
                        } -left-12 px-2 bg-sky-950 shadow-lg rounded-md w-36`}
                      >
                        {openAction[o._id] && (
                          <div className="py-2">
                            <button
                              onClick={() => {
                                setBlobs([]);
                                handleUpdateModal(o._id);
                              }}
                              data-order-id={o._id}
                              className={`text-white hover:bg-[#ff9800] w-full hover:text-white transition-all ease-in-out rounded-full ${
                                o.status === "delivered" &&
                                "pointer-events-none"
                              }`}
                            >
                              <div className="flex gap-5 items-center text-sm">
                                <FontAwesomeIcon icon={faPencil} />
                                <span>Edit Order</span>
                              </div>
                            </button>
                            <div className="border-t-[1px] w-full mb-2 mt-2"></div>
                            <button
                              onClick={() => deleteOrder(o._id)}
                              className={`text-white hover:bg-[#ff1b1b] hover:text-white transition-all w-full ease-in-out rounded-full ${
                                o.status === "processing" &&
                                "pointer-events-none"
                              }`}
                            >
                              <div className="flex gap-5 items-center text-sm">
                                <FontAwesomeIcon icon={faTrash} />
                                <span>Delete Order</span>
                              </div>
                            </button>
                            {o.notes ? (
                              <div>
                                <div className="border-t-[1px] w-full mb-2 mt-2"></div>
                                <button
                                  onClick={() => userNotes(o.notes, o._id)}
                                  className="text-white hover:bg-[#233043] hover:text-white transition-all ease-in-out w-full rounded-full"
                                >
                                  <div className="flex gap-5 items-center text-sm">
                                    <FontAwesomeIcon icon={faNoteSticky} />
                                    <span>Order Notes</span>
                                  </div>
                                </button>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                  {o.notes ? (
                    <Tooltip placement="top" title={o.notes}>
                      <button className="text-[#233043] hover:bg-[#233043] hover:text-white hidden lg:block transition-all ease-in-out w-7 h-7 rounded-full">
                        <FontAwesomeIcon icon={faNoteSticky} />
                      </button>
                    </Tooltip>
                  ) : null}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default OrderCard;
