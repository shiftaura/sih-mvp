const router = require("express").Router();
const { protect } = require("../middleware/protect");

router.get("/", protect, async (req, res) => {
    res.status(200).json({ success: true, data: [{ id: "TASK-001", parcelId: "PAR-003", taskType: "COMPENSATION_VERIFICATION", status: "PENDING", dueDate: "2026-09-05" }] });
});
router.post("/", protect, async (req, res) => res.status(201).json({ success: true, data: { id: "TASK-002", ...req.body, status: "PENDING" }}));
router.patch("/:id", protect, async (req, res) => res.status(200).json({ success: true, data: { id: req.params.id, status: req.body.status }}));
module.exports = router;