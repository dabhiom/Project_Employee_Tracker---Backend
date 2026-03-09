const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
    {
        departmentName: {
            type: String,
            required: [true, 'Please add a department name'],
            unique: true,
            trim: true,
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

module.exports = mongoose.model('Department', departmentSchema);
