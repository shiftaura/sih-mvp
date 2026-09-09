const router = require("express").Router();
const { protect } = require("../middleware/protect");

router.get("/", protect, async (req, res) => {
    res.status(200).json({ success: true, data: [] });
});

router.get("/:familyId", protect, async (req, res) => {
    res.status(200).json({ success: true, data: { id: req.params.familyId } });
});

router.post("/", protect, async (req, res) => {
    const { projectId, parcelId, familyCode, affectedArea, displacementStatus } = req.body;
    res.status(201).json({ success: true, data: { projectId, parcelId, familyCode, affectedArea, displacementStatus }});
});
module.exports = router;