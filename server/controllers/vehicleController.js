const {
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
  getVehiclesByUserId,
  createVehicleUser,
  updateVehicleUser,
  deleteVehicleUser,
} = require("../models/vehicleModel");

const getAllVehiclesController = async (req, res) => {
  try {
    const data = await getAllVehicles();
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateVehicleController = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const data = await updateVehicle(id, updatedData);
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteVehicleController = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await deleteVehicle(id);
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getUserVehicles = async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await getVehiclesByUserId(userId);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ data });
};
const addUserVehicle = async (req, res) => {
  const vehicleData = req.body;
  const { data, error } = await createVehicleUser(vehicleData);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(201).json({ data: data[0] });
};
const updateUserVehicle = async (req, res) => {
  const { id } = req.params;
  const vehicleData = req.body;
  const { data, error } = await updateVehicleUser(id, vehicleData);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ data: data[0] });
};
const deleteUserVehicle = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await deleteVehicleUser(id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ data });
};

module.exports = {
  getAllVehiclesController,
  updateVehicleController,
  deleteVehicleController,
  getUserVehicles,
  addUserVehicle,
  updateUserVehicle,
  deleteUserVehicle,
};
