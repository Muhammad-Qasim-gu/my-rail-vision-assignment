const express = require("express");
const router = express.Router();
const {
  createTicket,
  getAllTickets,
} = require("../Controllers/TicketController");

router.post("/tickets", createTicket);

router.get("/tickets/:userId", getAllTickets);

module.exports = router;
