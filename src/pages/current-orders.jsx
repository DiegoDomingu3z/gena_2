import Layout from "~/components/layouts/Layout";
import OrderCard from "~/components/Orders/OrderCard";
import LeadsOrderApproval from "~/components/Orders/LeadsOrderApproval";
import OrderModal from "~/components/Orders/OrderModal";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useScrollPosition } from "~/hooks/useScrollPosition";
import { getMyOrders } from "../../store/Orders/thunks";
import { Space, Table, Tag } from "antd";
import { columns } from "../../lib/orderTableData";
const { Column, ColumnGroup } = Table;

const CurrentOrders = () => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const scrollPosition = useScrollPosition(containerRef);
  const [modalState, setModalState] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [tab, setTab] = useState("my-orders");
  const [toggleSort, setToggleSort] = useState("newest");
  const account = useSelector((state) => state.Account.account);
  const approveOrder = useSelector(
    (state) => state.Orders.leadDepartmentOrders
  );
  const order = useSelector((state) => state.Orders.myOrders.orders);
  const [blobs, setBlobs] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const pickTab = (e) => {
    setTab(e.key);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const mappedOrders = order?.map((order) => {
      return {
        orderId: order._id,
        labels: order.labels.length,
        date: formatDate(order.createdOn),
        status: order.status,
        notes: order.notes ?? "",
      };
    });
    setDataSource(mappedOrders ?? []);
  }, [order]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(getMyOrders(token));

    const mappedOrders = order?.map((order) => {
      console.log(order);
      return {
        orderId: order._id,
        labels: order.labels.length,
        date: formatDate(order.createdOn),
        status: order.status,
        notes: order.notes ?? "",
      };
    });

    setDataSource(mappedOrders);
  }, []);

  return (
    <Layout title={"Gena | Current Orders"}>
      {modalState && (
        <OrderModal
          modalState={modalState}
          setModalState={setModalState}
          blobs={blobs}
          setBlobs={setBlobs}
        />
      )}
      <div
        onClick={openAction ? () => setOpenAction(false) : null}
        className={"flex flex-col pl-20 pr-20 pt-20 pb-4"}
      >
        <div className="flex items-end">
          <div className="mr-auto">
            <h1 className="text-3xl font-medium font-genaPrimary">
              Current Orders
            </h1>
          </div>
          <button
            onClick={() =>
              toggleSort === "newest"
                ? setToggleSort("oldest")
                : setToggleSort("newest")
            }
            className="bg-[#28aeeb] text-white flex justify-between min-w-[10rem] py-1 px-4 rounded-md transition-all ease-in-out hover:scale-105"
          >
            Sort Date: <span className="text-black">{toggleSort}</span>
          </button>
        </div>

        <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />

        {account.privileges == "team-lead" ||
        account.privileges == "group-lead" ? (
          <div>
            <div>
              <Menu onClick={pickTab} selectedKeys={[tab]} mode="horizontal">
                <Menu.Item className="absolute" key="my-orders">
                  My Orders
                  <span className="bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0">
                    {order ? order.length : null}
                  </span>
                </Menu.Item>
                <Menu.Item className="relative" key="approve-order">
                  Orders I need to approve
                  <span className="bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0">
                    {approveOrder ? approveOrder.length : null}
                  </span>
                </Menu.Item>
              </Menu>
            </div>
            <div
              className="bg-white rounded-md shadow-md overflow-auto h-[52rem] lg:h-[90rem] laptop:h-[44rem]"
              ref={containerRef}
            >
              <h1 className="text-xl font-medium mb-10 pl-5 pt-5">
                {tab == "my-orders" ? "My Orders" : "Orders I need to Approve"}
              </h1>
              <div
                className={
                  tab == "my-orders"
                    ? `grid grid-cols-5 py-5 justify-items-center font-medium h-10 sticky top-0 bg-white items-center ${
                        scrollPosition > 88 && "shadow-md"
                      } transition-all ease-in-out duration-500`
                    : `grid grid-cols-6 justify-items-center font-medium h-10 sticky top-0 bg-white items-center ${
                        scrollPosition > 88 && "shadow-md"
                      } transition-all ease-in-out duration-500`
                }
              >
                {/* {tab == 'approve-order' ? <h4>Name</h4> : null} */}
                {tab == "my-orders" ? <h4>Order ID</h4> : null}
                {tab == "my-orders" ? <h4>Labels</h4> : null}
                {tab == "my-orders" ? <h4>Date</h4> : null}
                {tab == "my-orders" ? <h4>Status</h4> : null}
                {tab == "my-orders" ? <h4>Actions</h4> : null}
              </div>
              <div className="flex flex-col">
                {tab == "my-orders" && (
                  <OrderCard
                    deleted={deleted}
                    setDeleted={setDeleted}
                    modalState={modalState}
                    setModalState={setModalState}
                    blobs={blobs}
                    setBlobs={setBlobs}
                    openAction={openAction}
                    setOpenAction={setOpenAction}
                  />
                )}
              </div>
              <div>{tab == "approve-order" && <LeadsOrderApproval />}</div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="bg-white rounded-md shadow-md overflow-auto h-[52rem] lg:h-[90rem] laptop:h-[44rem]"
              ref={containerRef}
            >
              <h1 className="text-xl font-medium mb-10 pl-5 pt-5">My Orders</h1>
              <Table
                scroll={{
                  y: 560,
                }}
                pagination={false}
                dataSource={dataSource}
                columns={columns}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CurrentOrders;
