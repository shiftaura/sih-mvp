const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    parcelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parcel', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    taskType: { type: String, enum: ['COMPENSATION_VERIFICATION', 'FIELD_SURVEY', 'DOCUMENT_COLLECTION'], required: true },
    status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' },
    dueDate: { type: Date, required: true },
    remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);