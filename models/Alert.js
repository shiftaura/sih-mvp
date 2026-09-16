const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // Optional (Some alerts might be global)
    title: { type: String, required: true },
    message: { type: String, required: true },
    severity: { type: String, enum: ['INFO', 'WARNING', 'CRITICAL'], default: 'INFO' },
    status: { type: String, enum: ['UNREAD', 'READ'], default: 'UNREAD' },
    targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // If targeted to a specific officer
}, { timestamps: true });

module.exports = mongoose.models.Alert || mongoose.model('Alert', alertSchema);