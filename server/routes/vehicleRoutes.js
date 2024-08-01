const express = require("express");

const {
  getUserVehicles,
  addUserVehicle,
  updateUserVehicle,
  deleteUserVehicle,
  getAllVehiclesController,
  updateVehicleController,
  deleteVehicleController,
} = require("../controllers/vehicleController");

const router = express.Router();

router.get("/:userId", getUserVehicles);
router.post("/", addUserVehicle);
router.put("/:id", updateUserVehicle);
router.delete("/:id", deleteUserVehicle);
router.get("/", getAllVehiclesController);
router.put("/vehicle/:id", updateVehicleController);
router.delete("/vehicle/:id", deleteVehicleController);

module.exports = router;
