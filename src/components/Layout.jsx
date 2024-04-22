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

const Layout = ({ children, title }) => {
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

  const logUserOut = async () => {
    await router.push("/");
    dispatch(logout(user.accessToken));
  };

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
        {user.accessToken && (
          <SideNav
            sideNavOpen={sideNavOpen}
            ticketModal={ticketModal}
            setTicketModal={setTicketModal}
          />
        )}
        {user.accessToken && (
          <SideNavToggle
            sideNavOpen={sideNavOpen}
            setSideNavOpen={setSideNavOpen}
          />
        )}
        {user.accessToken && (
          <button
            onClick={logUserOut}
            className="text-black mr-5 mt-5 absolute right-5"
          >
            <FontAwesomeIcon icon={faPowerOff} /> Logout
          </button>
        )}
        <main className="min-h-screen w-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
