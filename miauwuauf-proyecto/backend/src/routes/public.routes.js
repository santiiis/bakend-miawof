const express = require("express");
const {
  findDogByQR,
  reportFoundDog,
} = require("../controllers/public.controller");

const router = express.Router();

router.get("/found/:qrToken", findDogByQR);
router.post("/found/:qrToken/report", reportFoundDog);

module.exports = router;
