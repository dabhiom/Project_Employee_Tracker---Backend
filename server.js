const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
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
const managerRoutes = require('./routes/manager.routes');
const endClientRoutes = require('./routes/endClient.routes');
// Swagger
const swaggerDocs = require('./swagger/swagger');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Trust proxy when behind a proxy/load balancer (e.g., Render, Heroku)
if (process.env.TRUST_PROXY === '1') {
    app.set('trust proxy', 1);
}

// Middleware
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
// CORS preflight is handled by the cors middleware above

// Security and performance middleware
if (process.env.NODE_ENV === 'production') {
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'"],
                "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                "style-src": ["'self'", "'unsafe-inline'"],
                "img-src": ["'self'", "data:", "https:"],
                "connect-src": ["'self'", "https:", "http:"],
            },
        },
    }));
    app.use(compression());
}
// Basic request logging in non-production
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Basic rate limiting for API endpoints
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100, // limit each IP
});
app.use('/api/', apiLimiter);

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
app.use('/api/managers', managerRoutes);
app.use('/api/end-clients', endClientRoutes);

// Error Handler
app.use(errorHandler);

// Swagger Documentation (always enabled for now)
swaggerDocs(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});