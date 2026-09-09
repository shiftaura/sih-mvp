const router = require("express").Router();
const { protect } = require("../middleware/protect");

router.get("/", protect, async (req, res) => {
    res.status(200).json({
        success: true,
        data: [{ id: "OB-001", parcelId: req.query.parcelId || "PAR-003", raisedBy: "Demo Owner 1", reason: "Compensation amount disputed", status: "UNDER REVIEW", createdAt: new Date().toISOString() }]
    });
});

router.post("/", protect, async (req, res) => {
    res.status(201).json({ success: true, data: { id: "OB-002", ...req.body, status: "OPEN" }});
});

router.patch("/:id", protect, async (req, res) => {
    res.status(200).json({ success: true, data: { id: req.params.id, status: req.body.status, resolutionNote: req.body.resolutionNote }});
});
module.exports = router;