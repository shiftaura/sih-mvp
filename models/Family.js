// models/Family.js
const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    parcelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parcel', required: true },
    familyHeadName: { type: String, required: true },
    affectedArea: { type: Number, required: true },
    displacementStatus: { type: String, enum: ['Displaced', 'Partially Affected'], required: true },
    rehabilitationStatus: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    resettlementStatus: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    benefits: { type: String, default: '0/4' },
    remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Family || mongoose.model('Family', familySchema);