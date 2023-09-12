const Room = require("../models/Room");
const Service = require("../models/Service");

const getAllRooms = async (req, res) => {
  const rooms = await Room.find();
  if (!rooms) return res.status(204).json({ message: "No rooms found." });
  res.json(rooms);
};

const getRoomById = async (req, res) => {
  try {
    const result = await Room.findById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const createRoom = async (req, res) => {
  try {
    const result = await Room.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const updateRoom = async (req, res) => {
  try {
    const result = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const deleteRoom = async (req, res) => {
  try {
    const result = await Room.findByIdAndDelete(req.params.id);
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const getServicesInRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId)
      .populate("services.serviceId")
      .exec();
    const services = room.services.map((serviceData) => serviceData.serviceId);
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getServicesInRoom,
};
