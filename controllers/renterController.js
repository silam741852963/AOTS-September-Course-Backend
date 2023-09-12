const Renter = require("../models/Renter");
const Room = require("../models/Room");
const changeRoomStatus = (renter) => {
  return renter > 0 ? "rented" : "idle";
};
const getAllRenters = async (req, res) => {
  const Renters = await Renter.find();
  if (!Renters) return res.status(204).json({ message: "No rooms found." });
  res.json(Renters);
};

const getRenterById = async (req, res) => {
  try {
    const result = await Renter.findById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const createRenter = async (req, res) => {
  try {
    const result = await Renter.create(req.body);
    if (result.room) {
      const renter = await Renter.findById(result._id).populate("room").exec();
      await Room.findByIdAndUpdate(renter.room._id, {
        renter: renter.room.renter + 1,
        status: changeRoomStatus(renter.room.renter + 1),
      });
    }
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const updateRenter = async (req, res) => {
  try {
    const ori = await Renter.findById(req.params.id);
    const oldRenter = await Renter.findById(ori._id).populate("room").exec();
    await Room.findByIdAndUpdate(oldRenter.room._id, {
      renter: oldRenter.room.renter - 1,
      status: changeRoomStatus(oldRenter.room.renter - 1),
    });
    const result = await Renter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (result.room) {
      const newRenter = await Renter.findById(result._id)
        .populate("room")
        .exec();
      await Room.findByIdAndUpdate(newRenter.room._id, {
        renter: newRenter.room.renter + 1,
        status: changeRoomStatus(newRenter.room.renter + 1),
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const deleteRenter = async (req, res) => {
  try {
    const result = await Renter.findById(req.params.id);
    const renter = await Renter.findById(result._id).populate("room").exec();
    await Room.findByIdAndUpdate(renter.room._id, {
      renter: renter.room.renter - 1,
      status: changeRoomStatus(renter.room.renter - 1),
    });
    await Renter.findByIdAndDelete(req.params.id);
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

module.exports = {
  getAllRenters,
  getRenterById,
  createRenter,
  updateRenter,
  deleteRenter,
};
