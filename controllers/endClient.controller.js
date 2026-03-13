const EndClient = require('../models/endClient.model');

// @desc    Get all end-clients
// @route   GET /api/end-clients
// @access  Private
const getEndClients = async (req, res, next) => {
    try {
        const items = await EndClient.find({});
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single end-client
// @route   GET /api/end-clients/:id
// @access  Private
const getEndClient = async (req, res, next) => {
    try {
        const item = await EndClient.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('EndClient not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new end-client
// @route   POST /api/end-clients
// @access  Private
const createEndClient = async (req, res, next) => {
    try {
        const item = await EndClient.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update end-client
// @route   PUT /api/end-clients/:id
// @access  Private
const updateEndClient = async (req, res, next) => {
    try {
        const item = await EndClient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('EndClient not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete end-client
// @route   DELETE /api/end-clients/:id
// @access  Private
const deleteEndClient = async (req, res, next) => {
    try {
        const item = await EndClient.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('EndClient not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getEndClients, getEndClient, createEndClient, updateEndClient, deleteEndClient };
