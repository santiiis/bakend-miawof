const express = require("express");
const {
  createVaccine,
  getVaccines,
} = require("../controllers/vaccines.controller");

const router = express.Router();

router.post("/", createVaccine);
router.get("/", getVaccines);

module.exports = router;
