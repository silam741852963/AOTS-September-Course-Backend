const Service = require("../models/Service");

const getAllServices = async (req, res) => {
  const services = await Service.find();
  if (!services) return res.status(204).json({ message: "No rooms found." });
  res.json(services);
};

const getServiceById = async (req, res) => {
  try {
    const result = await Service.findById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const createService = async (req, res) => {
  try {
    const result = await Service.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const updateService = async (req, res) => {
  try {
    const result = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

const deleteService = async (req, res) => {
  try {
    const result = await Service.findByIdAndDelete(req.params.id);
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
    console.log(err);
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
