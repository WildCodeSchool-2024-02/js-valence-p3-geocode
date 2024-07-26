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

module.exports = {
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
};
