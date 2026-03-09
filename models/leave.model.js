const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Please select an employee'],
        },
        leaveType: {
            type: String,
            enum: ['CL', 'SL', 'PL', 'LWP'],
            required: [true, 'Please select leave type'],
        },
        fromDate: {
            type: Date,
            required: [true, 'Please select from date'],
        },
        toDate: {
            type: Date,
            required: [true, 'Please select to date'],
        },
        totalDays: {
            type: Number,
            required: [true, 'Please specify total days'],
        },
        reason: {
            type: String,
            required: [true, 'Please provide a reason'],
        },
        appliedDate: {
            type: Date,
            default: Date.now,
        },
        approvedBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        approvalStatus: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending',
        },
        comments: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Optional: calculate totalDays automatically before validating
leaveSchema.pre('validate', function () {
    if (this.fromDate && this.toDate && !this.totalDays) {
        const diffTime = Math.abs(this.toDate - this.fromDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive
        this.totalDays = diffDays;
    }
});

module.exports = mongoose.model('Leave', leaveSchema);
