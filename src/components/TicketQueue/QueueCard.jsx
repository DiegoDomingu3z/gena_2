import React from "react";
import { useDispatch } from "react-redux";
import { updateTicket } from "../../../store/Tickets/Thunks";

const QueueCard = ({ account, ticket }) => {
  const dispatch = useDispatch();
  const ticketStatus =
    ticket.status == "In queue" ? 1 : ticket.status == "In progress" ? 50 : 100;

  const dateObject = new Date(
    ticket.status != "Completed" ? ticket.createdOn : ticket.updatedOn
  );
  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = dateObject.toLocaleDateString("en-US", dateOptions);

  const updateStatus = async () => {
    const setStatus = ticket.status == "In queue" ? "In progress" : "Completed";
    const id = ticket._id;
    const data = {
      status: setStatus,
      id: id,
    };
    dispatch(updateTicket(data));
  };
  return (
    <div className="card max-w-[500px] w-[90%] bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center">
          <h2 className="card-title inline-block">{ticket.subject}</h2>
          <span className="text-gray-400 ml-auto text-sm">
            {ticket.creatorName}
          </span>
        </div>
        <p className="mb-5">{ticket.description}</p>
        <span className="text-sm">
          {ticket.status != "Completed" ? "Submitted on:" : "Completed on:"}
        </span>
        <span className="text-gray-400 text-sm">{formattedDate}</span>
        <div className="card-actions flex-col">
          <span>{ticket.status}</span>
          <progress
            className="progress progress-info w-full"
            value={ticketStatus}
            max="100"
          ></progress>
          {account.privileges == "admin" && ticket.status != "Completed" && (
            <button onClick={() => updateStatus()} className="btn w-full">
              {ticket.status == "In queue" && "Claim Ticket"}
              {ticket.status == "In progress" && "Complete Ticket"}
            </button>
          )}
          {ticket.claimedBy && !ticket.completedBy && (
            <span className="bg-blue-950 text-white p-1 rounded-md relative -bottom-2">
              {ticket.claimedBy}
            </span>
          )}
          {ticket.completedBy && (
            <span className="bg-blue-950 text-white p-1 rounded-md relative -bottom-2">
              {ticket.completedBy}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueueCard;
