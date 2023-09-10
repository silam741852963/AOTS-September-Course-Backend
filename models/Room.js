const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomsSchema = new Schema({
  name: String,
  group: String,
  type: String,
  price: Number,
  deposit: Number,
  debt: Number,
  renter: Number,
  day_of_hire: Date,
  expiration_data: Date,
  status: String,
  services: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
      quantity: Number,
    },
  ],
  sort: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Room", roomsSchema);
