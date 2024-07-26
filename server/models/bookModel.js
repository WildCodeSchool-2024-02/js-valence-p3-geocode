const supabase = require("../database/supabase");

const createBooking = async ({
  userID,
  stationID,
  createAt,
  dateReservation,
  checkIn,
  checkOut,
  cost,
}) => {
  console.info("Creating booking with data:", {
    user_id: Number(userID), 
    stationID,
    createAt,
    dateReservation,
    checkIn,
    checkOut,
    cost,
  }); 

  try {
    const { data, error } = await supabase
      .schema("geocode")
      .from("booking")
      .insert([
        {
          user_id: Number(userID),
          stationID,
          createAt,
          dateReservation,
          checkIn,
          checkOut,
          cost,
        },
      ])
      .select(); 

    if (error) {
      console.error("Error inserting booking:", error);
      if (error.message) {
        console.error("Detailed error message:", error.message);
      }
      if (error.hint) {
        console.error("Error hint:", error.hint);
      }
    } else {
      console.info("Booking inserted successfully:", data);
    }

    return { data, error };
  } catch (err) {
    console.error("Unexpected error inserting booking:", err);
    return { data: null, error: err };
  }
};

const getBookingById = async (id) => {
  try {
    const { data, error } = await supabase
      .schema("geocode")
      .from("booking")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching booking:", error);
      if (error.message) {
        console.error("Detailed error message:", error.message); 
      }
      if (error.hint) {
        console.error("Error hint:", error.hint); 
      }
    } else {
      console.info("Booking fetched successfully:", data); 
    }

    return { data, error };
  } catch (err) {
    console.error("Unexpected error fetching booking:", err);
    return { data: null, error: err };
  }
};

const getBookingsByUserIdModel = async (userId) => {
  try {
    const { data, error } = await supabase
      .schema("geocode")
      .from("booking")
      .select("*")
      .eq("user_id", userId); 

    if (error) {
      console.error("Error fetching bookings:", error); 
      if (error.message) {
        console.error("Detailed error message:", error.message);
      }
      if (error.hint) {
        console.error("Error hint:", error.hint); 
      }
    } else {
      console.info("Bookings fetched successfully:", data);
    }

    return { data, error };
  } catch (err) {
    console.error("Unexpected error fetching bookings:", err);
    return { data: null, error: err };
  }
};
const deleteBooking = async (id) => {
  try {
    const { data, error } = await supabase
      .schema("geocode")
      .from("booking")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting booking:", error);
      if (error.message) {
        console.error("Detailed error message:", error.message);
      }
      if (error.hint) {
        console.error("Error hint:", error.hint);
      }
    } else {
      console.info("Booking deleted successfully:", data);
    }

    return { data, error };
  } catch (err) {
    console.error("Unexpected error deleting booking:", err);
    return { data: null, error: err };
  }
};
module.exports = {
  deleteBooking,
  createBooking,
  getBookingById,
  getBookingsByUserIdModel,
};
