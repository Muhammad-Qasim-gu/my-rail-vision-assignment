import { ticketListText } from "@/common/constant";
import { Header } from "@/components";
import React, { useEffect, useState } from "react";

interface Ticket {
  _id: string;
  trainNumber: string;
  trainName: string;
  passengerName: string;
  contactNumber: string;
  ticketCount: number;
  totalCost: number;
  createdAt: string;
  userId: string;
}

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTickets = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User ID is missing. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8082/api/tickets/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          setError(ticketListText.failedToLoad);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError(ticketListText.setError);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const deleteTicket = async (_id: string) => {
    try {
      const response = await fetch(`http://localhost:8082/api/tickets/${_id}`, {
        method: "DELETE",
      });

      const responseData = await response.json();
      console.log("Delete response data:", responseData);

      if (response.ok) {
        setTickets(tickets.filter((ticket) => ticket._id !== _id));
      } else {
        setError(responseData.message || ticketListText.failedDelete);
      }
    } catch (error) {
      console.error("Error during delete:", error);
      setError("An error occurred while deleting the ticket.");
    }
  };

  if (loading) {
    return <div className="text-center p-6">{ticketListText.loading}</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  if (tickets.length === 0) {
    return (
      <div className="">
        <Header />

        <p className="text-center text-2xl">{ticketListText.noTicketSold}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          Sold Tickets
        </h1>

        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">
                {ticketListText.trainNUmber}
              </th>
              <th className="px-4 py-2 text-left">
                {ticketListText.trainName}
              </th>
              <th className="px-4 py-2 text-left">
                {ticketListText.passengerName}
              </th>
              <th className="px-4 py-2 text-left">
                {ticketListText.contactNumber}
              </th>
              <th className="px-4 py-2 text-left">
                {ticketListText.ticketCount}
              </th>
              <th className="px-4 py-2 text-left">
                {ticketListText.totalCost}
              </th>
              <th className="px-4 py-2 text-left">{ticketListText.date}</th>
              <th className="px-4 py-2 text-left">{ticketListText.actions}</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-b">
                <td className="px-4 py-2">{ticket.trainNumber}</td>
                <td className="px-4 py-2">{ticket.trainName}</td>{" "}
                <td className="px-4 py-2">{ticket.passengerName}</td>
                <td className="px-4 py-2">{ticket.contactNumber}</td>
                <td className="px-4 py-2">{ticket.ticketCount}</td>
                <td className="px-4 py-2">${ticket.totalCost.toFixed(2)}</td>
                <td className="px-4 py-2">
                  {new Date(ticket.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      deleteTicket(ticket._id);
                    }}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TicketList;
