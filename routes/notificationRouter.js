const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const { protect } = require("../middleware/protect");
const { asyncHandler } = require("../middleware/errorMiddleware");

router.get("/", protect, asyncHandler(async (req, res) => {
    const { projectId } = req.query;
    const query = { userId: req.user._id };
    
    if (projectId) query.projectId = projectId;

    const notifications = await Notification.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
}));

router.post("/", protect, asyncHandler(async (req, res) => {
    const { targetUserId, projectId, type, message } = req.body;
    
    const notification = await Notification.create({
        userId: targetUserId,
        projectId,
        type,
        message
    });
    
    res.status(201).json({ success: true, data: notification });
}));

module.exports = router;