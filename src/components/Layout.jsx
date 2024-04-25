import React from "react";
import Head from "next/head";
import SideNav from "./SideNav";
import SideNavToggle from "./SideNavToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../store/Account/thunks";
import { useEffect } from "react";
import TicketModal from "./TicketModal";
import { useState } from "react";
import { getMyOrders } from "../../store/Orders/thunks";
import { getAccount } from "../../store/Account/thunks";
import { getTickets } from "../../store/Tickets/Thunks";

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

    token && dispatch(getTickets());
  }, []);

  const logUserOut = async () => {
    await router.push("/");
    dispatch(logout(user.accessToken));
  };

  console.log('%csrc\components\Layout.jsx:45 router', 'color: #26bfa5;', router);

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
        {router.route !== '/' && <><SideNav
          sideNavOpen={sideNavOpen}
          ticketModal={ticketModal}
          setTicketModal={setTicketModal}
        />
        <SideNavToggle
          sideNavOpen={sideNavOpen}
          setSideNavOpen={setSideNavOpen}
        />
        </>}
        {user.accessToken && (
          <button
            onClick={logUserOut}
            className="text-black mr-5 mt-5 absolute right-5"
          >
            <FontAwesomeIcon icon={faPowerOff} /> Logout
          </button>
        )}
        <main className="min-h-screen w-full">
          {/* {user.accessToken && <GenaNav displayTitle={displayTitle} />} */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
