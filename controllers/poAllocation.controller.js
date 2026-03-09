const POAllocation = require('../models/poAllocation.model');

// @desc    Get all poAllocations
// @route   GET /api/poAllocations
// @access  Private
const getPOAllocations = async (req, res, next) => {
    try {
        const items = await POAllocation.find({});
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single poAllocation
// @route   GET /api/poAllocations/:id
// @access  Private
const getPOAllocation = async (req, res, next) => {
    try {
        const item = await POAllocation.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('POAllocation not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new poAllocation
// @route   POST /api/poAllocations
// @access  Private
const createPOAllocation = async (req, res, next) => {
    try {
        const item = await POAllocation.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update poAllocation
// @route   PUT /api/poAllocations/:id
// @access  Private
const updatePOAllocation = async (req, res, next) => {
    try {
        const item = await POAllocation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('POAllocation not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete poAllocation
// @route   DELETE /api/poAllocations/:id
// @access  Private
const deletePOAllocation = async (req, res, next) => {
    try {
        const item = await POAllocation.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('POAllocation not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getPOAllocations, getPOAllocation, createPOAllocation, updatePOAllocation, deletePOAllocation };
