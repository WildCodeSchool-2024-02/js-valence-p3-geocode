require("dotenv").config({ path: "../..env " });
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getStationsInformations = async (north, south, east, west) => {
  const { data: stations, error } = await supabase
    .schema("geocode")
    .from("stationsinformations")
    .select("*")
    .filter("consolidated_latitude", "gte", south)
    .filter("consolidated_latitude", "lte", north)
    .filter("consolidated_longitude", "gte", west)
    .filter("consolidated_longitude", "lte", east);
  if (error) {
    console.error("Error fetching stations from Supabase:", error);
  } else {
    console("Stations fetched successfully from Supabase:", stations);
  }
  return { data: stations, error };
};

module.exports = { getStationsInformations };
