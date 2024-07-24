const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const secretKey =
  "d8c8d67c6f24a6be3624c8eab0f5f32f79d7e9b8e1aaf9163cb1d7d6954d4cde7a908e2e3e8e9f3d1f6c2f3b7e9a9b6f";

function generateToken(user) {
  const payload = {
    id: user.user_id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, secretKey, {
    expiresIn: "1h",
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

module.exports = { generateToken, verifyToken, hashPassword };
