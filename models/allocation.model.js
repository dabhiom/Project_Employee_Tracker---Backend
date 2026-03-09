const mongoose = require('mongoose');

const allocationSchema = new mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Please select an employee'],
        },
        projectId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Project',
            required: [true, 'Please select a project'],
        },
        roleInProject: {
            type: String,
            required: [true, 'Please specify role in project'],
        },
        resourceStartDate: {
            type: Date,
            required: [true, 'Please select resource start date'],
        },
        resourceEndDate: {
            type: Date,
            required: [true, 'Please select resource end date'],
        },
        allocationStatus: {
            type: String,
            enum: ['Active', 'Released'],
            default: 'Active',
        },
        comments: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Allocation', allocationSchema);
