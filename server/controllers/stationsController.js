const { getStationsInformations } = require("../models/stationModel");

const browseStations = async (req, res, next) => {
  try {
    const { north, south, east, west } = req.query;
    const { data, error } = await getStationsInformations(
      north,
      south,
      east,
      west
    );
    if (error) {
      console.error("Error fetching stations informations:", error);
      return res.status(500).json({ error: error.message });
    }
    return res.json(data);
  } catch (err) {
    return next(err);
  }
};
module.exports = { browseStations };
