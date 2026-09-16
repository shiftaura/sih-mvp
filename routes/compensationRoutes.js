const express = require("express");
const router = express.Router();
const { createCompensation, getProjectCompensation, makePayment } = require("../controllers/compensationController");
const { protect } = require("../middleware/protect");

router.post("/", protect, createCompensation);
router.get("/project/:projectId", protect, getProjectCompensation);
router.post("/payment", protect, makePayment);

module.exports = router;