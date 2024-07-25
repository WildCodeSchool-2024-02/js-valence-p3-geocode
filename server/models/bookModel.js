const supabase = require("../database/supabase");

const createBooking = async (bookingData) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("booking")
    .insert([bookingData]);
  return { data, error };
};

const getBookingById = async (id) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("booking")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
};

module.exports = {
  createBooking,
  getBookingById,
};
