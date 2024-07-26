const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserByIdController,
  deleteUserById,
  updateUserById,  // Ensure this is included correctly
} = require("../controllers/userController");

const {
  getAllVehiclesController,
  updateVehicleController,
  deleteVehicleController,
} = require("../controllers/vehicleController");

const { getAllStations } = require("../models/stationModel");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", getAllUsers);
router.get("/users/:id", getUserByIdController);
router.delete("/users/:id", deleteUserById);
router.put("/users/:id", updateUserById);

router.get("/stations", getAllStations);

router.get("/vehicle", getAllVehiclesController);
router.put("/vehicle/:id", updateVehicleController);
router.delete("/vehicle/:id", deleteVehicleController);

module.exports = router;
