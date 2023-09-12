const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentersSchema = new Schema({
  name: String,
  phone: String,
  identification_card: String,
  birth_day: Date,
  address: String,
  commue: String,
  district: String,
  province: String,
  main_contact: Boolean,
  sex: Boolean,
  status: String,
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Renter", rentersSchema);
