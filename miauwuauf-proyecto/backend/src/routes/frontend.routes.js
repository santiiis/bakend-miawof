const express = require("express");
const router = express.Router();

const {
  getPets,
  getVaccinations,
  getEvents,
  getCollars
} = require("../controllers/frontend.controller");

router.get("/pets", getPets);
router.get("/vaccinations", getVaccinations);
router.get("/events", getEvents);
router.get("/collars", getCollars);

module.exports = router;
