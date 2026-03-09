const Designation = require('../models/designation.model');

// @desc    Get all designations
// @route   GET /api/designations
// @access  Private
const getDesignations = async (req, res, next) => {
    try {
        const items = await Designation.find({});
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single designation
// @route   GET /api/designations/:id
// @access  Private
const getDesignation = async (req, res, next) => {
    try {
        const item = await Designation.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Designation not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new designation
// @route   POST /api/designations
// @access  Private
const createDesignation = async (req, res, next) => {
    try {
        const item = await Designation.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update designation
// @route   PUT /api/designations/:id
// @access  Private
const updateDesignation = async (req, res, next) => {
    try {
        const item = await Designation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('Designation not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete designation
// @route   DELETE /api/designations/:id
// @access  Private
const deleteDesignation = async (req, res, next) => {
    try {
        const item = await Designation.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Designation not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getDesignations, getDesignation, createDesignation, updateDesignation, deleteDesignation };
