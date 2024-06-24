require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getUsers = async () => {
  const { data: user, error } = await supabase
    .from("user")
    .select("*");
  return { data: user, error };
};

const getGeocode = async () => {
  const { data: user, error } = await supabase.schema("geocode")
    .from("user ")
    .select("*");
  return { data: user, error };
};

module.exports = { getUsers, getGeocode };