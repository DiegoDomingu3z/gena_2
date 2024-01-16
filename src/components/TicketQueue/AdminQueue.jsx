import React from "react";
import QueueCard from "./QueueCard";

const AdminQueue = ({ account, tickets }) => {
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

  return (
    <div className="grid grid-cols-3">
      <span>In queue</span>
      <span>In progress</span>
      <span>Completed</span>
      <div id="inQueue" className="flex flex-col gap-2">
        {inQueueCards}
      </div>
      <div id="inProgress" className="flex flex-col gap-2">
        {inProgressCards}
      </div>
      <div id="completed" className="flex flex-col gap-2">
        {completedCards}
      </div>
    </div>
  );
};

export default AdminQueue;
