const router = require("express").Router();
const { protect } = require("../middleware/protect");

router.get("/project/:projectId", protect, async (req, res) => {
    res.status(200).json({
        success: true,
        data: { summary: { totalFamilies: 40, rehabilitated: 32, resettled: 30, pending: 8 }, families: [] }
    });
});

router.patch("/:id", protect, async (req, res) => {
    res.status(200).json({ success: true, data: { id: req.params.id, ...req.body }});
});
module.exports = router;