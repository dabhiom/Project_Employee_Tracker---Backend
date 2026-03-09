const Allocation = require('../models/allocation.model');

// @desc    Get all allocations
// @route   GET /api/allocations
// @access  Private
const getAllocations = async (req, res, next) => {
    try {
        const items = await Allocation.find({});
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single allocation
// @route   GET /api/allocations/:id
// @access  Private
const getAllocation = async (req, res, next) => {
    try {
        const item = await Allocation.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Allocation not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new allocation
// @route   POST /api/allocations
// @access  Private
const createAllocation = async (req, res, next) => {
    try {
        const item = await Allocation.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update allocation
// @route   PUT /api/allocations/:id
// @access  Private
const updateAllocation = async (req, res, next) => {
    try {
        const item = await Allocation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('Allocation not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete allocation
// @route   DELETE /api/allocations/:id
// @access  Private
const deleteAllocation = async (req, res, next) => {
    try {
        const item = await Allocation.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Allocation not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getAllocations, getAllocation, createAllocation, updateAllocation, deleteAllocation };
