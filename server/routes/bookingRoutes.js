const express = require("express");
const {
  registerBooking,
  getBooking,
  getBookingsByUserId,
  deleteBookingById,
} = require("../controllers/bookController");

const router = express.Router();

router.post("/booking", registerBooking);
router.get("/booking/:id", getBooking);
router.get("/booking/user/:userId", getBookingsByUserId);
router.delete("/booking/:id", deleteBookingById);

module.exports = router;
