const express = require("express");
const router = express.Router();
const pool = require("../db");
const { protect } = require("../middleware/protect");

router.get("/", protect, async (req, res) => {
    const { projectId } = req.query;
    try {
        // Fetch notifications for a specific project or for the logged-in user
        let query = "SELECT * FROM notifications WHERE user_id = $1";
        let values = [req.user.id];
        
        if (projectId) {
            query += " AND project_id = $2";
            values.push(projectId);
        }
        
        query += " ORDER BY created_at DESC";
        const result = await pool.query(query, values);
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: error.message } });
    }
});

router.post("/", protect, async (req, res) => {
    const { projectId, type, message, targetUserId } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO notifications (project_id, type, message, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [projectId, type, message, targetUserId]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: error.message } });
    }
});

module.exports = router;