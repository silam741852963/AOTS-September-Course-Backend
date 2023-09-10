const Room = require("../models/Room");

const getAllRooms = async (req, res) => {
  const rooms = await Room.find();
  if (!rooms) return res.status(204).json({ message: "No rooms found." });
  res.json(rooms);
};

const getRoomById = async (req, res) => {
  const result = await Room.findById(req.params.id);
  try {
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const createRoom = async (req, res) => {
  const result = await Room.create(req.body);
  try {
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const updateRoom = async (req, res) => {
  const result = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  try {
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const deleteRoom = async (req, res) => {
  const result = await Room.findByIdAndDelete(req.params.id);
  try {
    res.status(204).json(result);
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
};
