const supabase = require("../database/supabase");

const getVehiclesByUserId = async (userId) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("vehicle")
    .select("*")
    .eq("user_id", userId);
  return { data, error };
};

const createVehicleUser = async (vehicleData) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("vehicle")
    .insert([vehicleData])
    .select();
  return { data, error };
};

const updateVehicleUser = async (id, vehicleData) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("vehicle")
    .update(vehicleData)
    .eq("id", id)
    .select();
  return { data, error };
};

const deleteVehicleUser = async (id) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("vehicle")
    .delete()
    .eq("id", id)
    .select();
  return { data, error };
};

module.exports = {
  getVehiclesByUserId,
  createVehicleUser,
  updateVehicleUser,
  deleteVehicleUser,
};
