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
    .select();
  return { data, error };
};

const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .select("*")
    .eq("email", email)
    .single();

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
const updateUser = async (userId, updatedData) => {
  console.info("updateUser - userId:", userId);
  console.info("updateUser - updatedData:", updatedData);

  const { data, error } = await supabase
    .schema("geocode")
    .from("user")
    .update(updatedData)
    .eq("user_id", userId)
    .select();

  if (error) {
    console.error("updateUser - error:", error.message);
    throw new Error(error.message);
  }

  console.info("updateUser - data:", data);
  return { data, error }; // Assurez-vous de renvoyer les deux valeurs
};
module.exports = {
  createUser,
  getUserByEmail,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
