import { Menu } from "antd";
import { useState } from "react";
import PrintShopApproved from "./PrintShopApproved";
import { useSelector } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import ProcessingOrders from "./ProcessingOrders";
import DeliveredOrders from "./DeliveredOrders";
import Pickup from "./Pickup";
const PrintOrders = () => {
  const approvedOrders = useSelector(
    (state) => state.PrintShop.approvedOrders.orders
  );
  const processingOrders = useSelector(
    (state) => state.PrintShop.processingOrders.orders
  );
  const deliveredOrders = useSelector(
    (state) => state.PrintShop.deliveredOrders.orders
  );
  const readyForPickupOrders = useSelector(
    (state) => state.PrintShop.pickupOrders.orders
  );
  const [multipleOrders, setMultipleOrders] = useState([]);
  const [deliverMultipleOrders, setDeliverMultipleOrders] = useState([]);
  const [tab, setTab] = useState("approved-orders");
  const pickTab = (e) => {
    setTab(e.key);
  };

  return (
    <div className={"flex flex-col pl-20 pr-20 pt-20 pb-4"}>
      <div className="flex justify-between">
        {multipleOrders.length > 0 ? (
          <div>
            <button className="bg-[#1baded] text-white px-4 py-1 rounded-full">
              Print Bulk <PrinterOutlined className="" />{" "}
            </button>
          </div>
        ) : null}
      </div>
      <Menu onClick={pickTab} selectedKeys={[tab]} mode="horizontal">
        <Menu.Item className="absolute" key="approved-orders">
          Approved Orders
          {approvedOrders ? (
            <span className="bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0">
              {approvedOrders.length}
            </span>
          ) : null}
        </Menu.Item>
        <Menu.Item className="relative" key="processing-orders">
          Processing Orders
          {processingOrders ? (
            <span className="bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0">
              {processingOrders.length}
            </span>
          ) : null}
        </Menu.Item>
        <Menu.Item className="Relative" key="ready-for-pickup">
          Ready For Pickup
          {readyForPickupOrders ? (
            <span className="bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0">
              {readyForPickupOrders.length}
            </span>
          ) : null}
        </Menu.Item>
        <Menu.Item className="relative" key="delivered-orders">
          Delivered Orders
          {deliveredOrders ? (
            <span className="bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0">
              {deliveredOrders.length}
            </span>
          ) : null}
        </Menu.Item>
      </Menu>
      <div>
        {tab == "approved-orders" && (
          <PrintShopApproved
            multipleOrders={multipleOrders}
            setMultipleOrders={setMultipleOrders}
          />
        )}

        {tab == "processing-orders" && (
          <ProcessingOrders
            deliverMultipleOrders={deliverMultipleOrders}
            setDeliverMultipleOrders={setDeliverMultipleOrders}
          />
        )}

        {tab == "ready-for-pickup" && (
          <Pickup readyForPickupOrders={readyForPickupOrders} />
        )}

        {tab == "delivered-orders" && (
          <DeliveredOrders
            deliverMultipleOrders={deliverMultipleOrders}
            setDeliverMultipleOrders={setDeliverMultipleOrders}
          />
        )}
      </div>
    </div>
  );
};

export default PrintOrders;
