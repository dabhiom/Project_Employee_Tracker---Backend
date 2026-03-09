const mongoose = require('mongoose');

const poSchema = new mongoose.Schema(
    {
        poNumber: {
            type: String,
            required: [true, 'Please add a PO number'],
            unique: true,
            trim: true,
        },
        clientId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Client',
            required: [true, 'Please select a client'],
        },
        projectId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Project',
            required: [true, 'Please select a project'],
        },
        poStartDate: {
            type: Date,
            required: [true, 'Please add PO start date'],
        },
        poEndDate: {
            type: Date,
            required: [true, 'Please add PO end date'],
        },
        poAmount: {
            type: Number,
            required: [true, 'Please add PO amount'],
        },
        currency: {
            type: String,
            default: 'INR',
        },
        billingType: {
            type: String,
            enum: ['Monthly', 'Milestone'],
            required: [true, 'Please select billing type'],
        },
        utilizedAmount: {
            type: Number,
            default: 0,
        },
        remainingAmount: {
            type: Number,
            default: function () {
                return this.poAmount - this.utilizedAmount;
            }
        },
        status: {
            type: Boolean,
            default: true,
        },
        remarks: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('PurchaseOrder', poSchema);
