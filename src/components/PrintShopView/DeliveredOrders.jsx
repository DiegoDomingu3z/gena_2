import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Button, Collapse, Divider, Dropdown, Space, Tooltip } from "antd";
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
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../../axiosService";
import {
  deliverOrder,
  getApprovedOrders,
  getDeliveredOrders,
  getProcessingOrder,
  deleteDeliveredOrder,
  filterDeliveredOrders,
} from "../../../store/PrintShop/Thunks";
import Swal from "sweetalert2";
import { FaSort } from "react-icons/fa";
import { formatDate } from "../../../func/resuableFunctions";

const { Panel } = Collapse;
const DeliveredOrders = ({
  deliverMultipleOrders,
  setDeliverMultipleOrders,
}) => {
  let order = useSelector((state) => state.PrintShop.deliveredOrders.orders);
  const pdf = useSelector((state) => state.PrintShop.deliveredOrders.arr);
  const user = useSelector((state) => state.Account.users);
  const currentUser = useSelector((state) => state.Account.account);
  const token = sessionStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const [activeSort, setActiveSort] = useState(null)
  const [sortLoading, setSortLoading] = useState(false)
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const getUser = (id) => {
    const singleUser = user.filter((u) => u._id == id).shift();
    return `${singleUser.department}`;
  };

  const deleteOldOrder = async (id, token) => {
    await dispatch(deleteDeliveredOrder({ id, token }));
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
      title: `Deleted Order ID: ${id}`,
    });
  };


  const today = new Date();
  const day = today.getDate();

  const sanitizePath = (path) => {
    // MIGHT HAVE TO CHANGE IN THE FUTURE
    if (path) {
      let realPath = path.slice(process.env.NEXT_PUBLIC_SLICE_PATH);
      return `${realPath}`;
    }
    return "";
  };

  const openFileManager = async (id) => {
    await api.post("api/printshop/openFileManger/" + id);
  };

  const items = [
    {
      label: 'Today',
      key: '1',
      icon: <FaSort />,
    },
    {
      label: 'Last 3 Days',
      key: '3',
      icon: <FaSort />,
    },
    {
      label: 'Last 7 Days',
      key: '7',
      icon: <FaSort />,
    
    },
    {
      label: 'All Orders',
      key: '~',
      icon: <FaSort />,
     
    },
  ];


  const handleMenuClick = async (e) => {
    const res = await dispatch(getDeliveredOrders(token))
    const sorter = items.find(i => i['key'] == e.key)
    setActiveSort(sorter.label)
    if (e.key == '~') {return}
    let filterDate = +e.key
    console.log(filterDate, 'date')
  setSortLoading(true);
    
    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - filterDate);
    const filteredOrdersWithIndices = res.payload.orders.reduce((result, o, index) => {
      let date = new Date(o.createdOn);
      if (date >= threeDaysAgo) {
        result.filteredOrders.push(o);
        result.indices.push(index);
      }
      return result;
    }, { filteredOrders: [], indices: [] });
    let filteredPDF = []
    const { filteredOrders, indices } = filteredOrdersWithIndices;
    res.payload.arr.reduce((result, p, index) => {
      if (indices.includes(index)) {
       filteredPDF.push(p)
      }
    })

    dispatch(filterDeliveredOrders({filteredOrders, filteredPDF}))
    setSortLoading(false)
  }
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div>
      <div className="text-end mt-5">
        <Dropdown menu={menuProps} placement="bottomLeft" >
        <Button>
        <Space>
          {activeSort ? activeSort : 'Sort'}
          <FaSort />
        </Space>
      </Button>

        </Dropdown>
      </div>
      {order || sortLoading != true
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
                  onClick={() => console.log(o._id)}
                  header={`${o.creatorName} - ${o._id} - ${formatDate(
                    o.createdOn
                  )} - Picked Up By: ${o.pickedUpBy ? o.pickedUpBy : "N/A"}`}
                  key={o._id}
                  extra={
                    <div>
                      {day - formatDate(o.updatedOn).split("/")[1] == 14 && (
                        <button
                          onClick={() =>
                            deleteOldOrder(o._id, currentUser.accessToken)
                          }
                          className="hover:bg-red-500 hover:text-white transition-all ease-in-out rounded-full px-3 py-1"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                  }
                >
                  <div className="relative -top-5 text-gray-500">{o.orderName}</div>
                  <div className="grid grid-cols-3">
                    {pdf && o.labels
                      ? pdf[index]?.map((p, i) => {
                        identifier += o.labels[i].qty
                        return (
                          <div key={i} className="mb-5 border-b">
                            <div className="flex justify-center">
                              <iframe
                                src={`/api/getOrders?filePath=${sanitizePath(
                                  o.finalOrderPaths[identifier - 1]
                                  )}`}
                                  className="w-11/12"
                                  ></iframe>
                            </div>
                            <div className="mb-3 mt-1 pl-[4%]">
                              DOCNUM: {p.docNum}
                            </div>
                            <div className="mb-3 pl-[4%]">
                              QTY to be Printed: {o.labels[i].qty * p.unitPack}
                            </div>
                            {o.labels?.[identifier - 1]?.serialRange && <div className="pl-[4%]">
                              <span className="text-red-500">Serial Numbers:</span> {o.labels?.[identifier - 1]?.serialRange}
                            </div>}
                          </div>
                                  )
        })
                      : <div>
                          <h1>No Orders Found</h1>
                        </div>}
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

export default DeliveredOrders;
