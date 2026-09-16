const express = require("express");
const router = express.Router();
const { getAlerts, markAlertAsRead } = require("../controllers/alertController");
const { protect } = require("../middleware/protect");

router.get("/", protect, getAlerts);
router.patch("/:id/read", protect, markAlertAsRead);

module.exports = router;