# Employee Management System (EMS) Backend

A robust REST API for managing an Employee Management System built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based secure authentication & role-based route authorization.
- **Master Data Management**: Full CRUD operations for Employees, Designations, Locations, Departments, Clients, Projects, and Purchase Orders (POs).
- **Transaction Management**: Endpoints for Leave Requests, Project Resource Allocations, and PO Allocations Tracking.
- **Swagger Documentation**: Live, interactive API documentation exposed via Swagger UI.
- **Seed Script**: Built-in script to instantly deploy fully populated relational dummy data.

## Technologies Used

- **Node.js & Express.js**
- **MongoDB** (Mongoose ODM)
- **JSON Web Tokens (JWT)**
- **Bcryptjs** (password hashing)
- **Swagger UI** (`swagger-jsdoc` & `swagger-ui-express`)

## Project Structure

```text
├── config/              # Configuration files (Database connection)
├── controllers/         # API Route Handlers (Logic)
├── middleware/          # Custom auth, role, and error handling middleware
├── models/              # Mongoose DB Schemas
├── routes/              # Express API Route definitions
├── swagger/             # Swagger UI config & schema definitions
├── .env                 # Environment variables (DB URI, JWT Secret)
├── seed.js              # Database dummy data injection script
└── server.js            # Main application entry point
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB connection string (Local or MongoDB Atlas)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables. Create a `.env` file in the root with:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. (Optional) Run the seed script to populate test data into your database.
   ```bash
   node seed.js
   ```

### Running the Project

**Development Mode (Nodemon):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

## Available Roles
The system operates with 4 distinct roles, saved in the database as numbers:
* `1` - Super Admin
* `2` - Manager
* `3` - Team Lead
* `4` - Employee

When logging in utilizing the seeded data, you can authenticate via the `/api/auth/login` endpoint using:
- **Super Admin**: `admin@ems.com` / `password123`
- **Employee**: `john.doe@ems.com` / `password123`

## API Documentation
Once the server is running, the interactive Swagger UI can be found at:  
👉 **`http://localhost:5000/api-docs`**

The Swagger UI provides real-time testing capabilities and data schemas for:
- `/api/auth`
- `/api/employees`
- `/api/designations`
- `/api/locations`  
- `/api/departments`
- `/api/clients`
- `/api/projects`
- `/api/pos`
- `/api/leaves`
- `/api/allocations`
- `/api/po-allocations`
