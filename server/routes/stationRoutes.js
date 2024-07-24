const express = require("express");
const { browseStations } = require("../controllers/stationsController");

const router = express.Router();

router.get("/stations", browseStations);

module.exports = router;
