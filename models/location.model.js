const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {
        locationName: {
            type: String,
            required: [true, 'Please add a location name'],
            unique: true,
            trim: true,
        },
        city: {
            type: String,
            required: [true, 'Please add a city'],
        },
        state: {
            type: String,
            required: [true, 'Please add a state'],
        },
        country: {
            type: String,
            required: [true, 'Please add a country'],
            default: 'India',
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

module.exports = mongoose.model('Location', locationSchema);
