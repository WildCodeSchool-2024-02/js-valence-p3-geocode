const { createBooking, getBookingById } = require("../models/bookModel");

const registerBooking = async (req, res) => {
  try {
    const { userID, stationID, createAt, dateReservation, checkIn, checkOut } =
      req.body;
    const cost = 20;

    if (
      !userID ||
      !stationID ||
      !createAt ||
      !dateReservation ||
      !checkIn ||
      !checkOut
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { data, error } = await createBooking({
      userID,
      stationID,
      createAt,
      dateReservation,
      checkIn,
      checkOut,
      cost,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(201).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
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
