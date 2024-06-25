const express = require("express");
require("dotenv").config();
const { getUsers, getGeocode } = require("./database/supabase");

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

app.get("/api/users", async (_, response) => {
  try {
    const [userResult, geocodeResult] = await Promise.all([
      getUsers(),
      getGeocode(),
    ]);
    const { data: userData, error: userError } = userResult;
    const { data: geocodeData, error: geocodeError } = geocodeResult;

    if (userError || geocodeError) {
      return response.status(500).json({
        userError: userError ? userError.message : null,
        geocodeError: geocodeError ? geocodeError.message : null,
      });
    }

    return response.json({
      users: userData,
      geocode: geocodeData,
    });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
