const express = require("express");
const cors = require("cors");
const { getStationsInformations } = require("./database/supabase");
const terminalsRoutes = require("./routes/routes");

const app = express();
const userRoutes = require("./routes/routes");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3310", "http://localhost:3000"],
  })
);

app.use("/api", userRoutes);

app.get("/api/stations", async (req, res) => {
  try {
    const { north, south, east, west } = req.query;
    const { data: stations, error } = await getStationsInformations(
      north,
      south,
      east,
      west
    );
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json(stations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.use("/api", terminalsRoutes);

const PORT = process.env.PORT || 3310;
app.listen(PORT, () => {
  console.info(`Server running on port: http://localhost:${PORT}`);
});
