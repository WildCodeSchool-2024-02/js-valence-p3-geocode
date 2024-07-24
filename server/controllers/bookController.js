const { createBooking, getBookingById } = require("../models/bookModel");

const registerBooking = async (req, res) => {
  const { userID, stationID, cost, checkIn, checkOut } = req.body;

  const { data, error } = await createBooking({
    userID,
    stationID,
    createdAt: new Date().toISOString(),
    cost,
    checkIn,
    checkOut,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(201).json({ data });
};

const getBooking = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await getBookingById(id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ data });
};

module.exports = {
  registerBooking,
  getBooking,
};
