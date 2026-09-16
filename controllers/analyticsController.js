const Project = require('../models/Project');
const Parcel = require('../models/Parcel');
const Compensation = require('../models/Compensation');
const Family = require('../models/Family');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get Global/National Dashboard Analytics
// @route   GET /api/analytics/dashboard
const getDashboardAnalytics = asyncHandler(async (req, res) => {
    // 1. Projects KPI
    const totalProjects = await Project.countDocuments();
    
    // 2. Land KPIs
    const projects = await Project.find();
    // Sum up all required area from projects
    const landProposed = projects.reduce((sum, p) => sum + (p.requiredArea || 0), 0);
    
    // Find only acquired parcels to calculate land acquired
    const acquiredParcels = await Parcel.find({ status: 'ACQUIRED' });
    const landAcquired = acquiredParcels.reduce((sum, p) => sum + (p.areaSize || 0), 0);
    
    // Calculate percentage safely to avoid dividing by zero
    const acquisitionPercentage = landProposed > 0 
        ? parseFloat(((landAcquired / landProposed) * 100).toFixed(2)) 
        : 0;

    // 3. Compensation KPIs
    const compensations = await Compensation.find();
    const compensationAssessed = compensations.reduce((sum, c) => sum + (c.assessedAmount || 0), 0);
    const compensationDisbursed = compensations.reduce((sum, c) => sum + (c.paidAmount || 0), 0);

    // 4. R&R KPIs
    const families = await Family.find();
    const affectedFamilies = families.length;
    const rehabilitated = families.filter(f => f.rehabilitationStatus === 'Completed').length;
    
    const rnrPercentage = affectedFamilies > 0 
        ? parseFloat(((rehabilitated / affectedFamilies) * 100).toFixed(2)) 
        : 0;

    // 5. Risk/Delay Calculations
    // Find projects where target date has passed but status is not CLOSED
    const delayedProjects = await Project.countDocuments({ 
        targetDate: { $lt: new Date() }, 
        status: { $ne: 'CLOSED' } 
    });

    res.status(200).json({
        success: true,
        data: {
            kpis: {
                projects: totalProjects,
                landProposed,
                landAcquired,
                acquisitionPercentage,
                compensationAssessed,
                compensationDisbursed,
                affectedFamilies,
                rnrPercentage
            },
            risk: {
                criticalProjects: delayedProjects > 0 ? delayedProjects : 0, 
                highRiskProjects: Math.floor(delayedProjects / 2), // Demo logic
                delayedMilestones: delayedProjects
            }
        }
    });
});

// @desc    Get Analytics for a Specific Project
// @route   GET /api/analytics/projects/:projectId
const getProjectAnalytics = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }

    // Land specific to this project
    const projectParcels = await Parcel.find({ projectId });
    const acquiredProjectParcels = projectParcels.filter(p => p.status === 'ACQUIRED');
    const projectLandAcquired = acquiredProjectParcels.reduce((sum, p) => sum + (p.areaSize || 0), 0);
    const projectPercentage = project.requiredArea > 0 
        ? parseFloat(((projectLandAcquired / project.requiredArea) * 100).toFixed(2)) 
        : 0;

    // Compensation specific to this project
    const projectComp = await Compensation.find({ projectId });
    const compAssessed = projectComp.reduce((sum, c) => sum + (c.assessedAmount || 0), 0);
    const compDisbursed = projectComp.reduce((sum, c) => sum + (c.paidAmount || 0), 0);

    // Families specific to this project
    const projectFamilies = await Family.find({ projectId });
    const completedFamilies = projectFamilies.filter(f => f.rehabilitationStatus === 'Completed').length;

    res.status(200).json({
        success: true,
        data: {
            projectId,
            land: { 
                required: project.requiredArea, 
                acquired: projectLandAcquired, 
                percentage: projectPercentage 
            },
            compensation: { 
                assessed: compAssessed, 
                disbursed: compDisbursed, 
                pending: compAssessed - compDisbursed 
            },
            rnr: { 
                totalFamilies: projectFamilies.length, 
                completed: completedFamilies, 
                pending: projectFamilies.length - completedFamilies 
            }
        }
    });
});

module.exports = { getDashboardAnalytics, getProjectAnalytics };