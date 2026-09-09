const express = require("express");
const router = express.Router();
const pool = require("../db");
const { protect } = require("../middleware/protect");

router.get("/", protect, async (req, res) => {
    const { projectId } = req.query;
    if (!projectId) return res.status(400).json({ success: false, message: "Project ID is required" });

    try {
        const result = await pool.query("SELECT * FROM awards WHERE project_id = $1 ORDER BY created_at DESC", [projectId]);
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: error.message } });
    }
});

router.post("/", protect, async (req, res) => {
    const { projectId, awardNumber, awardAmount, awardDate } = req.body;
    
    if (!projectId || !awardNumber || !awardAmount || !awardDate) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO awards (project_id, award_number, award_amount, award_date, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [projectId, awardNumber, awardAmount, awardDate, req.user.id]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: error.message } });
    }
});

module.exports = router;