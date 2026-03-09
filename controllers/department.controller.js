const Department = require('../models/department.model');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
const getDepartments = async (req, res, next) => {
    try {
        const items = await Department.find({});
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single department
// @route   GET /api/departments/:id
// @access  Private
const getDepartment = async (req, res, next) => {
    try {
        const item = await Department.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Department not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new department
// @route   POST /api/departments
// @access  Private
const createDepartment = async (req, res, next) => {
    try {
        const item = await Department.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private
const updateDepartment = async (req, res, next) => {
    try {
        const item = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('Department not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private
const deleteDepartment = async (req, res, next) => {
    try {
        const item = await Department.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Department not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment };
