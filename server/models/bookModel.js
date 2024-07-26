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
    user_id: Number(userID), // Utiliser userID dans le code
    stationID,
    createAt,
    dateReservation,
    checkIn,
    checkOut,
    cost,
  }); // Debug log

  try {
    const { data, error } = await supabase
      .schema("geocode")
      .from("booking")
      .insert([
        {
          user_id: Number(userID), // Convertir userID en user_id
          stationID,
          createAt,
          dateReservation,
          checkIn,
          checkOut,
          cost,
        },
      ])
      .select(); // Ajoutez ceci pour retourner les données insérées

    if (error) {
      console.error("Error inserting booking:", error); // Debug log détaillé
      if (error.message) {
        console.error("Detailed error message:", error.message); // Message d'erreur détaillé
      }
      if (error.hint) {
        console.error("Error hint:", error.hint); // Indice d'erreur, si disponible
      }
    } else {
      console.info("Booking inserted successfully:", data); // Debug log
    }

    return { data, error };
  } catch (err) {
    console.error("Unexpected error inserting booking:", err); // Log des erreurs inattendues
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
      console.error("Error fetching booking:", error); // Debug log
      if (error.message) {
        console.error("Detailed error message:", error.message); // Message d'erreur détaillé
      }
      if (error.hint) {
        console.error("Error hint:", error.hint); // Indice d'erreur, si disponible
      }
    } else {
      console.info("Booking fetched successfully:", data); // Debug log
    }

    return { data, error };
  } catch (err) {
    console.error("Unexpected error fetching booking:", err); // Log des erreurs inattendues
    return { data: null, error: err };
  }
};

const getBookingsByUserIdModel = async (userId) => {
  try {
    const { data, error } = await supabase
      .schema("geocode")
      .from("booking")
      .select("*")
      .eq("user_id", userId); // Assurez-vous d'utiliser le bon champ pour l'ID utilisateur

    if (error) {
      console.error("Error fetching bookings:", error); // Debug log
      if (error.message) {
        console.error("Detailed error message:", error.message); // Message d'erreur détaillé
      }
      if (error.hint) {
        console.error("Error hint:", error.hint); // Indice d'erreur, si disponible
      }
    } else {
      console.info("Bookings fetched successfully:", data); // Debug log
    }

    return { data, error };
  } catch (err) {
    console.error("Unexpected error fetching bookings:", err); // Log des erreurs inattendues
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
