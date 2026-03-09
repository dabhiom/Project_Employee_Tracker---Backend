const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        projectName: {
            type: String,
            required: [true, 'Please add a project name'],
            unique: true,
            trim: true,
        },
        clientId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Client',
            required: [true, 'Please select a client'],
        },
        projectType: {
            type: String,
            enum: ['Fixed', 'BOT', 'Support'],
            required: [true, 'Please select a project type'],
        },
        projectStatus: {
            type: String,
            enum: ['Active', 'Hold', 'Closed'],
            default: 'Active',
        },
        projectStartDate: {
            type: Date,
        },
        projectEndDate: {
            type: Date,
        },
        projectManagerId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        teamLeadId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        projectDescription: {
            type: String,
        },
        clientAssetRequired: {
            type: Boolean,
            default: false,
        },
        projectComment: {
            type: String,
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

module.exports = mongoose.model('Project', projectSchema);
