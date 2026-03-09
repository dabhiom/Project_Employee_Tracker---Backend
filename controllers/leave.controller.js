const Leave = require('../models/leave.model');

// @desc    Get all leaves
// @route   GET /api/leaves
// @access  Private
const getLeaves = async (req, res, next) => {
    try {
        const items = await Leave.find({});
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single leave
// @route   GET /api/leaves/:id
// @access  Private
const getLeave = async (req, res, next) => {
    try {
        const item = await Leave.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Leave not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new leave
// @route   POST /api/leaves
// @access  Private
const createLeave = async (req, res, next) => {
    try {
        const item = await Leave.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update leave
// @route   PUT /api/leaves/:id
// @access  Private
const updateLeave = async (req, res, next) => {
    try {
        const item = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('Leave not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete leave
// @route   DELETE /api/leaves/:id
// @access  Private
const deleteLeave = async (req, res, next) => {
    try {
        const item = await Leave.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Leave not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getLeaves, getLeave, createLeave, updateLeave, deleteLeave };
