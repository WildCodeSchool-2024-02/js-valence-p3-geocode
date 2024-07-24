const express = require("express");
const {
  registerBooking,
  getBooking,
} = require("../controllers/bookController");

const router = express.Router();

router.post("/booking", registerBooking);
router.get("/booking/:id", getBooking);

module.exports = router;
