const supabase = require("../database/supabase");

const createUser = async (userData) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .insert([userData]);
  return { data, error };
};

const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .select("*")
    .eq("email", email)
    .single();
  return { data, error };
};

const getUsers = async () => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .select("*");
  return { data, error };
};

const getUserById = async (userId) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .select("*")
    .eq("user_id", userId)
    .single();
  return { data, error };
};

const deleteUser = async (userId) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .delete()
    .eq("user_id", userId);
  return { data, error };
};

module.exports = {
  createUser,
  getUserByEmail,
  getUsers,
  getUserById,
  deleteUser,
};
