const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error.middleware');
// Routes
const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const designationRoutes = require('./routes/designation.routes');
const locationRoutes = require('./routes/location.routes');
const departmentRoutes = require('./routes/department.routes');
const clientRoutes = require('./routes/client.routes');
const projectRoutes = require('./routes/project.routes');
const poRoutes = require('./routes/po.routes');
const leaveRoutes = require('./routes/leave.routes');
const allocationRoutes = require('./routes/allocation.routes');
const poAllocationRoutes = require('./routes/poAllocation.routes');
// Swagger
const swaggerDocs = require('./swagger/swagger');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
// CORS preflight is handled by the cors middleware above

app.use(express.json());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/pos', poRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/allocations', allocationRoutes);
app.use('/api/po-allocations', poAllocationRoutes);

// Error Handler
app.use(errorHandler);

// Swagger Documentation
swaggerDocs(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});