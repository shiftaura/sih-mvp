const router = require("express").Router();
router.get("/parcels", async (req, res) => {
    const { projectId } = req.query;
    res.status(200).json({ success: true, data: { message: `GIS data for Project ID: ${projectId}` } });    
});

router.get("/projects/:projectId", async (req, res) => {
    const { projectId } = req.params;
    res.status(200).json({ success: true, data: { message: `GIS data for Project ID: ${projectId}` } });
});

module.exports = router;