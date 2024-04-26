import { Tag, Space, Button, Popconfirm, Popover, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, removeOrder, setActiveOrder } from "../../store/Orders/thunks";
const { Column, ColumnGroup } = Table;
import { useState, useEffect } from "react";

const statusColor = {
  approved: "blue",
  declined: "red",
  readyForPickup: "purple",
  processing: "gold",
  delivered: "green",
  waitingForApproval: "volcano",
};
const noDelete = ["processing", "ready for pickup"];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};


const OrderTable = ({setModalState}) => {
  const [dataSource, setDataSource] = useState([]);
  const order = useSelector((state) => state.Orders.myOrders.orders);
  const dispatch = useDispatch()

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

  const handleUpdateModal = async (id) => {
    const orderId = id;

    const singleOrder = await order.filter((order) => {
      return order._id == orderId;
    });

    await dispatch(setActiveOrder(singleOrder));
    setModalState(true);
  };

  const deleteOrderById = async (orderId) => {
    const token = sessionStorage.getItem("accessToken");
    await dispatch(removeOrder({ id: orderId, token }));
    dispatch(getMyOrders(token));
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(getMyOrders(token));

    const mappedOrders = order?.map((order) => {
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

const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Labels ",
      dataIndex: "labels",
      key: "labels",
      width: 100,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Approved",
          value: "approved",
        },
        {
          text: "Declined",
          value: "declined",
        },
        {
          text: "Waiting For Approval",
          value: "waiting for approval",
        },
        {
          text: "Processing",
          value: "processing",
        },
        {
          text: "Ready For Pickup",
          value: "ready for pickup",
        },
        {
          text: "Delivered",
          value: "delivered",
        },
      ],
      filterMode: "tree",
      onFilter: (value, order) => order.status.includes(value),
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
          <Tag key={`${order.orderId}_${order.status}`} color={color}>
            {order.status.toUpperCase()}
            {order.status === "delivered" && " 🎉"}
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
          <Button onClick={() => handleUpdateModal(order.orderId)}>Edit</Button>
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
            {!noDelete.includes(order.status) && (
              <Button danger className="text-red-500">
                Delete
              </Button>
            )}
          </Popconfirm>
          <Popover trigger="click" content={order.notes} title="Order notes">
            {order.notes && (
              <div className="cursor-pointer w-7">
                <svg
                  className="w-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M9 3V5M12 3V5M15 3V5M13 9H9M15 13H9M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V7.2C19 6.0799 19 5.51984 18.782 5.09202C18.5903 4.71569 18.2843 4.40973 17.908 4.21799C17.4802 4 16.9201 4 15.8 4H8.2C7.0799 4 6.51984 4 6.09202 4.21799C5.71569 4.40973 5.40973 4.71569 5.21799 5.09202C5 5.51984 5 6.07989 5 7.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21Z"
                      stroke="black"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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

  return (
    <Table
    scroll={{
      y: "561px",
    }}
      pagination={false}
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default OrderTable