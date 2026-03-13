const Manager = require('../models/manager.model');

// @desc    Get all managers
// @route   GET /api/managers
// @access  Private
const getManagers = async (req, res, next) => {
    try {
        const items = await Manager.find({}).populate('departmentId', 'departmentName');
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single manager
// @route   GET /api/managers/:id
// @access  Private
const getManager = async (req, res, next) => {
    try {
        const item = await Manager.findById(req.params.id).populate('departmentId', 'departmentName');
        if (!item) { res.status(404); throw new Error('Manager not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new manager
// @route   POST /api/managers
// @access  Private
const createManager = async (req, res, next) => {
    try {
        const item = await Manager.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update manager
// @route   PUT /api/managers/:id
// @access  Private
const updateManager = async (req, res, next) => {
    try {
        const item = await Manager.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('Manager not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete manager
// @route   DELETE /api/managers/:id
// @access  Private
const deleteManager = async (req, res, next) => {
    try {
        const item = await Manager.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Manager not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getManagers, getManager, createManager, updateManager, deleteManager };
