const express = require("express");
const {
  getTrains,
//   getSpecifictrain,
//   purchaseTicket,
} = require("../controllers/trainController"); // Import both functions
const router = express.Router();

router.get("/trains", getTrains);

// router.get("/trains/:trainNumber", getTrains);

module.exports = router;
