const express = require("express");
const router = express.Router();
const pool = require("../db");
const { protect } = require("../middleware/protect");

router.get('/', protect, async (req, res) => {
    const { projectId } = req.query;
    try {
        let query = "SELECT * FROM parcels";
        let values = [];
        if (projectId) {
            query += " WHERE project_id = $1";
            values.push(projectId);
        }
        const result = await pool.query(query, values);
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: error.message } });
    }
});

router.post('/', protect, async (req, res) => {
    const { projectId, ownerName, areaSize, geoCoordinates } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO parcels (project_id, owner_name, area_size, geo_coordinates) VALUES ($1, $2, $3, $4) RETURNING *",
            [projectId, ownerName, areaSize, geoCoordinates]
        );
        res.status(201).json({ success: true, data: result.rows[0], message: "Parcel created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: error.message } });
    }
});

router.get('/:parcelId/owners', protect, async (req, res) => {
    const { parcelId } = req.params;
    try {
        const result = await pool.query("SELECT owner_name, contact_info FROM parcel_owners WHERE parcel_id = $1", [parcelId]);
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: error.message } });
    }
});

module.exports = router;