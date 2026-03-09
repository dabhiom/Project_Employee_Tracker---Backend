const User = require('../models/user.model');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private/Admin
const getEmployees = async (req, res, next) => {
    try {
        const employees = await User.find({}).select('-password');
        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Private/Admin
const getEmployee = async (req, res, next) => {
    try {
        const employee = await User.findById(req.params.id).select('-password');

        if (!employee) {
            res.status(404);
            throw new Error(`Employee not found with id of ${req.params.id}`);
        }

        res.status(200).json({
            success: true,
            data: employee,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new employee
// @route   POST /api/employees
// @access  Private/Admin
const createEmployee = async (req, res, next) => {
    try {
        const employee = await User.create(req.body);

        res.status(201).json({
            success: true,
            data: employee,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private/Admin
const updateEmployee = async (req, res, next) => {
    try {
        let employee = await User.findById(req.params.id);

        if (!employee) {
            res.status(404);
            throw new Error(`Employee not found with id of ${req.params.id}`);
        }

        // Don't update password through this route
        if (req.body.password) {
            delete req.body.password;
        }

        employee = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).select('-password');

        res.status(200).json({
            success: true,
            data: employee,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
const deleteEmployee = async (req, res, next) => {
    try {
        const employee = await User.findById(req.params.id);

        if (!employee) {
            res.status(404);
            throw new Error(`Employee not found with id of ${req.params.id}`);
        }

        await employee.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
