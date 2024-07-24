const {
  createUser,
  getUserByEmail,
  getUsers,
  getUserById,
  deleteUser,
} = require("../models/userModel");
const { generateToken, hashPassword } = require("./authToken");

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
    role = "User", // Default role
    numVehicles,
  } = req.body;

  console.log("registerUser - request body:", req.body);

  const { data: existingUser, error: findError } = await getUserByEmail(email);
  console.log("registerUser - getUserByEmail result:", {
    existingUser,
    findError,
  });

  if (findError) {
    return res.status(400).json({ error: findError.message });
  }
  if (existingUser) {
    return res.status(400).json({ error: "Email is already in use" });
  }

  const hashedPassword = hashPassword(password);

  const { data, error } = await createUser({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    gender,
    birthDate,
    postalCode,
    city,
    role, // Ensure role is passed correctly
    numVehicles,
  });

  console.log("registerUser - createUser result:", { data, error });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(500).json({ error: "User creation failed" });
  }

  const token = generateToken(data[0]); // Access the first element since insert returns an array
  return res.status(201).json({ data: data[0], token });
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

  const hashedPassword = hashPassword(password);
  if (user.password !== hashedPassword) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user);
  return res.status(200).json({
    message: "Login successful",
    token,
    role: user.role,
  });
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
