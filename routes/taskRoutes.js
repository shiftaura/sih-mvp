const express = require("express");
const router = express.Router();
const { getMyTasks, updateTaskStatus } = require("../controllers/taskController");
const { protect } = require("../middleware/protect");

router.get("/", protect, getMyTasks);
router.patch("/:id", protect, updateTaskStatus);

module.exports = router;