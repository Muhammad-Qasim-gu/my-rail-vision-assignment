// models/Train.js
const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNumber: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  remainingSeats: { type: Number, required: true }, // New field for remaining seats

});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
