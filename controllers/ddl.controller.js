const Client = require('../models/client.model');
const User = require('../models/user.model');
const Designation = require('../models/designation.model');

// @desc    Get clients for dropdown
// @route   GET /api/ddls/clients
// @access  Private
const getClientDdls = async (req, res, next) => {
    try {
        // Fetch only active clients, and select only _id and customerName
        const items = await Client.find({ status: true }).select('customerName _id');
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get employees for dropdown
// @route   GET /api/ddls/employees
// @access  Private
const getEmployeeDdls = async (req, res, next) => {
    try {
        // Fetch only active employees, and select only _id, fullName, firstName, and lastName
        const items = await User.find({ isActive: true }).select('firstName lastName fullName _id');
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get designations for dropdown
// @route   GET /api/ddls/designations
// @access  Private
const getDesignationDdls = async (req, res, next) => {
    try {
        // Fetch only active designations, and select only _id and designationName
        const items = await Designation.find({ status: true }).select('designationName _id');
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

module.exports = { getClientDdls, getEmployeeDdls, getDesignationDdls };
