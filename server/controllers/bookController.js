const {
  createBooking,
  getBookingById,
  getBookingsByUserIdModel,
  deleteBooking,
} = require("../models/bookModel");

const registerBooking = async (req, res) => {
  try {
    const { userID, stationID, createAt, dateReservation, checkIn, checkOut } =
      req.body;
    const cost = 20;

    console.info("Received booking data:", req.body);

    if (
      !userID ||
      !stationID ||
      !createAt ||
      !dateReservation ||
      !checkIn ||
      !checkOut
    ) {
      console.error("Missing fields:", {
        userID,
        stationID,
        createAt,
        dateReservation,
        checkIn,
        checkOut,
      });
      return res.status(400).json({ error: "All fields are required" });
    }

    const bookingData = {
      userID,
      stationID,
      createAt: new Date(createAt).toISOString().split("T")[0],
      dateReservation: new Date(dateReservation).toISOString().split("T")[0],
      checkIn,
      checkOut,
      cost,
    };

    console.info("Booking data to be sent to createBooking:", bookingData);

    const { data, error } = await createBooking(bookingData);

    if (error) {
      console.error("Error creating booking:", error);
      return res.status(400).json({ error: error.message });
    }
    return res.status(201).json({ data });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getBooking = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await getBookingById(id);
  if (error) {
    console.error("Error fetching booking:", error);
    return res.status(400).json({ error: error.message });
  }
  console.info("Booking fetched successfully:", data);
  return res.status(200).json({ data });
};

const getBookingsByUserId = async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await getBookingsByUserIdModel(userId);
  if (error) {
    console.error("Error fetching bookings:", error);
    return res.status(400).json({ error: error.message });
  }
  console.info("Bookings fetched successfully:", data);
  return res.status(200).json({ data });
};
const deleteBookingById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await deleteBooking(id);
  if (error) {
    console.error("Error deleting booking:", error);
    return res.status(400).json({ error: error.message });
  }
  console.info("Booking deleted successfully:", data);
  return res.status(200).json({ data });
};

module.exports = {
  registerBooking,
  getBooking,
  getBookingsByUserId,
  deleteBookingById,
};
