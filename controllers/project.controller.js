const Project = require('../models/project.model');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res, next) => {
    try {
        const items = await Project.find({})
            .populate('clientId', 'customerName')
            .populate('projectManagerId', 'name')
            .populate('teamLeadId', 'name');
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProject = async (req, res, next) => {
    try {
        const item = await Project.findById(req.params.id)
            .populate('clientId', 'customerName')
            .populate('projectManagerId', 'name')
            .populate('teamLeadId', 'name');
        if (!item) { res.status(404); throw new Error('Project not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
    try {
        const item = await Project.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
    try {
        const item = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('Project not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
    try {
        const item = await Project.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Project not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };
