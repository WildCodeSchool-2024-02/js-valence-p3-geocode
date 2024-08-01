const express = require("express");
const { browseStations } = require("../controllers/stationsController");

const router = express.Router();

router.get("/stations/bbox", browseStations);

module.exports = router;
