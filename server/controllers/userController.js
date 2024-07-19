const {
  createUser,
  getUserByEmail,
  getUsers,
  getUserById,
  deleteUser,
} = require("../models/userModel");

const registerUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    gender,
    birthDate,
    postalCode,
    city,
  } = req.body;

  const { data, error } = await createUser({
    email,
    password,
    firstName,
    lastName,
    gender,
    birthDate,
    postalCode,
    city,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(201).json({ data });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await getUserByEmail(email);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  return res.status(200).json({ message: "Login successful", user });
};

const getAllUsers = async (_, res) => {
  const { data, error } = await getUsers();
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ data });
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await getUserById(id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ data });
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await deleteUser(id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ data });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserByIdController,
  deleteUserById,
};
