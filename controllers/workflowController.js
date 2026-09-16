const Project = require('../models/Project');
const AuditLog = require('../models/AuditLog');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Change project status & create audit log
// @route   POST /api/workflow/transition
const transitionProject = asyncHandler(async (req, res) => {
    const { projectId, nextStatus, comments } = req.body;

    if (!projectId || !nextStatus) {
        res.status(400);
        throw new Error("Project ID and nextStatus are required");
    }

    const project = await Project.findById(projectId);
    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }

    const oldStatus = project.status;
    project.status = nextStatus;
    await project.save();

    // Create Audit Log
    const auditLog = await AuditLog.create({
        projectId: project._id,
        userId: req.user._id,
        action: 'STATUS_CHANGE',
        oldValue: oldStatus,
        newValue: nextStatus,
        comments: comments || ''
    });

    res.status(200).json({
        success: true,
        data: { project, auditLog },
        message: "Project status updated successfully"
    });
});

// @desc    Get project workflow history
// @route   GET /api/workflow/:projectId
const getWorkflowHistory = asyncHandler(async (req, res) => {
    const history = await AuditLog.find({ projectId: req.params.projectId })
        .populate('userId', 'name role')
        .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: history });
});

module.exports = { transitionProject, getWorkflowHistory };