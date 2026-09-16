const Compensation = require('../models/Compensation');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Create new compensation record
// @route   POST /api/compensation
const createCompensation = asyncHandler(async (req, res) => {
    const { projectId, parcelId, recipientName, assessedAmount } = req.body;

    const comp = await Compensation.create({ projectId, parcelId, recipientName, assessedAmount });
    res.status(201).json({ success: true, data: comp });
});

// @desc    Get compensation records by project
// @route   GET /api/compensation/project/:projectId
const getProjectCompensation = asyncHandler(async (req, res) => {
    const records = await Compensation.find({ projectId: req.params.projectId }).populate('parcelId');
    res.status(200).json({ success: true, data: records });
});

// @desc    Make a payment
// @route   POST /api/compensation/payment
const makePayment = asyncHandler(async (req, res) => {
    const { compensationId, amount, paymentReference } = req.body;

    if (amount <= 0) {
        res.status(400);
        throw new Error("Amount must be greater than 0");
    }

    const comp = await Compensation.findById(compensationId);
    if (!comp) {
        res.status(404);
        throw new Error("Compensation record not found");
    }

    const pendingAmount = comp.assessedAmount - comp.paidAmount;
    if (amount > pendingAmount) {
        res.status(400);
        throw new Error(`Payment cannot exceed pending amount of ${pendingAmount}`);
    }

    comp.paidAmount += amount;
    comp.payments.push({ amount, paymentReference });

    if (comp.paidAmount === comp.assessedAmount) {
        comp.status = 'PAID';
    } else {
        comp.status = 'PARTIALLY PAID';
    }

    await comp.save();
    res.status(200).json({ success: true, data: comp, message: "Payment recorded successfully" });
});

module.exports = { createCompensation, getProjectCompensation, makePayment };