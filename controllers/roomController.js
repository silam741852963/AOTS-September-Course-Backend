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
    res.json(room.services);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const addServicesInRoom = async (req, res) => {
  const exist = await Service.findById(req.body.serviceId);
  if (exist) {
    try {
      const room = await Room.findById(req.params.roomId)
        .populate("services.serviceId")
        .exec();
      room.services.push(req.body);
      await room.save();
      res.json(room);
    } catch (err) {
      res.status(500).json({ message: "Server error. Please try again." });
      console.log(err);
    }
  } else {
    res.status(404).json({ message: "Service does not exist" });
  }
};

const deleteServicesInRoom = async (req, res) => {
  const exist = await Service.findById(req.body.serviceId);
  if (exist) {
    try {
      const room = await Room.findById(req.params.roomId)
        .populate("services.serviceId")
        .exec();
      room.services = room.services.filter(
        (service) => service.serviceId._id.toString() != req.body.serviceId
      );
      await room.save();
      res.json(room);
    } catch (err) {
      res.status(500).json({ message: "Server error. Please try again." });
      console.log(err);
    }
  } else {
    res.status(404).json({ message: "Service does not exist" });
  }
};

const updateServicesInRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId)
      .populate("services.serviceId")
      .exec();
    room.services.forEach((service) => {
      const update = req.body.services.find(
        (s) => s.serviceId == service.serviceId._id.toString()
      );
      if (update.quantity) service.quantity = update.quantity;
    });
    await room.save();
    res.json(room);
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
  addServicesInRoom,
  deleteServicesInRoom,
  updateServicesInRoom,
};
