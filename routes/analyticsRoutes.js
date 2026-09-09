const router = require("express").Router();
const { protect } = require("../middleware/protect");

router.get("/dashboard", protect, async (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            kpis: { projects: 124, landProposed: 84520, landAcquired: 63210, acquisitionPercentage: 74.8, compensationAssessed: 84200000000, compensationDisbursed: 73100000000, affectedFamilies: 42381, rnrPercentage: 81 },
            risk: { criticalProjects: 6, highRiskProjects: 17, delayedMilestones: 42 },
            stateWiseAcquisition: [], projectProgress: [], compensation: [], rnr: [], delayedProjects: []
        }
    });
});

router.get("/projects/:projectId", protect, async (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            projectId: req.params.projectId,
            land: { required: 250, acquired: 186, percentage: 74.4 },
            compensation: { assessed: 420000000, disbursed: 360000000, pending: 60000000 },
            rnr: { totalFamilies: 40, completed: 32, pending: 8 },
            objections: { total: 20, open: 5, resolved: 15 }
        }
    });
});
module.exports = router;