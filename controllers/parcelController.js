// controllers/parcelController.js
const Parcel = require('../models/Parcel');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get all parcels (optionally filtered by project)
// @route   GET /api/parcels
const getParcels = asyncHandler(async (req, res) => {
    const { projectId } = req.query;
    const query = projectId ? { projectId } : {};
    
    const parcels = await Parcel.find(query);
    
    res.status(200).json({ success: true, data: parcels });
});

// @desc    Create a new parcel
// @route   POST /api/parcels
const createParcel = asyncHandler(async (req, res) => {
    const { projectId, ownerName, contactInfo, areaSize, geoCoordinates } = req.body;

    if (!projectId || !ownerName || !areaSize || !geoCoordinates) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    const parcel = await Parcel.create({
        projectId,
        ownerName,
        contactInfo,
        areaSize,
        location: {
            type: 'Polygon',
            coordinates: geoCoordinates // Frontend must send [[[lng, lat], [lng,lat]...]]
        }
    });

    res.status(201).json({ 
        success: true, 
        data: parcel, 
        message: "Parcel created successfully" 
    });
});

// @desc    Get parcel owners
// @route   GET /api/parcels/:parcelId/owners
const getParcelOwners = asyncHandler(async (req, res) => {
    const parcel = await Parcel.findById(req.params.parcelId).select('ownerName contactInfo');
    
    if (!parcel) {
        res.status(404);
        throw new Error("Parcel not found");
    }
    
    // Wrapped in an array to match your previous frontend contract
    res.status(200).json({ success: true, data: [parcel] });
});

module.exports = { getParcels, createParcel, getParcelOwners };