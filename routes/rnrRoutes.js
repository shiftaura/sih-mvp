// routes/rnrRoutes.js
const express = require("express");
const router = express.Router();
const { getProjectFamilies, updateFamilyStatus } = require("../controllers/rnrController");
const { protect } = require("../middleware/protect");

router.get("/project/:projectId", protect, getProjectFamilies);
router.patch("/:id", protect, updateFamilyStatus);

module.exports = router;