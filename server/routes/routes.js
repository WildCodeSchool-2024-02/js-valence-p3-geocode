const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserByIdController,
  deleteUserById,
  updateUserById,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserByIdController);
router.delete("/users/:id", deleteUserById);
router.put("/users/:id", updateUserById);

module.exports = router;
