// routes/parcelRoutes.js
const express = require("express");
const router = express.Router();
const { getParcels, createParcel, getParcelOwners } = require("../controllers/parcelController");
const { protect } = require("../middleware/protect");

router.get('/', protect, getParcels);
router.post('/', protect, createParcel);
router.get('/:parcelId/owners', protect, getParcelOwners);

module.exports = router;