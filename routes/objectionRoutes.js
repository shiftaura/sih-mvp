const express = require("express");
const router = express.Router();
const { getProjectObjections, createObjection, resolveObjection } = require("../controllers/objectionController");
const { protect } = require("../middleware/protect");

router.get("/project/:projectId", protect, getProjectObjections);
router.post("/", protect, createObjection);
router.patch("/:id", protect, resolveObjection);

module.exports = router;