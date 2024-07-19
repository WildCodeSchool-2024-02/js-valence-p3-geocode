const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserByIdController,
  deleteUserById,
} = require("../controllers/userController");
const { browseStations } = require("../controllers/stationsController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserByIdController);
router.delete("/users/:id", deleteUserById);

router.get("/stations", browseStations);

module.exports = router;
