import { Collapse, Divider, Tooltip } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../store/Account/thunks";
import {
  deliverOrder,
  getApprovedOrders,
  getDeliveredOrders,
  getProcessingOrder,
  getReadyForPickUpOrders,
} from "../../../store/PrintShop/Thunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEnvelopeOpen,
  faHandsHoldingCircle,
  faStickyNote,
  faTruckPickup,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { api } from "../../../axiosService";
import { RingLoader } from "react-spinners";

const { Panel } = Collapse;
const Pickup = ({ readyForPickupOrders }) => {
  const user = useSelector((state) => state.Account.users);
  const pdf = useSelector((state) => state.PrintShop.pickupOrders.arr);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(getAllUsers());
    dispatch(getReadyForPickUpOrders(token));
  }, []);

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
      let realPath = path.slice(47);
      return `${realPath}`;
    }
    return "";
  };

  const markOrderAsDelivered = async (id) => {
    const token = sessionStorage.getItem("accessToken");
    const { value: pickUpName } = await Swal.fire({
      title: "Who Picked This Order Up?",
      input: "text",
      inputLabel: "Insert First and Last Name",
      inputPlaceholder: "Full Name",
      confirmButtonText: "Confirm Pickup",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    if (pickUpName) {
      const updatedOrder = api
        .put(
          `/api/orders/${id}/picked-up-by`,
          { name: pickUpName },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(async (res) => {
          await dispatch(deliverOrder({ token, id }))
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
                title: `Delivered Order ID: ${id}`,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(async (err) => {
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
            icon: "Error",
            title: `Unable To Mark Order ID: ${id} as delivered`,
          });
          console.log(err);
        });
    }
  };

  const getUser = (id) => {
    const singleUser = user.filter((u) => u._id == id).shift();
    return `${singleUser.department}`;
  };

  return (
    <div>
      {readyForPickupOrders
        ? readyForPickupOrders.map((r, index) => {
          let identifier = 0
          return(
            <div key={r._id}>
              <Divider orientation="left" className="flex">
                {" "}
                Department:{" "}
                {user.length > 0 ? (
                  <span>{getUser(r.creatorId)}</span>
                ) : (
                  <RingLoader size={6} />
                )}{" "}
              </Divider>
              <Collapse size="large">
                <Panel
                  header={`${r.creatorName} - ${r._id} - ${formatDate(
                    r.createdOn
                  )}`}
                  key={r._id}
                  extra={
                    <div>
                      {r.notes || r.notes != "" ? (
                        <Tooltip placement="top" title={r.notes}>
                          <button>
                            <FontAwesomeIcon icon={faStickyNote} />
                          </button>
                        </Tooltip>
                      ) : null}
                      {
                        <Tooltip
                          placement="top"
                          title={`Update ${r.creatorName}'s Order as Delivered?`}
                        >
                          <button
                            onClick={(event) => {
                              markOrderAsDelivered(r._id);
                              event.stopPropagation();
                            }}
                            className="text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-8 rounded-full py-1"
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </button>
                        </Tooltip>
                      }
                    </div>
                  }
                >
                  <div className="relative -top-5 text-gray-500">{r.orderName}</div>
                  <div className="grid grid-cols-3">
                    {pdf && r.labels[0].qty
                      ? pdf[index].map((p, i) => {
                        identifier += r?.labels[i]?.qty
                        return (

                          <div key={i} className="mb-5 border-b">
                            <div className="flex justify-center">
                              <iframe
                                src={`/api/getOrders?filePath=${sanitizePath(
                                  r.finalOrderPaths[identifier - 1]
                                  )}`}
                                  className="w-11/12"
                                  ></iframe>
                            </div>
                            <div className="mb-3 mt-1 pl-[4%]">
                              DOCNUM: {p.docNum}
                            </div>
                            <div className="mb-3 pl-[4%]">
                              QTY to be Printed:{" "}
                              {r?.labels[i]?.qty * p.unitPack}
                            </div>
                            <div className="mb-3 pl-[4%]">
                              Material Type: {p.material}
                            </div>
                            {r.labels?.[identifier - 1]?.serialRange && <div className="pl-[4%]">
                            <span className="text-red-500">Serial Numbers:</span> {r.labels?.[identifier - 1]?.serialRange}
                            </div>}
                          </div>
        )
        })
        : null}
                  </div>
                </Panel>
              </Collapse>
            </div>
          )
})
        : null}
    </div>
  );
};

export default Pickup;
