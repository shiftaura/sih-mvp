const mongoose = require('mongoose');

const compensationSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    parcelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parcel', required: true },
    recipientName: { type: String, required: true },
    assessedAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    status: { type: String, enum: ['PENDING', 'PARTIALLY PAID', 'PAID'], default: 'PENDING' },
    payments: [{
        amount: Number,
        paymentReference: String,
        paymentDate: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Compensation', compensationSchema);