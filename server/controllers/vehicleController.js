const {
  getVehiclesByUserId,
  createVehicleUser,
  updateVehicleUser,
  deleteVehicleUser,
} = require("../models/vehicleModel");

const getUserVehicles = async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await getVehiclesByUserId(userId);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ data });
};

const addVehicle = async (req, res) => {
  const vehicleData = req.body;
  const { data, error } = await createVehicleUser(vehicleData);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(201).json({ data: data[0] });
};

const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const vehicleData = req.body;
  const { data, error } = await updateVehicleUser(id, vehicleData);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ data: data[0] });
};

const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await deleteVehicleUser(id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ data });
};

module.exports = {
  getUserVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};
