// routes/gisRoutes.js
const express = require("express");
const router = express.Router();
const { getGISParcels} = require("../controllers/gisController");
 const {getProjectGIS} = require("../controllers/gisController");
const { protect } = require("../middleware/protect");

router.get("/parcels", protect, getGISParcels);
router.get("/projects/:projectId", protect, getProjectGIS);

module.exports = router;