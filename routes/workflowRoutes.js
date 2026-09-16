const express = require("express");
const router = express.Router();
const { transitionProject, getWorkflowHistory } = require("../controllers/workflowController");
const { protect } = require("../middleware/protect");

router.post("/transition", protect, transitionProject);
router.get("/:projectId", protect, getWorkflowHistory);

module.exports = router;