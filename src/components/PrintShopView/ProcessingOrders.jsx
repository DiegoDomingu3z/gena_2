import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Collapse, Divider, Tooltip } from "antd";
import { BeatLoader, RingLoader } from "react-spinners";
import { getAllUsers } from "../../../store/Account/thunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNoteSticky,
  faEnvelopeOpen,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../../axiosService";
import {
  deliverOrder,
  getApprovedOrders,
  getDeliveredOrders,
  getProcessingOrder,
  getReadyForPickUpOrders,
  updateToPickup,
} from "../../../store/PrintShop/Thunks";
import Swal from "sweetalert2";

const { Panel } = Collapse;
const ProcessingOrders = ({
  deliverMultipleOrders,
  setDeliverMultipleOrders,
}) => {
  const order = useSelector((state) => state.PrintShop.processingOrders.orders);
  const pdf = useSelector((state) => state.PrintShop.processingOrders.arr);
  const user = useSelector((state) => state.Account.users);
  const dispatch = useDispatch();
  
  const markOrderAsDelivered = async (id) => {
    const token = sessionStorage.getItem("accessToken");
    await dispatch(updateToPickup({ token, id }))
      .then(async (res) => {
        await dispatch(getApprovedOrders(token));
        await dispatch(getProcessingOrder(token));
        await dispatch(getDeliveredOrders(token));
        await dispatch(getReadyForPickUpOrders(token));
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
          title: `Updated Order ID: ${id} to Ready For Pickup`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(getAllUsers());
    dispatch(getProcessingOrder(token));
  }, []);

  const getUser = (id) => {
    const singleUser = user.filter((u) => u._id == id).shift();
    return `${singleUser.department}`;
  };

  const getUserName = (id) => {
    const singleUser = user.filter((u) => u._id == id).shift();
    return `${singleUser.firstName}-${singleUser.lastName}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const sanitizePath = (path) => {
    // MIGHT HAVE TO CHANGE IN THE FUTURE
    if (path) {
      let realPath = path.slice(process.env.NEXT_PUBLIC_SLICE_PATH);
      return `${realPath}`;
    }
    return ''
  };

  const openFileManager = async (id) => {
    await api.post("api/printshop/openFileManger/" + id);
  };

  return (
    <div>
      {order
        ? order.map((o, index) => {
          let identifier = 0
          return (

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
                    <div>
                      {/* <Tooltip placement="top" title={`Open in File Manager?`} >
                                        <button onClick={(event) => {
                                          openFileManager(o._id)
                                          event.stopPropagation();
                                        }} className='text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-8 rounded-full py-1'>
                                        <FontAwesomeIcon icon={faFile} />
                                        </button>
                                      </Tooltip> */}
                      {o.notes || o.notes != "" ? (
                        <Tooltip placement="top" title={o.notes}>
                          <button className="text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-8 rounded-full py-1">
                            <FontAwesomeIcon icon={faNoteSticky} />
                          </button>
                        </Tooltip>
                      ) : null}
                      {!deliverMultipleOrders.includes(o._id) ? (
                        <Tooltip
                        placement="top"
                        title={`Update ${o.creatorName}'s Order to Ready For Pickup?`}
                        >
                          <button
                            onClick={(event) => {
                              markOrderAsDelivered(o._id);
                              event.stopPropagation();
                            }}
                            className="text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-8 rounded-full py-1"
                            >
                            <FontAwesomeIcon icon={faEnvelopeOpen} />
                          </button>
                        </Tooltip>
                      ) : null}
                    </div>
                  }
                  >
                  
                    
                  <div className="relative -top-5 text-gray-500">{o.orderName}</div>
                  <div className="grid grid-cols-3">
                    {pdf && o.labels[0].qty
                      ? pdf[index].map((p, i) => {
                        identifier += o?.labels[i]?.qty
                        return(
                          <div key={i} className="mb-5 border-b">
                            <div className="flex justify-center">
                              <iframe
                                src={`/api/getOrders?filePath=${sanitizePath(
                                  o.finalOrderPaths[identifier - 1]
                                  )}`}
                                  className="w-11/12"
                                  ></iframe>
                            </div>
                            <div className="mt-1 mb-3 pl-[4%]">
                              DOCNUM: {p.docNum}
                            </div>
                            <div className="mb-3 pl-[4%]">
                              QTY to be Printed:{" "}
                              {o?.labels[i]?.qty * p.unitPack}
                              
                            </div>
                            <div className="mb-3 pl-[4%]">
                              Material Type: {p.material}
                            </div>
                            {o.labels?.[identifier - 1]?.serialRange && <div className="pl-[4%]">
                            <span className="text-red-500">Serial Numbers:</span> {o.labels?.[identifier - 1]?.serialRange}
                            </div>}
                          </div>
                                  )
                                }
                                )
                                : null}
                  </div>
                </Panel>
              </Collapse>
            </div>
                              )
                              }
                              )
                              : null}
    </div>
    );
  };

export default ProcessingOrders;
