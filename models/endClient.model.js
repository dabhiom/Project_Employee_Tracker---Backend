const mongoose = require('mongoose');

const endClientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add an end-client name'],
            trim: true,
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        phone: {
            type: String,
        },
        address: {
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

module.exports = mongoose.model('EndClient', endClientSchema);
