import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { Avatar, Space } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccount } from "../../store/Account/thunks";
import { getMyOrders } from "../../store/Orders/thunks";
import { getTickets } from "../../store/Tickets/Thunks";
import { formatImgString } from "../../func/resuableFunctions";
export const NavButtons = ({ ticketModal, setTicketModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Account);
  const userOrders = useSelector((state) => state.Orders.myOrders.orders);
  const devTickets = useSelector((state) => state.Tickets.tickets);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(getAccount(token));
    dispatch(getMyOrders(token));

    token && dispatch(getTickets());
  }, []);

  const router = useRouter();

  return (
    <>
      <div className="w-full flex flex-col justify-center mb-auto">
        <Link
          href={"/PrintShop"}
          className={
            user.accessToken && user.account.privileges == "printshop"
              ? ""
              : "hidden"
          }
        >
          <button
            className={`w-full md:pl-8 pl-4 py-2 flex items-center gap-4 transition-all ease-in-out duration-150 hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/PrintShop"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
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
                  d="M7 18H6.2C5.0799 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V10.2C3 9.0799 3 8.51984 3.21799 8.09202C3.40973 7.71569 3.71569 7.40973 4.09202 7.21799C4.51984 7 5.0799 7 6.2 7H7M17 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V10.2C21 9.07989 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H17M7 11H7.01M17 7V5.4V4.6C17 4.03995 17 3.75992 16.891 3.54601C16.7951 3.35785 16.6422 3.20487 16.454 3.10899C16.2401 3 15.9601 3 15.4 3H8.6C8.03995 3 7.75992 3 7.54601 3.10899C7.35785 3.20487 7.20487 3.35785 7.10899 3.54601C7 3.75992 7 4.03995 7 4.6V5.4V7M17 7H7M8.6 21H15.4C15.9601 21 16.2401 21 16.454 20.891C16.6422 20.7951 16.7951 20.6422 16.891 20.454C17 20.2401 17 19.9601 17 19.4V16.6C17 16.0399 17 15.7599 16.891 15.546C16.7951 15.3578 16.6422 15.2049 16.454 15.109C16.2401 15 15.9601 15 15.4 15H8.6C8.03995 15 7.75992 15 7.54601 15.109C7.35785 15.2049 7.20487 15.3578 7.10899 15.546C7 15.7599 7 16.0399 7 16.6V19.4C7 19.9601 7 20.2401 7.10899 20.454C7.20487 20.6422 7.35785 20.7951 7.54601 20.891C7.75992 21 8.03995 21 8.6 21Z"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">Print Orders</span>
          </button>
        </Link>
        <Link
          href={"/start-new-order"}
          className={user.accessToken ? "" : "hidden"}
        >
          <button
            className={`w-full md:pl-8 pl-4 py-2 flex items-center gap-4 transition-all ease-in-out duration-150 hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/start-new-order"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
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
                  d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">New Order</span>
          </button>
        </Link>
        <Link
          href={"/current-orders"}
          className={user.accessToken ? "" : "hidden"}
        >
          <button
            className={`w-full flex items-center gap-4 md:pl-8 pl-4 py-2 transition-all ease-in-out duration-150 hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/current-orders"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
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
                  d="M11 8L16 8.00053M11 12L16 12.0005M11 16L16 16.0005M8 16H8.01M8 12H8.01M8 8H8.01M7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.8C20 17.9201 20 18.4802 19.782 18.908C19.5903 19.2843 19.2843 19.5903 18.908 19.782C18.4802 20 17.9201 20 16.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.0799 4 7.2 4Z"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">Current Orders</span>
            <span className="badge border-none bg-accent text-white absolute right-5">
              {userOrders?.length}
            </span>
          </button>
        </Link>
        <Link
          href={"/NewLabel"}
          className={
            user.accessToken && user.account.privileges == "admin"
              ? ""
              : "hidden"
          }
        >
          <button
            className={`w-full flex items-center gap-4 md:pl-8 pl-4 py-2 transition-all ease-in-out duration-150 hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/NewLabel"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#b3b3b3"
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
                  d="M17 19H21M19 17V21M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M9 17H12M9 13H15M9 9H10"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">New Label</span>
          </button>
        </Link>
        <Link
          href={"/newMaterial"}
          className={
            user.accessToken && user.account.privileges == "admin"
              ? ""
              : "hidden"
          }
        >
          <button
            className={`w-full flex items-center gap-4 md:pl-8 pl-4 py-2 transition-all ease-in-out duration-150  hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/newMaterial"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
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
                  d="M12 10.2308L3.08495 7.02346M12 10.2308L20.9178 7.03406M12 10.2308V20.8791M5.13498 18.5771L10.935 20.6242C11.3297 20.7635 11.527 20.8331 11.7294 20.8608C11.909 20.8853 12.091 20.8853 12.2706 20.8608C12.473 20.8331 12.6703 20.7635 13.065 20.6242L18.865 18.5771C19.6337 18.3058 20.018 18.1702 20.3018 17.9269C20.5523 17.7121 20.7459 17.4386 20.8651 17.1308C21 16.7823 21 16.3747 21 15.5595V8.44058C21 7.62542 21 7.21785 20.8651 6.86935C20.7459 6.56155 20.5523 6.28804 20.3018 6.0732C20.018 5.82996 19.6337 5.69431 18.865 5.42301L13.065 3.37595C12.6703 3.23665 12.473 3.167 12.2706 3.13936C12.091 3.11484 11.909 3.11484 11.7294 3.13936C11.527 3.167 11.3297 3.23665 10.935 3.37595L5.13498 5.42301C4.36629 5.69431 3.98195 5.82996 3.69824 6.0732C3.44766 6.28804 3.25414 6.56155 3.13495 6.86935C3 7.21785 3 7.62542 3 8.44058V15.5595C3 16.3747 3 16.7823 3.13495 17.1308C3.25414 17.4386 3.44766 17.7121 3.69824 17.9269C3.98195 18.1702 4.36629 18.3058 5.13498 18.5771Z"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">New Material</span>
          </button>
        </Link>
        <Link
          href={"/NewCategory"}
          className={
            user.accessToken &&
            (user.account.privileges == "admin" ||
              user.account.privileges == "printshop")
              ? ""
              : "hidden"
          }
        >
          <button
            className={`w-full flex items-center gap-4 md:pl-8 pl-4 py-2 transition-all ease-in-out duration-150 hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/NewCategory"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
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
                  d="M9 13H15M12 10V16M12.0627 6.06274L11.9373 5.93726C11.5914 5.59135 11.4184 5.4184 11.2166 5.29472C11.0376 5.18506 10.8425 5.10425 10.6385 5.05526C10.4083 5 10.1637 5 9.67452 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V10.2C21 9.0799 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H14.3255C13.8363 7 13.5917 7 13.3615 6.94474C13.1575 6.89575 12.9624 6.81494 12.7834 6.70528C12.5816 6.5816 12.4086 6.40865 12.0627 6.06274Z"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">Categories</span>
          </button>
        </Link>
        <Link
          href={"/Departments"}
          className={user.accessToken ? "" : "hidden"}
        >
          <button
            className={`w-full flex items-center gap-4 md:pl-8 pl-4 py-2 transition-all ease-in-out duration-150 hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/Departments"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
              viewBox="-2.4 -2.4 28.80 28.80"
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
                  d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">Departments</span>
          </button>
        </Link>
        <Link
          href={"/Users"}
          className={
            user.accessToken && user.account.privileges == "admin"
              ? ""
              : "hidden"
          }
        >
          <button
            className={`w-full flex items-center gap-4 md:pl-8 pl-4 py-2 transition-all ease-in-out duration-150 hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/Users"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
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
                  d="M20 18L17 18M17 18L14 18M17 18V15M17 18V21M11 21H4C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">Add User</span>
          </button>
        </Link>
        <Link href={"/resources"} className={user.accessToken ? "" : "hidden"}>
          <button
            className={`w-full flex items-center gap-4 md:pl-8 pl-4 py-2 transition-all ease-in-out duration-150 hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/resources"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
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
                  d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">Resources</span>
          </button>
        </Link>
        <Link
          href={"/exporter"}
          className={
            user.accessToken &&
            (user.account.privileges == "admin" ||
              user.account.privileges == "printshop")
              ? ""
              : "hidden"
          }
        >
          <button
            className={`w-full flex items-center gap-4 md:pl-8 pl-4 py-2 transition-all ease-in-out duration-150 hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/exporter"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
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
                  d="M3 9.5H21M3 14.5H21M8 4.5V19.5M6.2 19.5H17.8C18.9201 19.5 19.4802 19.5 19.908 19.282C20.2843 19.0903 20.5903 18.7843 20.782 18.408C21 17.9802 21 17.4201 21 16.3V7.7C21 6.5799 21 6.01984 20.782 5.59202C20.5903 5.21569 20.2843 4.90973 19.908 4.71799C19.4802 4.5 18.9201 4.5 17.8 4.5H6.2C5.0799 4.5 4.51984 4.5 4.09202 4.71799C3.71569 4.90973 3.40973 5.21569 3.21799 5.59202C3 6.01984 3 6.57989 3 7.7V16.3C3 17.4201 3 17.9802 3.21799 18.408C3.40973 18.7843 3.71569 19.0903 4.09202 19.282C4.51984 19.5 5.07989 19.5 6.2 19.5Z"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">Export Data</span>
          </button>
        </Link>
        <Link
          href={"/ticket-queue"}
          className={user.accessToken ? "" : "hidden"}
        >
          <button
            className={`w-full flex items-center gap-4 md:pl-8 pl-4 py-2 transition-all ease-in-out duration-150 hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/ticket-queue"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
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
                  d="M5 12.0002C5 10.694 4.16519 9.58273 3 9.1709V7.6C3 7.03995 3 6.75992 3.10899 6.54601C3.20487 6.35785 3.35785 6.20487 3.54601 6.10899C3.75992 6 4.03995 6 4.6 6H19.4C19.9601 6 20.2401 6 20.454 6.10899C20.6422 6.20487 20.7951 6.35785 20.891 6.54601C21 6.75992 21 7.03995 21 7.6V9.17071C19.8348 9.58254 19 10.694 19 12.0002C19 13.3064 19.8348 14.4175 21 14.8293V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H4.6C4.03995 18 3.75992 18 3.54601 17.891C3.35785 17.7951 3.20487 17.6422 3.10899 17.454C3 17.2401 3 16.9601 3 16.4V14.8295C4.16519 14.4177 5 13.3064 5 12.0002Z"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">
              {user.account.privileges != "admin"
                ? "My Tickets"
                : "Ticket Queue"}
            </span>
            <span className="badge border-none bg-accent text-white absolute right-5">
              {devTickets?.length}
            </span>
          </button>
        </Link>
        <Link
          href={"/settings"}
          className={user.account.privileges == "admin" ? "" : "hidden"}
        >
          <button
            className={`w-full flex items-center gap-4 md:pl-8 pl-4 py-2 transition-all ease-in-out duration-150 hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/settings"
                ? "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8 text-white"
                : "text-nav"
            }`}
          >
            <svg
              className="w-7"
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
                  d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z"
                  stroke="#b3b3b3"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-sm">Settings</span>
          </button>
        </Link>
      </div>
      <div className="w-full h-16 relative">
        <div className="">
          {user.accessToken && (
            <button
              onClick={() => setTicketModal(!ticketModal)}
              id="reportBtn"
              className="text-white flex items-center gap-4 mb-5 absolute bottom-14 left-8 py-1 transition-all ease-in-out transform-gpu"
            >
              <svg
                className="w-7"
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
                    d="M11.967 12.75C12.967 11.75 13.967 11.3546 13.967 10.25C13.967 9.14543 13.0716 8.25 11.967 8.25C11.0351 8.25 10.252 8.88739 10.03 9.75M11.967 15.75H11.977M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#b3b3b3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                </g>
              </svg>
              <span className="text-sm">Submit a ticket</span>
            </button>
          )}
        </div>
        {
          <div className="text-white bg-[#1e2a38] w-full md:pl-8 pl-4 h-full flex items-center text-sm text-medium">
            {user.accessToken ? (
              <Space>
                <Avatar
                  src={`http://192.168.55.26/wp-content/uploads/${formatImgString(
                    user.account.firstName
                  )}-${user.account.lastName}.jpg`}
                />
                <span>
                  {user.account.firstName} {user.account.lastName}
                </span>
              </Space>
            ) : (
              "Welcome to GENA!"
            )}
          </div>
        }
      </div>
    </>
  );
};

const SideNav = ({ ticketModal, setTicketModal, sideNavOpen }) => {
  return (
    <div
      className={`bg-[#233043] w-[300px] transition-all ease-in-out h-screen flex flex-col items-center fixed z-40 laptop:sticky top-0 shadow-lg pt-5 ${
        sideNavOpen ? "left-0" : "-left-full"
      }`}
    >
      <div className="w-full flex justify-center mb-20">
        <Image
          src="/images/GENA-Logo.png"
          width={60}
          height={60}
          alt="GENA Image"
        />
      </div>
      <NavButtons ticketModal={ticketModal} setTicketModal={setTicketModal} />
    </div>
  );
};

export default SideNav;
