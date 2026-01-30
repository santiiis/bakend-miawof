const express = require("express");
const {
  getDashboardDog,
} = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/dogs/:id", getDashboardDog);

module.exports = router;
