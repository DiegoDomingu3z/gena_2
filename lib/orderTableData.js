import { Tag, Space, Button, Popconfirm, Popover } from "antd";
import { store } from "../store";
import { getMyOrders, removeOrder } from "../store/Orders/thunks";

const deleteOrderById = async (orderId) => {
  const token = sessionStorage.getItem("accessToken");
  await store.dispatch(removeOrder({ id: orderId, token }));
  store.dispatch(getMyOrders(token));
};

const statusColor = {
  approved: "green",
  declined: "red",
  readyForPickup: "blue",
  processing: "yellow",
  delivered: "black",
  waitingForApproval: "purple",
};

export const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Labels ",
    dataIndex: "labels",
    key: "labels",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, order) => {
      let color;
      switch (order.status) {
        case "approved":
          color = statusColor.approved;
          break;

        case "declined":
          color = statusColor.declined;
          break;

        case "ready for pickup":
          color = statusColor.readyForPickup;
          break;

        case "waiting for approval":
          color = statusColor.waitingForApproval;
          break;

        case "processing":
          color = statusColor.processing;
          break;

        case "delivered":
          color = statusColor.delivered;
          break;
      }
      return (
        <Tag key={order.orderId} color={color}>
          {order.status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (_, order) => (
      <Space key={order.orderId} className="flex items-center gap-3">
        <Button>Edit</Button>
        <Popconfirm
          okButtonProps={{
            style: { backgroundColor: "#1677ff" },
          }}
          cancelButtonProps={{
            style: { backgroundColor: "red", color: "white", border: "white" },
          }}
          title="Delete order?"
          onConfirm={() => deleteOrderById(order.orderId)}
        >
          <Button danger className="text-red-500">
            Delete
          </Button>
        </Popconfirm>
        <Popover trigger="click" content={order.notes} title="Order notes">
          {console.log(order)}
          {order.notes && (
            <div className="cursor-pointer w-7">
              <svg
                className="w-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M9 3V5M12 3V5M15 3V5M13 9H9M15 13H9M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V7.2C19 6.0799 19 5.51984 18.782 5.09202C18.5903 4.71569 18.2843 4.40973 17.908 4.21799C17.4802 4 16.9201 4 15.8 4H8.2C7.0799 4 6.51984 4 6.09202 4.21799C5.71569 4.40973 5.40973 4.71569 5.21799 5.09202C5 5.51984 5 6.07989 5 7.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21Z"
                    stroke="black"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          )}
        </Popover>
      </Space>
    ),
  },
];
