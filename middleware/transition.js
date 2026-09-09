const express = require("express");
const router = express.Router();
const pool = require("../db");
const { protect } = require("../middleware/protect");

// Assuming this should be a POST or PUT route. Let's use POST for now.
router.post("/", protect, async (req, res) => {
    const { projectId, nextStatus, comment } = req.body;
    
    if (!projectId || !nextStatus) {
        return res.status(400).json({ success: false, error: { code: "BAD_REQUEST", message: "Please provide all the required fields" } });
    }

    try {
        // Update the project's status
        const updateQuery = `
            UPDATE projects 
            SET status = $1, updated_at = CURRENT_TIMESTAMP 
            WHERE id = $2 
            RETURNING *;
        `;
        const result = await pool.query(updateQuery, [nextStatus, projectId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Project not found" } });
        }

        // Optional: If you have a workflow_logs table to track comments and history
        if (comment) {
            await pool.query(
                `INSERT INTO workflow_logs (project_id, user_id, status_changed_to, comment) VALUES ($1, $2, $3, $4)`,
                [projectId, req.user.id, nextStatus, comment]
            );
        }

        res.status(200).json({ 
            success: true, 
            data: { 
                message: "Transition successful", 
                project: result.rows[0] 
            } 
        });

    } catch (error) {
        console.error("Error updating transition:", error);
        res.status(500).json({ success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Failed to transition project" } });
    }
});

module.exports = router;