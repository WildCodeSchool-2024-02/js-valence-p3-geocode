require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl =
  process.env.SUPABASE_URL || "https://sjvoeniujbantluucjmc.supabase.co";
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqdm9lbml1amJhbnRsdXVjam1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5NTU0NjcsImV4cCI6MjAzNDUzMTQ2N30.O9k05J38Npoa-eJ6j-oRTeZR-yTXzsymhSB_4HJLwDc";
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
