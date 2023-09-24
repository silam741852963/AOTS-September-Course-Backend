const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomsSchema = new Schema({
  name: String,
  group: String,
  type: String,
  price: Number,
  deposit: { type: Number, default: 0 },
  debt: { type: Number, default: 0 },
  renter: { type: Number, default: 0 },
  day_of_hire: { type: Date, default: Date.now },
  expiration_date: {
    type: Date,
    default: Date.now,
  },
  status: { type: String, default: "idle" },
  services: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  sort: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Room", roomsSchema);
