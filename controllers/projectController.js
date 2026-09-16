// controllers/projectController.js
const Project = require('../models/Project');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get all projects with pagination and filters
// @route   GET /api/projects
const getProjects = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, search, state, district, status, type } = req.query;

    const query = {};

    if (state) query.state = state;
    if (district) query.district = district;
    if (status) query.status = status;
    if (type) query.type = type;
    
    // Text search using regex
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { projectCode: { $regex: search, $options: 'i' } }
        ];
    }

    const projects = await Project.find(query)
        .populate('createdBy', 'name email') // Join equivalent in Mongo
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const total = await Project.countDocuments(query);

    res.status(200).json({
        success: true,
        data: {
            projects,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    });
});

// @desc    Create new project
// @route   POST /api/projects
const createProject = asyncHandler(async (req, res) => {
    const { name, projectCode, type, department, state, district, requiredArea, targetDate } = req.body;

    if (!name || !type || !department || !state || !district || !requiredArea || !targetDate) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    const project = await Project.create({
        name,
        projectCode,
        type,
        department,
        state,
        district,
        requiredArea,
        targetDate,
        createdBy: req.user._id
    });

    res.status(201).json({
        success: true,
        data: project
    });
});

// @desc    Get project by ID
// @route   GET /api/projects/:projectId
const getProjectById = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.projectId).lean();

    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }

    // Mocking stats for MVP frontend compatibility
    project.statistics = { 
        totalParcels: 100, acquiredParcels: 74, compensationPending: 18, 
        affectedFamilies: 40, rnrPending: 8, openObjections: 5 
    };

    res.status(200).json({ success: true, data: project });
});

// @desc    Update project (name, targetDate)
// @route   PATCH /api/projects/:projectId
const updateProject = asyncHandler(async (req, res) => {
    const { name, targetDate } = req.body;

    const project = await Project.findByIdAndUpdate(
        req.params.projectId,
        { name, targetDate },
        { new: true, runValidators: true }
    );

    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }

    res.status(200).json({ success: true, data: project });
});

module.exports = { getProjects, createProject, getProjectById, updateProject };