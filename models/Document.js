const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentType: { type: String, required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true }, // Cloudinary secure_url
    cloudinaryId: { type: String, required: true } // Cloudinary public_id
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);