const supabase = require("../database/supabase");

const getAllStations = async (req, res) => {
  try {
    const { data, error } = await supabase
      .schema("geocode")
      .from("stationsinformations")
      .select("*");

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStations,
};
