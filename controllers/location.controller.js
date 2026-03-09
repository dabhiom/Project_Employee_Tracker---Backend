const Location = require('../models/location.model');

// @desc    Get all locations
// @route   GET /api/locations
// @access  Private
const getLocations = async (req, res, next) => {
    try {
        const items = await Location.find({});
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single location
// @route   GET /api/locations/:id
// @access  Private
const getLocation = async (req, res, next) => {
    try {
        const item = await Location.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Location not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new location
// @route   POST /api/locations
// @access  Private
const createLocation = async (req, res, next) => {
    try {
        const item = await Location.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update location
// @route   PUT /api/locations/:id
// @access  Private
const updateLocation = async (req, res, next) => {
    try {
        const item = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('Location not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete location
// @route   DELETE /api/locations/:id
// @access  Private
const deleteLocation = async (req, res, next) => {
    try {
        const item = await Location.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('Location not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getLocations, getLocation, createLocation, updateLocation, deleteLocation };
