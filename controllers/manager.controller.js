const Manager = require('../models/manager.model');
const User = require('../models/user.model');
const Project = require('../models/project.model');

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

        // Check if manager is associated with any users or projects
        const isAssociatedWithUsers = await User.exists({ reportingManagerId: req.params.id });
        const isAssociatedWithProjects = await Project.exists({ 
            $or: [
                { projectManagerId: req.params.id },
                { teamLeadId: req.params.id }
            ]
        });
        
        if (isAssociatedWithUsers || isAssociatedWithProjects) {
            res.status(400);
            throw new Error('Cannot delete this manager because they are associated with one or more employees or projects.');
        }

        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getManagers, getManager, createManager, updateManager, deleteManager };
