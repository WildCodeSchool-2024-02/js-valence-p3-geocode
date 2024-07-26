const {
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
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

module.exports = {
  getAllVehiclesController,
  updateVehicleController,
  deleteVehicleController,
};
