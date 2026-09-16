const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    projectCode: { type: String, unique: true },
    type: { type: String, required: true },
    department: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    requiredArea: { type: Number, required: true },
    targetDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['DRAFT', 'SUBMITTED', 'UNDER SCRUTINY', 'APPROVED', 'NOTIFICATION', 'AWARD', 'COMPENSATION', 'POSSESSION', 'R&R', 'CLOSED'],
        default: 'DRAFT' 
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);