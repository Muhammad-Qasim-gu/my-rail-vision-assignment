const { required } = require("joi");
const mongoose = require("mongoose");
const TicketSchema = new mongoose.Schema(
  {
    trainNumber: { type: String, required: true },
    passengerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    ticketCount: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    trainName: { type: String, required: true },
    remainingSeats:{type:String,required:true}
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Ticket", TicketSchema);
