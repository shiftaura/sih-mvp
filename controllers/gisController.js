// @desc    Get GIS data for parcels with advanced search & filters
// @route   GET /api/gis/parcels
const getGISParcels = asyncHandler(async (req, res) => {
    const { projectId, search, status } = req.query;
    
    if (!projectId) {
        res.status(400);
        throw new Error("Project ID is required");
    }

    // Build the dynamic query object
    const query = { projectId };

    // Apply Status Filter (e.g., 'ACQUIRED', 'PENDING', 'DISPUTED')
    if (status && status !== 'All') {
        query.status = status;
    }

    // Apply Search Query (matches Khasra No or Village)
    if (search) {
        query.$or = [
            { khasraNo: { $regex: search, $options: 'i' } },
            { village: { $regex: search, $options: 'i' } }
        ];
    }

    // Select only necessary fields to keep the map fast!
    const parcels = await Parcel.find(query)
        .select('location areaSize ownerName khasraNo village status district');
    
    res.status(200).json({ success: true, data: parcels });
});