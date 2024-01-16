import React from "react";
import { useCanvasDrawer } from "~/Contexts/canvasDrawerContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faSuitcase,
  faHouse,
  faList,
  faTag,
  faFolderPlus,
  faArrowLeftLong,
  faUser,
  faUsers,
  faPrint,
  faReceipt,
  faFile,
  faFolderTree,
} from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faSquarePiedPiper } from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccount } from "../../store/Account/thunks";
import { Avatar, Space } from "antd";

export const CanvasButtons = ({
  toggleCanvasDrawer,
  setToggleCanvasDrawer,
  ticketModal,
  setTicketModal,
}) => {
  const user = useSelector((state) => state.Account);
  const dispatch = useDispatch();

  const toggleTicketModal = () => {
    setTicketModal(!ticketModal);
    setToggleCanvasDrawer(!toggleCanvasDrawer);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(getAccount(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const cleanImg = (string) => {
    const pattern = /\([^()]*\)/g;
    const cleanString = string.replace(pattern, "");
    return cleanString.trim();
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center mb-auto">
        <button
          onClick={() => setToggleCanvasDrawer(!toggleCanvasDrawer)}
          className="border transition-all ease-in-out duration-300 hover:scale-110 hover:bg-white hover:text-inherit mb-10 w-3/4 self-center rounded-md h-10 text-white text flex items-center justify-center gap-5"
        >
          <FontAwesomeIcon className="text-xl" icon={faArrowLeftLong} /> Close
        </button>
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
        <Link href={"/ticket-queue"} className="flex items-center gap-5">
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
          {user.accessToken && (
            <button
              onClick={toggleTicketModal}
              id="reportBtn"
              className="text-white ml-5 mb-5 absolute bottom-14  bg-yellow-600 px-6 py-1 rounded-full transition-all ease-in-out transform-gpu group-hover:scale-110"
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

const CanvasDrawer = ({ ticketModal, setTicketModal }) => {
  const { toggleCanvasDrawer, setToggleCanvasDrawer } = useCanvasDrawer();

  return (
    <div
      className={
        toggleCanvasDrawer
          ? "pt-5 top-0 left-0 w-56 bg-[#233043] drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col"
          : "pt-5 top-0 w-56 bg-[#233043] drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col -left-full"
      }
    >
      <div className="w-full flex justify-center mb-20">
        <Image
          src="/images/GENA-Logo.png"
          width={60}
          height={60}
          alt="GENA Image"
        />
      </div>
      <CanvasButtons
        setToggleCanvasDrawer={setToggleCanvasDrawer}
        toggleCanvasDrawer={toggleCanvasDrawer}
        ticketModal={ticketModal}
        setTicketModal={setTicketModal}
      />
    </div>
  );
};

export default CanvasDrawer;
