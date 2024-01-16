import Layout from "~/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import AdminQueue from "~/components/TicketQueue/AdminQueue";
import UserQueue from "~/components/TicketQueue/UserQueue";
import { useEffect, useMemo } from "react";
import { getTickets } from "../../store/Tickets/Thunks";

const TicketQueue = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.Account.account);
  const tickets = useSelector((state) => state.Tickets.tickets);

  useEffect(() => {
    dispatch(getTickets());
  }, []);
  return (
    <Layout title={"GENA | Home"}>
      <div className={"flex flex-col pl-20 pr-20 pt-20 pb-4"}>
        <div className="flex items-end">
          <div className="mr-auto">
            <h1 className="text-3xl font-medium font-genaPrimary">Tickets</h1>
          </div>
        </div>
        <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
        {account.privileges == "admin" && (
          <AdminQueue tickets={tickets} account={account} />
        )}
        {account.privileges != "admin" && (
          <UserQueue tickets={tickets} account={account} />
        )}
      </div>
    </Layout>
  );
};

export default TicketQueue;
