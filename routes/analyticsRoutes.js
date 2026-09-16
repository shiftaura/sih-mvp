const express = require("express");
const router = express.Router();
const { getDashboardAnalytics, getProjectAnalytics } = require("../controllers/analyticsController");
const { protect } = require("../middleware/protect");

// Route for National Dashboard
router.get("/dashboard", protect, getDashboardAnalytics);

// Route for Project-specific Dashboard (Overview Tab)
router.get("/projects/:projectId", protect, getProjectAnalytics);

module.exports = router;