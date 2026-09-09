const router = require("express").Router();
const { protect } = require("../middleware/protect");

router.get("/", protect, async (req, res) => {
    res.status(200).json({ success: true, data: [{ id: "AUD-101", user: { id: "USR-004", name: "Demo District Officer", role: "DISTRICT OFFICER" }, action: "WORKFLOW TRANSITION", entityType: "PROJECT", entityId: req.query.projectId, oldValue: "COMPENSATION", newValue: "POSSESSION", createdAt: new Date().toISOString() }] });
});
module.exports = router;