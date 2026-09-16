const Task = require('../models/Task');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get tasks for the logged-in user (Field Officer)
// @route   GET /api/field/tasks
const getMyTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ assignedTo: req.user._id })
        .populate('projectId', 'name projectCode')
        .populate('parcelId', 'khasraNo village status')
        .sort({ dueDate: 1 });

    res.status(200).json({ success: true, data: tasks });
});

// @desc    Update task status
// @route   PATCH /api/field/tasks/:id
const updateTaskStatus = asyncHandler(async (req, res) => {
    const { status, remarks } = req.body;

    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, assignedTo: req.user._id },
        { status, remarks },
        { new: true, runValidators: true }
    );

    if (!task) {
        res.status(404);
        throw new Error("Task not found or unauthorized");
    }

    res.status(200).json({ success: true, data: task });
});

module.exports = { getMyTasks, updateTaskStatus };