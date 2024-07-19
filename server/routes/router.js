const express = require("express");
const { browseStations } = require("../controllers/terminalController");

const router = express.Router();

router.get("/stations", browseStations);

module.exports = router;
