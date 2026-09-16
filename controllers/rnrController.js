// controllers/rnrController.js
const Family = require('../models/Family');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get all families for a project (For R&R Tab)
// @route   GET /api/rnr/project/:projectId
const getProjectFamilies = asyncHandler(async (req, res) => {
    const families = await Family.find({ projectId: req.params.projectId }).populate('parcelId', 'khasraNo village');
    
    // Calculate summary stats required by frontend
    const totalFamilies = families.length;
    const rehabilitated = families.filter(f => f.rehabilitationStatus === 'Completed').length;
    const resettled = families.filter(f => f.resettlementStatus === 'Completed').length;
    const pending = totalFamilies - Math.max(rehabilitated, resettled);

    res.status(200).json({
        success: true,
        data: {
            summary: { totalFamilies, rehabilitated, resettled, pending },
            families
        }
    });
});

// @desc    Update family R&R details
// @route   PATCH /api/rnr/:id
const updateFamilyStatus = asyncHandler(async (req, res) => {
    const { rehabilitationStatus, resettlementStatus, benefits, remarks } = req.body;

    const family = await Family.findByIdAndUpdate(
        req.params.id,
        { rehabilitationStatus, resettlementStatus, benefits, remarks },
        { new: true, runValidators: true }
    );

    if (!family) {
        res.status(404);
        throw new Error("Family record not found");
    }

    res.status(200).json({ success: true, data: family });
});

module.exports = { getProjectFamilies, updateFamilyStatus };