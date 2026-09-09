const router = require("express").Router();
const { protect } = require("../middleware/protect");

router.get("/", protect, async (req, res) => {
    res.status(200).json({ success: true, data: [{ id: "ALT-001", projectId: req.query.projectId, severity: "CRITICAL", type: "COMPENSATION PENDING", title: "Compensation Pending", message: "Multiple cases require attention", status: "UNREAD", createdAt: new Date().toISOString() }] });
});
router.patch("/:id/read", protect, async (req, res) => {
    res.status(200).json({ success: true, data: { id: req.params.id, status: "READ" }});
});
module.exports = router;