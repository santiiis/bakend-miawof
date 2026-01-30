const express = require("express");
const {
  createCollar,
  linkCollar,
  pingCollar,
} = require("../controllers/collars.controller");

const router = express.Router();

router.post("/", createCollar);
router.post("/link", linkCollar);
router.post("/:serial/ping", pingCollar);

module.exports = router;
