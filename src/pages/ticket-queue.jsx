import Layout from "~/components/layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import TicketDashboard from "~/components/TicketQueue/TicketDashboard";
import { useEffect } from "react";
import { getTickets } from "../../store/Tickets/Thunks";

const TicketQueue = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.Account.account);
  const tickets = useSelector((state) => state.Tickets.tickets);

  useEffect(() => {
    dispatch(getTickets());
  }, []);
  return (
    <Layout displayTitle={'Tickets'} title={"GENA | Tickets"}>
      <div className={"flex flex-col pl-20 pr-20 pt-20 pb-4"}>
        <TicketDashboard tickets={tickets} account={account} />
      </div>
    </Layout>
  );
};

export default TicketQueue;
