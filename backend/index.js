const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./Models/db");
const AuthRouter = require("./Routes/AuthRouter");
const ticketRoutes = require("./Routes/TicketRoute");
const Ticket = require("./Models/TicketModel");
const trains = require("./Routes/TrainRoutes");
const Train = require("../backend/Models/trainSchema"); 

const PORT = process.env.PORT || 8082;

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/api", ticketRoutes);
app.use("/api", trains);

app.delete("/api/tickets/:id", async (req, res) => {
  const ticketId = req.params.id;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const { trainNumber, ticketCount } = ticket;

    const train = await Train.findOne({ trainNumber });

    if (!train) {
      return res.status(404).json({ message: "Associated train not found" });
    }

    train.remainingSeats += ticketCount;

    await train.save();

    const result = await Ticket.deleteOne({ _id: ticketId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Ticket could not be deleted" });
    }

    res.status(200).json({
      message: "Ticket deleted successfully, remaining seats updated",
      updatedRemainingSeats: train.remainingSeats,
    });
  } catch (error) {
    console.error("Error deleting ticket and updating train:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the ticket" });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
