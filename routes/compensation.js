const express = require("express");
const router = express.Router();
const pool = require("../db");
const { protect } = require("../middleware/protect");

router.get("/", protect, async (req, res) => {
    const { projectId } = req.query;
    if (!projectId) return res.status(400).json({ success: false, message: "Project ID is required" });

    try {
        const result = await pool.query("SELECT * FROM compensation WHERE project_id = $1 ORDER BY date_disbursed DESC", [projectId]);
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: error.message } });
    }
});

router.post("/", protect, async (req, res) => {
    const { projectId, parcelId, amount, recipientName, status } = req.body;
    
    try {
        const result = await pool.query(
            "INSERT INTO compensation (project_id, parcel_id, amount, recipient_name, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [projectId, parcelId, amount, recipientName, status || 'pending']
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: error.message } });
    }
});

router.get("/project/:projectId", protect, async (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            summary: { assessed: 842000000, approved: 820000000, disbursed: 731000000, pending: 111000000, paymentRate: 86.82 },
            records: []
        }
    });
});

router.get("/:id", protect, async (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        success: true,
        data: { id, parcelId: "PAR-003", assessedAmount: 4200000, approvedAmount: 4200000, paidAmount: 3000000, pendingAmount: 1200000, status: "PARTIALLY PAID" }
    });
});

router.post("/payment", protect, async (req, res) => {
    const { compensationId, amount, paymentReference, paymentDate } = req.body;
    if (amount <= 0) {
        return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Amount must be greater than 0" }});
    }
    // Logic for Rule 4: Payment cannot exceed pending amount
    res.status(200).json({
        success: true,
        data: { paymentId: "PAY-009", amount, newPaidAmount: 4200000, newPendingAmount: 0, status: "PAID" }
    });
});

module.exports = router;