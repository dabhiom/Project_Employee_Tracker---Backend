const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a manager name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        phone: {
            type: String,
            required: [true, 'Please add a phone number'],
        },
        departmentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Department',
            required: [true, 'Please assign a department'],
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

module.exports = mongoose.model('Manager', managerSchema);
