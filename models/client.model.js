const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: [true, 'Please add a customer name'],
            trim: true,
        },
        endClientName: {
            type: String,
            trim: true,
        },
        clientType: {
            type: String,
        },
        contactPerson: {
            type: String,
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
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Client', clientSchema);
