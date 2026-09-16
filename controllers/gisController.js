// controllers/gisController.js
const Parcel = require('../models/Parcel');
const Project = require('../models/Project');
const { asyncHandler } = require('../middleware/errorMiddleware'); // <-- Ye line zaroori hai!

// @desc    Get GIS data for parcels with advanced search & filters
// @route   GET /api/gis/parcels
const getGISParcels = asyncHandler(async (req, res) => {
    const { projectId, search, status } = req.query;
    
    if (!projectId) {
        res.status(400);
        throw new Error("Project ID is required");
    }

    const query = { projectId };

    if (status && status !== 'All') {
        query.status = status;
    }

    if (search) {
        query.$or = [
            { khasraNo: { $regex: search, $options: 'i' } },
            { village: { $regex: search, $options: 'i' } }
        ];
    }

    const parcels = await Parcel.find(query)
        .select('location areaSize ownerName khasraNo village status district');
    
    res.status(200).json({ success: true, data: parcels });
});

// @desc    Get GIS data for a specific project
// @route   GET /api/gis/projects/:projectId
const getProjectGIS = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.projectId).select('name targetDate');
    
    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }
    
    res.status(200).json({ success: true, data: project });
});

module.exports = { getGISParcels, getProjectGIS };