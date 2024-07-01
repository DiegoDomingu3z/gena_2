import React from "react";
import Head from "next/head";
import SideNav from "../Navs/SideNav";
import SideNavToggle from "../Navs/SideNavToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../../store/Account/thunks";
import { useEffect } from "react";
import TicketModal from "../TicketQueue/TicketModal";
import { useState } from "react";
import { getMyOrders, getOrdersToApprove } from "../../../store/Orders/thunks";
import { getAccount } from "../../../store/Account/thunks";
import { getTickets } from "../../../store/Tickets/Thunks";
import GenaNav from "../Navs/GenaNav";

const Layout = ({ children, title, displayTitle }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.Account);
  const [ticketModal, setTicketModal] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  let token;

  useEffect(() => {
    token = sessionStorage.accessToken;
    if (!token) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    dispatch(getAccount(token));
    dispatch(getMyOrders(token));

    if (
      user.account.privileges === "group-lead" ||
      user.account.privileges === "team-lead"
    ) {
      dispatch(getOrdersToApprove(token));
    }

    token && dispatch(getTickets());
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex">
        {ticketModal && (
          <TicketModal
            ticketModal={ticketModal}
            setTicketModal={setTicketModal}
          />
        )}
        {router.route !== "/" && (
          <>
            <SideNav
              sideNavOpen={sideNavOpen}
              ticketModal={ticketModal}
              setTicketModal={setTicketModal}
            />
          </>
        )}
        <main className="min-h-screen w-full relative">
          <GenaNav
            sideNavOpen={sideNavOpen}
            setSideNavOpen={setSideNavOpen}
            displayTitle={displayTitle}
          />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
