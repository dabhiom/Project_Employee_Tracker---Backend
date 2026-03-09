const Client = require('../models/client.model');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
const getClients = async (req, res, next) => {
    try {
        const items = await Client.find({});
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single client
// @route   GET /api/clients/:id
// @access  Private
const getClient = async (req, res, next) => {
    try {
        const item = await Client.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Client not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new client
// @route   POST /api/clients
// @access  Private
const createClient = async (req, res, next) => {
    try {
        const item = await Client.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private
const updateClient = async (req, res, next) => {
    try {
        const item = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('Client not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private
const deleteClient = async (req, res, next) => {
    try {
        const item = await Client.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Client not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getClients, getClient, createClient, updateClient, deleteClient };
