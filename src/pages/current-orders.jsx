import OrderTable from "~/components/Orders/OrderTable";
import UpdateOrderCard from "~/components/Orders/UpdateOrderCard";
import Layout from "~/components/layouts/Layout";
import { useState } from "react";
import { Button, Menu, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { declineOrder, approveOrder } from "../../store/Orders/thunks";
import OrderTableApprovals from "~/components/Orders/OrderTableApprovals";
import OrderApprovalModalCard from "~/components/Orders/OrderApprovalModalCard";
import GenaModal from "~/components/toasts-modals/GenaModal";

const CurrentOrders = () => {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [tab, setTab] = useState("my-orders");
  const [blobs, setBlobs] = useState([]);
  const [approvalOrderId, setApprovalOrderId] = useState("");
  const account = useSelector((state) => state.Account.account);
  const order = useSelector((state) => state.Orders.myOrders.orders);
  const leadOrders = useSelector((state) => state.Orders.leadDepartmentOrders);

  const pickTab = (e) => {
    setTab(e.key);
  };

  const handleOrderDecline = (id) => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(declineOrder({ token, id }));
    setModalState(false);
  };
  const handleOrderApprove = (id) => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(approveOrder({ token, id }));
    setModalState(false);
  };

  return (
    <Layout displayTitle={"Current Orders"} title={"Gena | Current Orders"}>
      <div
        onClick={openAction ? () => setOpenAction(false) : null}
        className={"flex flex-col pl-20 pr-20 pt-20 pb-4"}
      >

        {account.privileges == "team-lead" ||
        account.privileges == "group-lead" ? (
          <div>
            <div>
              <Menu onClick={pickTab} selectedKeys={[tab]} mode="horizontal">
                <Menu.Item className="absolute" key="my-orders">
                  My orders
                  <span className="bg-darkBlue p-1 rounded-full px-2 text-xs text-white absolute top-0">
                    {order ? order.length : null}
                  </span>
                </Menu.Item>
                <Menu.Item className="relative" key="approve-order">
                  Orders I need to approve
                  <span className="bg-darkBlue p-1 rounded-full px-2 text-xs text-white absolute top-0">
                    {leadOrders ? leadOrders.length : null}
                  </span>
                </Menu.Item>
              </Menu>
            </div>
            <div>
              {tab == "my-orders" && (
                <div className="bg-white rounded-md shadow-md overflow-auto h-[52rem] lg:h-[90rem] laptop:h-[44rem]">
                  <h1 className="text-xl font-medium mb-10 pl-5 pt-5">
                    My Orders
                  </h1>
                  <OrderTable setModalState={setModalState} />
                </div>
              )}
            </div>
            <div>
              {tab == "approve-order" && (
                <div className="bg-white rounded-md shadow-md overflow-auto h-[52rem] lg:h-[90rem] laptop:h-[44rem]">
                  <h1 className="text-xl font-medium mb-10 pl-5 pt-5">
                    Orders I need to approve
                  </h1>
                  <OrderTableApprovals
                    setApprovalOrderId={setApprovalOrderId}
                    setModalState={setModalState}
                    modalState={modalState}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-md shadow-md overflow-auto h-[52rem] lg:h-[90rem] laptop:h-[44rem]">
              <h1 className="text-xl font-medium mb-10 pl-5 pt-5">My Orders</h1>
              <OrderTable setModalState={setModalState} />
            </div>
          </div>
        )}
      </div>
      <GenaModal
        // width={"950px"}
        title="Labels in this order"
        open={modalState}
        setOpen={setModalState}
        // cancelButtonProps={{
        //   style: { display: "none" },
        // }}
        // okButtonProps={{
        //   style: { display: "none" },
        // }}
      >
        <div className="h-[600px] p-3 overflow-y-auto grid justify-items-center laptoplg:grid-cols-3 grid-cols-2 gap-8">
          {tab !== "approve-order" ? (
            <UpdateOrderCard
              modalState={modalState}
              blobs={blobs}
              setBlobs={setBlobs}
            />
          ) : (
            <OrderApprovalModalCard
              modalState={modalState}
              blobs={blobs}
              setBlobs={setBlobs}
            />
          )}
        </div>
        {tab === "approve-order" && (
          <div className="flex justify-end gap-2">
            <Button
            type="primary"
              onClick={() => handleOrderApprove(approvalOrderId)}
              className="bg-[#1677ff] border-none"
            >
              Approve
            </Button>
            <Button onClick={() => handleOrderDecline(approvalOrderId)} danger>
              Decline
            </Button>
          </div>
        )}
      </GenaModal>
    </Layout>
  );
};

export default CurrentOrders;
