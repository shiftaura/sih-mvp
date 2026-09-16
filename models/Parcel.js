// models/Parcel.js
const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    ownerName: { type: String, required: true },
    contactInfo: { type: String },
    areaSize: { type: Number, required: true },
    // New fields required by React Dev 2
    khasraNo: { type: String, required: true },
    village: { type: String, required: true },
    district: { type: String, required: true },
    status: {
        type: String,
        enum: ['PROPOSED', 'NOTIFIED', 'PENDING', 'DISPUTED', 'AWARDED', 'COMPENSATION_PENDING', 'COMPENSATION_PAID', 'POSSESSION', 'ACQUIRED'],
        default: 'PENDING'
    },
    location: { 
        type: { type: String, enum: ['Polygon'], required: true },
        coordinates: { type: [[[Number]]], required: true }
    }
}, { timestamps: true });

parcelSchema.index({ location: '2dsphere' });

module.exports = mongoose.models.Parcel || mongoose.model('Parcel', parcelSchema);