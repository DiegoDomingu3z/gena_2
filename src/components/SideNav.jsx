import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faSuitcase,
  faHouse,
  faList,
  faTag,
  faFolderPlus,
  faUser,
  faUsers,
  faPrint,
  faReceipt,
  faFile,
  faFolderTree,
} from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { useLoginInput } from "~/Contexts/LoginContext";
import { Avatar, Space } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccount } from "../../store/Account/thunks";
import { faSquarePiedPiper } from "@fortawesome/free-brands-svg-icons";

export const NavButtons = ({ ticketModal, setTicketModal }) => {
  const user = useSelector((state) => state.Account);
  const dispatch = useDispatch();
  const cleanImg = (string) => {
    const pattern = /\([^()]*\)/g;
    const cleanString = string.replace(pattern, "");
    return cleanString.trim();
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(getAccount(token));
  }, []);

  const router = useRouter();

  return (
    <>
      <div className="w-full flex flex-col justify-center mb-auto">
        <Link
          href={"/PrintShop"}
          className={
            user.accessToken && user.account.privileges == "printshop"
              ? "flex items-center gap-5"
              : "hidden"
          }
        >
          <button
            className={`h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/PrintShop" &&
              "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8"
            }`}
          >
            <FontAwesomeIcon
              className="text-slate-400 w-[15px] h-[15px]"
              icon={faPrint}
            />
            <span className="font-genaPrimary">Print Orders</span>
          </button>
        </Link>
        <Link
          href={"/start-new-order"}
          className={user.accessToken ? "flex items-center gap-5" : "hidden"}
        >
          <button
            className={`h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/start-new-order" &&
              "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8"
            }`}
          >
            <FontAwesomeIcon
              className="text-slate-400 w-[15px] h-[15px]"
              icon={faCirclePlus}
            />
            <span className="font-genaPrimary">New Order</span>
          </button>
        </Link>
        <Link
          href={"/current-orders"}
          className={user.accessToken ? "flex items-center gap-5" : "hidden"}
        >
          <button
            className={`h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/current-orders" &&
              "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8"
            }`}
          >
            <FontAwesomeIcon
              className="text-slate-400 w-[15px] h-[15px]"
              icon={faSuitcase}
            />
            <span className="font-genaPrimary">Current Orders</span>
          </button>
        </Link>
        <Link
          href={"/NewLabel"}
          className={
            user.accessToken && user.account.privileges == "admin"
              ? "flex items-center gap-5"
              : "hidden"
          }
        >
          <button
            className={`h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/NewLabel" &&
              "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8"
            }`}
          >
            <FontAwesomeIcon
              className="text-slate-400 w-[15px] h-[15px]"
              icon={faTag}
            />
            <span className="font-genaPrimary">New Label</span>
          </button>
        </Link>
        <Link
          href={"/newMaterial"}
          className={
            user.accessToken && user.account.privileges == "admin"
              ? "flex items-center gap-5"
              : "hidden"
          }
        >
          <button
            className={`h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/newMaterial" &&
              "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8"
            }`}
          >
            <FontAwesomeIcon
              className="text-slate-400 w-[15px] h-[15px]"
              icon={faSquarePiedPiper}
            />
            <span className="font-genaPrimary">New Material</span>
          </button>
        </Link>
        <Link
          href={"/NewCategory"}
          className={
            user.accessToken &&
            (user.account.privileges == "admin" ||
              user.account.privileges == "printshop")
              ? "flex items-center gap-5"
              : "hidden"
          }
        >
          <button
            className={`h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/NewCategory" &&
              "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8"
            }`}
          >
            <FontAwesomeIcon
              className="text-slate-400 w-[15px] h-[15px]"
              icon={faFolderPlus}
            />
            <span className="font-genaPrimary">Categories</span>
          </button>
        </Link>
        <Link
          href={"/Departments"}
          className={user.accessToken ? "flex items-center gap-5" : "hidden"}
        >
          <button
            className={`h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/Departments" &&
              "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8"
            }`}
          >
            <FontAwesomeIcon
              className="text-slate-400 text-sm w-[15px] h-[15px]"
              icon={faUsers}
            />
            <span className="font-genaPrimary">Departments</span>
          </button>
        </Link>
        <Link
          href={"/Users"}
          className={
            user.accessToken && user.account.privileges == "admin"
              ? "flex items-center gap-5"
              : "hidden"
          }
        >
          <button
            className={`h-14 w-full flex items-center gap-6 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/Users" &&
              "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8"
            }`}
          >
            <FontAwesomeIcon
              className="text-slate-400 w-[15px] h-[15px]"
              icon={faUser}
            />
            <span className="font-genaPrimary">Add User</span>
          </button>
        </Link>
        <Link
          href={"/resources"}
          className={user.accessToken ? "flex items-center gap-5" : "hidden"}
        >
          <button
            className={`h-14 w-full flex items-center gap-6 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/resources" &&
              "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8"
            }`}
          >
            <FontAwesomeIcon
              className="text-slate-400 w-[15px] h-[15px]"
              icon={faFile}
            />
            <span className="font-genaPrimary">Resources</span>
          </button>
        </Link>
        <Link
          href={"/exporter"}
          className={
            user.accessToken &&
            (user.account.privileges == "admin" ||
              user.account.privileges == "printshop")
              ? "flex items-center gap-5"
              : "hidden"
          }
        >
          <button
            className={`h-14 w-full flex items-center gap-6 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/exporter" &&
              "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8"
            }`}
          >
            <FontAwesomeIcon
              className="text-slate-400 w-[15px] h-[15px]"
              icon={faFolderTree}
            />
            <span className="font-genaPrimary">Export Data</span>
          </button>
        </Link>
        <Link href={"/ticket-queue"} className={
            user.accessToken
              ? "flex items-center gap-5"
              : "hidden"
          }>
          <button
            className={`h-14 w-full flex items-center gap-6 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8 ${
              router.pathname === "/ticket-queue" &&
              "bg-slate-900 bg-opacity-30 border-r-white border-t-0 border-l-0 border-b-0 border-8"
            }`}
          >
            <FontAwesomeIcon
              className="text-slate-400 w-[15px] h-[15px]"
              icon={faReceipt}
            />
            <span className="font-genaPrimary">
              {user.account.privileges != "admin"
                ? "My Tickets"
                : "Ticket Queue"}
            </span>
          </button>
        </Link>
      </div>
      <div className="w-full h-16 relative">
        <div className="group">
          <span className="opacity-0 text-white pointer-events-none absolute text-sm -top-20 left-12 bg-gray-600 py-1 px-3 rounded-tl-full rounded-tr-full rounded-br-full group-hover:opacity-100 transition-all ease-in-out">
            Report An Issue
          </span>
          {user.accessToken && (
            <button
              onClick={() => setTicketModal(!ticketModal)}
              id="reportBtn"
              className="text-white ml-4 mb-5 absolute bottom-14 left-4 bg-yellow-600 px-8 py-1 rounded-full transition-all ease-in-out transform-gpu group-hover:scale-110"
            >
              Submit a Ticket <FontAwesomeIcon icon={faReceipt} />
            </button>
          )}
        </div>
        {
          <div className="text-white bg-[#1e2a38] w-full h-full flex justify-center items-center text-md">
            {user.accessToken ? (
              <Space>
                <Avatar
                  src={`http://192.168.55.26/wp-content/uploads/${cleanImg(
                    user.account.firstName
                  )}-${user.account.lastName}.jpg`}
                />
                {user.account.firstName}
                {user.account.lastName}
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

const SideNav = ({ ticketModal, setTicketModal }) => {
  return (
    <div className="bg-[#233043] w-44 md:w-[300px] h-screen hidden laptop:flex flex-col items-center sticky top-0 left-0 shadow-lg pt-5">
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
