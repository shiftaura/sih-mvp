const pool = require('../db'); 
const {protect} = require('../middleware/protect');
const {getProjects} = require('../middleware/getProjects');
const postProjects = require('../middleware/postProjects');
const router=require('express').Router();

router.get('/',protect, getProjects);
router.post("/",protect, postProjects);
router.get("/:projectId",protect, async (req,res)=>{

});

router.get("/:projectId", protect, async (req, res) => {
    try {
        const { projectId } = req.params;
        const result = await pool.query("SELECT * FROM projects WHERE id = $1", [projectId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: { code: "RESOURCE_NOT_FOUND", message: "Project not found." }});
        }
        
        // Mocking statistics as per contract requirement for now
        const projectData = result.rows[0];
        projectData.statistics = { totalParcels: 100, acquiredParcels: 74, compensationPending: 18, affectedFamilies: 40, rnrPending: 8, openObjections: 5 };
        
        res.status(200).json({ success: true, data: projectData });
    } catch (err) {
        res.status(500).json({ success: false, error: { code: "INTERNAL_SERVER_ERROR", message: err.message }});
    }
});

router.patch("/:projectId", protect, async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name, targetDate } = req.body;
        // Status updates must happen via /workflow/transition as per rule 2
        const result = await pool.query(
            "UPDATE projects SET name = COALESCE($1, name), target_date = COALESCE($2, target_date) WHERE id = $3 RETURNING *",
            [name, targetDate, projectId]
        );
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: { code: "INTERNAL_SERVER_ERROR", message: err.message }});
    }
});

module.exports = router;