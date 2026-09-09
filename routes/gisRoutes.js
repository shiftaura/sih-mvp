const express = require("express");
const router = express.Router();
const pool = require("../db");
const { protect } = require("../middleware/protect");

router.get("/parcels", protect, async (req, res) => {
    const { projectId } = req.query;
    if (!projectId) return res.status(400).json({ success: false, message: "Project ID is required" });

    try {
        // Assuming coordinates are stored as PostGIS geometry or JSON
        const result = await pool.query("SELECT id, geo_coordinates, area_size FROM parcels WHERE project_id = $1", [projectId]);
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: error.message } });
    }
});

router.get("/projects/:projectId", protect, async (req, res) => {
    const { projectId } = req.params;
    
    try {
        const result = await pool.query("SELECT id, name, project_boundaries FROM projects WHERE id = $1", [projectId]);
        if (result.rows.length === 0) return res.status(404).json({ success: false, message: "Project not found" });
        
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: error.message } });
    }
});

module.exports = router;