import React from "react";
import QueueCard from "./QueueCard";
import { useScrollPosition } from "~/hooks/useScrollPosition";
import { useRef } from "react";

const TicketDashboard = ({ account, tickets }) => {
  // Separate tickets into different arrays based on status
  const inQueue = tickets.filter((ticket) => ticket.status === "In queue");
  const inProgress = tickets.filter(
    (ticket) => ticket.status === "In progress"
  );
  const completed = tickets.filter((ticket) => ticket.status === "Completed");

  // Map each array to QueueCard components
  const inQueueCards = inQueue.map((ticket, i) => (
    <QueueCard key={i} ticket={ticket} account={account} />
  ));
  const inProgressCards = inProgress.map((ticket, i) => (
    <QueueCard key={i} ticket={ticket} account={account} />
  ));
  const completedCards = completed.map((ticket, i) => (
    <QueueCard key={i} ticket={ticket} account={account} />
  ));

  const containerRef = useRef(null);
  const scrollPosition = useScrollPosition(containerRef);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-3 max-h-[48rem] laptop:h-[48rem] overflow-auto pb-10"
    >
      <span
        className={`sticky top-0 pb-1 pl-1 bg-white z-10 transition-all ease-in-out duration-500 ${
          scrollPosition > 22 && "shadow-md"
        }`}
      >
        In queue{" "}
        <span className="bg-gray-300 px-1 rounded-md text-sm">
          {inQueueCards.length}
        </span>
      </span>
      <span
        className={`sticky top-0 pb-1 pl-1 bg-white z-10 transition-all ease-in-out duration-500 ${
          scrollPosition > 22 && "shadow-md"
        }`}
      >
        In progress{" "}
        <span className="bg-gray-300 px-1 rounded-md text-sm">
          {inProgressCards.length}
        </span>
      </span>
      <span
        className={`sticky top-0 pb-1 pl-1 bg-white z-10 transition-all ease-in-out duration-500 ${
          scrollPosition > 22 && "shadow-md"
        }`}
      >
        Completed{" "}
        <span className="bg-gray-300 px-1 rounded-md text-sm">
          {completedCards.length}
        </span>
      </span>
      <div id="inQueue" className="flex flex-col gap-2 mt-8">
        {inQueueCards}
      </div>
      <div id="inProgress" className="flex flex-col gap-2 mt-8">
        {inProgressCards}
      </div>
      <div id="completed" className="flex flex-col gap-2 mt-8">
        {completedCards}
      </div>
    </div>
  );
};

export default TicketDashboard;
