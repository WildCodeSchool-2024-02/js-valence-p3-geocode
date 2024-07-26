const supabase = require("../database/supabase");

const getStationsInformations = async (north, south, east, west) => {
  const { data: stations, error } = await supabase
    .schema("geocode")
    .from("stationsinformations")
    .select(
      "stationID,nom_station, nom_amenageur, siren_amenageur, contact_amenageur, nom_operateur, contact_operateur, consolidated_longitude, consolidated_latitude, reservation, adresse_station, horaires, telephone_operateur, condition_acces"
    )
    .filter("consolidated_latitude", "gte", south)
    .filter("consolidated_latitude", "lte", north)
    .filter("consolidated_longitude", "gte", west)
    .filter("consolidated_longitude", "lte", east);
  return { data: stations, error };
};

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

module.exports = { getAllStations, getStationsInformations };
