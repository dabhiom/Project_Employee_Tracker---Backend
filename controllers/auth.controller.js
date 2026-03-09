const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            res.status(400);
            throw new Error('Please provide an email and password');
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            res.status(401);
            throw new Error('Invalid credentials');
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            res.status(401);
            throw new Error('Invalid credentials');
        }

        // Create token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d',
            }
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                empId: user.employeeId,
                name: user.fullName || `${user.firstName} ${user.lastName}`,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
};
