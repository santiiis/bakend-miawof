const express = require("express");
const {
  createDog,
  getDogs,
  getDogById,
  getLastLocation,
  addVaccination,
  getVaccinations,
} = require("../controllers/dogs.controller");

const router = express.Router();

router.post("/", createDog);
router.get("/", getDogs);
router.get("/:id", getDogById);
router.get("/:id/last-location", getLastLocation);

router.post("/:id/vaccinations", addVaccination);
router.get("/:id/vaccinations", getVaccinations);

module.exports = router;
