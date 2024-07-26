const supabase = require("../database/supabase");

const getAllVehicles = async () => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("vehicle")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateVehicle = async (id, updatedData) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("vehicle")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const deleteVehicle = async (id) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("vehicle")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

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

  if (error) {
    throw new Error(error.message);
  }

  return { data, error };
};

module.exports = {
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
  getVehiclesByUserId,
  createVehicleUser,
  updateVehicleUser,
  deleteVehicleUser,
};
