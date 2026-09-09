const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/protect.js");
const transition = require("../middleware/transition.js"); // Adjust path if transition.js is elsewhere

router.post("/transition", transition);

router.get("/:projectId", protect, async (req, res) => {
    try {
        // Mocking the steps array exactly as per contract MVP for the Golden Demo
        res.status(200).json({
            success: true,
            data: {
                currentStatus: "COMPENSATION",
                steps: [
                    { status: "DRAFT", completed: true, completedAt: "2026-08-01T10:00:00Z" },
                    { status: "SUBMITTED", completed: true, completedAt: "2026-08-02T11:00:00Z" },
                    { status: "UNDER SCRUTINY", completed: true },
                    { status: "APPROVED", completed: true },
                    { status: "NOTIFICATION", completed: true },
                    { status: "AWARD", completed: true },
                    { status: "COMPENSATION", completed: false, current: true },
                    { status: "POSSESSION", completed: false },
                    { status: "R&R", completed: false },
                    { status: "CLOSED", completed: false }
                ]
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: { code: "INTERNAL_SERVER_ERROR", message: err.message }});
    }
});

module.exports = router;