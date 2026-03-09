const mongoose = require('mongoose');

const poAllocationSchema = new mongoose.Schema(
    {
        poId: {
            type: mongoose.Schema.ObjectId,
            ref: 'PurchaseOrder',
            required: [true, 'Please select a PO'],
        },
        projectId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Project',
            required: [true, 'Please select a project'],
        },
        allocatedAmount: {
            type: Number,
            required: [true, 'Please specify allocated amount'],
        },
        utilizedAmount: {
            type: Number,
            default: 0,
        },
        remainingAmount: {
            type: Number,
            default: function () {
                return this.allocatedAmount - this.utilizedAmount;
            }
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('POAllocation', poAllocationSchema);
