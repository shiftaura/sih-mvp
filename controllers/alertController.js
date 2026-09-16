const Alert = require('../models/Alert');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get alerts for the logged-in user
// @route   GET /api/alerts
const getAlerts = asyncHandler(async (req, res) => {
    // Fetch alerts targeting this user OR global alerts, sorted by newest
    const alerts = await Alert.find({ 
        $or: [{ targetUserId: req.user._id }, { targetUserId: { $exists: false } }] 
    })
    .populate('projectId', 'name')
    .sort({ createdAt: -1 })
    .limit(50); // Limit to recent 50 to maintain performance

    res.status(200).json({ success: true, data: alerts });
});

// @desc    Mark an alert as read
// @route   PATCH /api/alerts/:id/read
const markAlertAsRead = asyncHandler(async (req, res) => {
    const alert = await Alert.findByIdAndUpdate(
        req.params.id,
        { status: 'READ' },
        { new: true }
    );

    if (!alert) {
        res.status(404);
        throw new Error("Alert not found");
    }

    res.status(200).json({ success: true, data: alert });
});

module.exports = { getAlerts, markAlertAsRead };