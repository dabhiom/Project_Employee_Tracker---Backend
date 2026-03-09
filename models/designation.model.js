const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema(
    {
        designationName: {
            type: String,
            required: [true, 'Please add a designation name'],
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

module.exports = mongoose.model('Designation', designationSchema);
