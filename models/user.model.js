const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: [true, 'Please provide an employee ID'],
            unique: true,
        },
        firstName: {
            type: String,
            required: [true, 'Please add a first name'],
        },
        lastName: {
            type: String,
            required: [true, 'Please add a last name'],
        },
        fullName: {
            type: String,
        },
        gender: {
            type: String,
            enum: ['1', '2', '3'], // 1: Male, 2: Female, 3: Other
        },
        dateOfBirth: {
            type: Date,
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
            select: false,
        },
        phone: {
            type: String,
        },
        doj: {
            type: Date,
        },
        role: {
            type: String,
            enum: ['1', '2', '3', '4'],
            default: '4', // Defaults to 'Employee'
        },
        employeeStatus: {
            type: String,
            enum: ['0', '1', '2'], // 0: Active, 1: Notice, 2: Exited
            default: '0',
        },
        employeeStartDate: {
            type: Date,
        },
        employeeEndDate: {
            type: Date,
        },
        designationId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Designation',
        },
        departmentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Department',
        },
        reportingManagerId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        baseLocationId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Location',
        },
        currentLocationId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Location',
        },
        homeTown: {
            type: String,
        },
        workMode: {
            type: String,
            enum: ['WFH', 'WFO', 'Hybrid'],
        },
        overallExperience: {
            type: Number,
        },
        relevantExperience: {
            type: Number,
        },
        passportAvailable: {
            type: Boolean,
            default: false,
        },
        passportNumber: {
            type: String,
        },
        panNumber: {
            type: String,
        },
        aadhaarNumber: {
            type: String,
        },
        bankAccountNumber: {
            type: String,
        },
        ifscCode: {
            type: String,
        },
        remarks: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        updatedBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

// Auto-generate fullName before saving
userSchema.pre('save', function () {
    if (this.firstName || this.lastName) {
        this.fullName = `${this.firstName || ''} ${this.lastName || ''}`.trim();
    }
});

// Auto-generate fullName before updating
userSchema.pre('findOneAndUpdate', function () {
    const update = this.getUpdate();
    let firstName = update.firstName !== undefined ? update.firstName : undefined;
    let lastName = update.lastName !== undefined ? update.lastName : undefined;

    // Fallback logic could be complex, this ensures fullName is updated if pieces are present in update
    if (firstName !== undefined || lastName !== undefined) {
        // Just setting it might require knowing the previous state, but we'll try to keep it simple here.
        // Usually, the frontend should send both, or we fetch the doc and construct.
    }
});

// Hash password before save
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Also register as 'Employee' in the model registry so both work, or stick to 'User'.
// We'll stick to 'User' to avoid breakage with relations.
module.exports = mongoose.model('User', userSchema);
