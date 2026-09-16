const Objection = require('../models/Objection');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get all objections for a project
// @route   GET /api/objections/project/:projectId
const getProjectObjections = asyncHandler(async (req, res) => {
    // Populate parcel data to show Khasra number on frontend
    const objections = await Objection.find({ projectId: req.params.projectId })
        .populate('parcelId', 'khasraNo village')
        .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: objections });
});

// @desc    Create a new objection
// @route   POST /api/objections
const createObjection = asyncHandler(async (req, res) => {
    const { projectId, parcelId, raisedBy, reason } = req.body;

    if (!projectId || !parcelId || !raisedBy || !reason) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    const objection = await Objection.create({ projectId, parcelId, raisedBy, reason });
    res.status(201).json({ success: true, data: objection });
});

// @desc    Resolve an objection
// @route   PATCH /api/objections/:id
const resolveObjection = asyncHandler(async (req, res) => {
    const { resolutionNote } = req.body;

    if (!resolutionNote) {
        res.status(400);
        throw new Error("Resolution note is required to resolve an objection");
    }

    const objection = await Objection.findByIdAndUpdate(
        req.params.id,
        { status: 'RESOLVED', resolutionNote },
        { new: true, runValidators: true }
    );

    if (!objection) {
        res.status(404);
        throw new Error("Objection not found");
    }

    res.status(200).json({ success: true, data: objection, message: "Objection resolved successfully" });
});

module.exports = { getProjectObjections, createObjection, resolveObjection };