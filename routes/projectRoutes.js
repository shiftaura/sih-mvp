// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { getProjects, createProject, getProjectById, updateProject } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/protect');

router.get('/', protect, getProjects);
router.post("/", protect, authorize('centralOfficer', 'stateOfficer'), createProject);
router.get("/:projectId", protect, getProjectById);
router.patch("/:projectId", protect, authorize('centralOfficer', 'stateOfficer'), updateProject);

module.exports = router;