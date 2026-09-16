const cloudinary = require('cloudinary').v2;
const Document = require('../models/Document');
const { asyncHandler } = require('../middleware/errorMiddleware');

// Configure Cloudinary (Make sure to add these in your .env file)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Generate Cloudinary upload signature for frontend
// @route   GET /api/documents/signature
const generateSignature = asyncHandler(async (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    // You can specify a folder name here
    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder: 'nlas-documents' },
        process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({
        success: true,
        data: { timestamp, signature, apiKey: process.env.CLOUDINARY_API_KEY, cloudName: process.env.CLOUDINARY_CLOUD_NAME }
    });
});

// @desc    Save document details to DB after successful frontend upload
// @route   POST /api/documents
const saveDocumentDetails = asyncHandler(async (req, res) => {
    const { projectId, documentType, fileName, fileUrl, cloudinaryId } = req.body;

    if (!projectId || !fileUrl || !cloudinaryId) {
        res.status(400);
        throw new Error("Missing required document details");
    }

    const doc = await Document.create({
        projectId,
        uploadedBy: req.user._id,
        documentType,
        fileName,
        fileUrl,
        cloudinaryId
    });

    res.status(201).json({ success: true, data: doc });
});

// @desc    Get all documents for a project
// @route   GET /api/documents/project/:projectId
const getProjectDocuments = asyncHandler(async (req, res) => {
    const docs = await Document.find({ projectId: req.params.projectId })
        .populate('uploadedBy', 'name role')
        .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: docs });
});

module.exports = { generateSignature, saveDocumentDetails, getProjectDocuments };