const Ticket = require("../Models/TicketModel");

const Train = require("../Models/trainSchema");

const createTicket = async (req, res) => {
  try {
    const {
      trainNumber,
      passengerName,
      contactNumber,
      ticketCount,
      totalCost,
      trainName,
      remainingSeats,
    } = req.body;

    if (
      !trainNumber ||
      !passengerName ||
      !contactNumber ||
      !ticketCount ||
      !totalCost ||
      !trainName ||
      !remainingSeats
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const train = await Train.findOne({ trainNumber });

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    if (train.remainingSeats < ticketCount) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const updatedRemainingSeats = train.remainingSeats - ticketCount;
    train.remainingSeats = updatedRemainingSeats;

    await train.save();

    const newTicket = new Ticket({
      trainNumber,
      passengerName,
      contactNumber,
      ticketCount,
      totalCost,
      trainName,
      remainingSeats: updatedRemainingSeats,
    });

    await newTicket.save();

    return res
      .status(201)
      .json({ message: "Ticket saved successfully!", ticket: newTicket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res.status(500).json({ message: "Failed to save ticket.", error });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tickets." });
  }
};
module.exports = { createTicket, getAllTickets };
