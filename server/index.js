const express = require("express");
const cors = require("cors");

const app = express();
const userRoutes = require("./routes/routes");
const bookingRoutes = require("./routes/bookingRoutes");
const stationRoutes = require("./routes/stationRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3310", "http://localhost:3000"],
  })
);

app.use("/api", userRoutes);
app.use("/api", stationRoutes);
app.use("/api", bookingRoutes);
app.use("/api/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 3310;
app.listen(PORT, () => {
  console.info(`Server running on port: http://localhost:${PORT}`);
});
