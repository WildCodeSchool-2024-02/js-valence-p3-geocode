const supabase = require("../database/supabase");

const createUser = async (userData) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .insert([
      {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        birthDate: userData.birthDate,
        postalCode: userData.postalCode,
        city: userData.city,
        role: userData.role,
        numVehicles: userData.numVehicles,
      },
    ])
    .select(); // Ensure the inserted data is selected and returned

  console.log("createUser data:", data);
  console.log("createUser error:", error);
  return { data, error };
};

const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .select("*")
    .eq("email", email)
    .single();

  console.log("getUserByEmail:", { data, error });

  if (error && error.details === "The result contains 0 rows") {
    return { data: null, error: null };
  }

  return { data, error };
};

const getUsers = async () => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .select("*");

  console.log("getUsers:", { data, error });
  return { data, error };
};

const getUserById = async (userId) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .select("*")
    .eq("user_id", userId)
    .single();

  console.log("getUserById:", { data, error });
  return { data, error };
};

const deleteUser = async (userId) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .delete()
    .eq("user_id", userId);

  console.log("deleteUser:", { data, error });
  return { data, error };
};

module.exports = {
  createUser,
  getUserByEmail,
  getUsers,
  getUserById,
  deleteUser,
};
