const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/user.model');
const Designation = require('./models/designation.model');
const Location = require('./models/location.model');
const Department = require('./models/department.model');
const Client = require('./models/client.model');
const Project = require('./models/project.model');
const PurchaseOrder = require('./models/po.model');
const Leave = require('./models/leave.model');
const Allocation = require('./models/allocation.model');
const POAllocation = require('./models/poAllocation.model');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
    try {
        console.log('Clearing old data...');
        await User.collection.drop().catch(err => console.log('Users collection might not exist yet.'));
        await Designation.deleteMany();
        await Location.deleteMany();
        await Department.deleteMany();
        await Client.deleteMany();
        await Project.deleteMany();
        await PurchaseOrder.deleteMany();
        await Leave.deleteMany();
        await Allocation.deleteMany();
        await POAllocation.deleteMany();

        console.log('Seeding Master Data...');
        const designations = await Designation.insertMany([
            { designationName: 'Software Engineer' },
            { designationName: 'Project Manager' }
        ]);

        const locations = await Location.insertMany([
            { locationName: 'HQ Location', city: 'Mumbai', state: 'MH', country: 'India' }
        ]);

        const departments = await Department.insertMany([
            { departmentName: 'Engineering' },
            { departmentName: 'Management' }
        ]);

        const clients = await Client.insertMany([
            { customerName: 'Acme Corp', clientType: 'Enterprise', email: 'contact@acme.com', phone: '1234567890' }
        ]);

        console.log('Seeding Employees...');

        // Ensure passwords are created securely - relying on pre-save hook we can just create them one by one
        // Wait, insertMany bypasses pre-save hooks in mongoose unless specified or handled.
        // It's better to use User.create()

        const superAdmin = await User.create({
            employeeId: 'EMP001',
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@ems.com',
            password: 'password123',
            role: '1',
            designationId: designations[1]._id,
            departmentId: departments[1]._id,
            baseLocationId: locations[0]._id,
            currentLocationId: locations[0]._id,
            gender: '1',
            dateOfBirth: new Date('1985-01-01'),
            doj: new Date('2020-01-01'),
            employeeStatus: '0',
            workMode: 'WFO',
        });

        const emp1 = await User.create({
            employeeId: 'EMP002',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@ems.com',
            password: 'password123',
            role: '4',
            reportingManagerId: superAdmin._id,
            designationId: designations[0]._id,
            departmentId: departments[0]._id,
            baseLocationId: locations[0]._id,
            currentLocationId: locations[0]._id,
            gender: '1',
            dateOfBirth: new Date('1995-05-15'),
            doj: new Date('2022-06-01'),
            employeeStatus: '0',
            workMode: 'Hybrid',
            overallExperience: 4,
            relevantExperience: 3,
        });

        const emp2 = await User.create({
            employeeId: 'EMP003',
            firstName: 'Om',
            lastName: 'Dabhi',
            email: 'om.dabhi@tecnoprism.com',
            password: 'password123',
            role: '4',
            reportingManagerId: superAdmin._id,
            designationId: designations[0]._id,
            departmentId: departments[0]._id,
            baseLocationId: locations[0]._id,
            currentLocationId: locations[0]._id,
            gender: '1',
            dateOfBirth: new Date('2003-04-03'),
            doj: new Date('2026-01-08'),
            employeeStatus: '0',
            workMode: 'Hybrid',
            overallExperience: 2,
            relevantExperience: 0,
        });

        console.log('Seeding Projects & POs...');
        const projects = await Project.insertMany([
            {
                projectName: 'Acme ERP System',
                clientId: clients[0]._id,
                projectType: 'Fixed',
                projectStatus: 'Active',
                projectManagerId: superAdmin._id,
                projectStartDate: new Date('2023-01-01'),
                projectEndDate: new Date('2024-12-31')
            }
        ]);

        const pos = await PurchaseOrder.insertMany([
            {
                poNumber: 'PO-2023-001',
                clientId: clients[0]._id,
                projectId: projects[0]._id,
                poStartDate: new Date('2023-01-01'),
                poEndDate: new Date('2023-12-31'),
                poAmount: 50000,
                billingType: 'Milestone'
            }
        ]);

        console.log('Seeding Transactions...');
        await Leave.create({
            employeeId: emp1._id,
            leaveType: 'PL',
            fromDate: new Date('2023-10-10'),
            toDate: new Date('2023-10-12'),
            reason: 'Vacation',
            approvedBy: superAdmin._id,
            approvalStatus: 'Approved'
        });

        await Allocation.create({
            employeeId: emp1._id,
            projectId: projects[0]._id,
            roleInProject: 'Developer',
            resourceStartDate: new Date('2023-01-15'),
            resourceEndDate: new Date('2023-12-31'),
            allocationStatus: 'Active'
        });

        await POAllocation.create({
            poId: pos[0]._id,
            projectId: projects[0]._id,
            allocatedAmount: 10000,
            utilizedAmount: 2000
        });

        console.log('Data Imported successfully! 🟢');
        process.exit();
    } catch (error) {
        console.error('Error with data import: ', error);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        console.log('Destroying Data...');
        await User.collection.drop().catch(err => console.log('Users collection might not exist yet.'));
        await Designation.deleteMany();
        await Location.deleteMany();
        await Department.deleteMany();
        await Client.deleteMany();
        await Project.deleteMany();
        await PurchaseOrder.deleteMany();
        await Leave.deleteMany();
        await Allocation.deleteMany();
        await POAllocation.deleteMany();

        console.log('Data Destroyed successfully! 🔴');
        process.exit();
    } catch (error) {
        console.error('Error with data destruction: ', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
