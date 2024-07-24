const express = require("express");
const cors = require("cors");

const bookingRoutes = require("./routes/bookingRoutes");
const stationRoutes = require("./routes/stationRoutes");

const app = express();
const userRoutes = require("./routes/routes");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3310", "http://localhost:3000"],
  })
);

app.use("/api", userRoutes);
app.use("/api", stationRoutes);
app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 3310;
app.listen(PORT, () => {
  console.info(`Server running on port: http://localhost:${PORT}`);
});
