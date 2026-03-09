const fs = require('fs');
const path = require('path');

const models = [
    { name: 'Designation', file: 'designation' },
    { name: 'Location', file: 'location' },
    { name: 'Department', file: 'department' },
    { name: 'Client', file: 'client' },
    { name: 'Project', file: 'project' },
    { name: 'PurchaseOrder', file: 'po' },
    { name: 'Leave', file: 'leave' },
    { name: 'Allocation', file: 'allocation' },
    { name: 'POAllocation', file: 'poAllocation' }
];

const controllersDir = path.join(__dirname, 'controllers');
const routesDir = path.join(__dirname, 'routes');

models.forEach(model => {
    // Generate Controller
    const controllerCode = `const ${model.name} = require('../models/${model.file}.model');

// @desc    Get all ${model.file}s
// @route   GET /api/${model.file}s
// @access  Private
const get${model.name}s = async (req, res, next) => {
    try {
        const items = await ${model.name}.find({});
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single ${model.file}
// @route   GET /api/${model.file}s/:id
// @access  Private
const get${model.name} = async (req, res, next) => {
    try {
        const item = await ${model.name}.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('${model.name} not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new ${model.file}
// @route   POST /api/${model.file}s
// @access  Private
const create${model.name} = async (req, res, next) => {
    try {
        const item = await ${model.name}.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update ${model.file}
// @route   PUT /api/${model.file}s/:id
// @access  Private
const update${model.name} = async (req, res, next) => {
    try {
        const item = await ${model.name}.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('${model.name} not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete ${model.file}
// @route   DELETE /api/${model.file}s/:id
// @access  Private
const delete${model.name} = async (req, res, next) => {
    try {
        const item = await ${model.name}.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('${model.name} not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { get${model.name}s, get${model.name}, create${model.name}, update${model.name}, delete${model.name} };
`;

    fs.writeFileSync(path.join(controllersDir, `${model.file}.controller.js`), controllerCode);

    // Generate Route
    const routeCode = `const express = require('express');
const { get${model.name}s, get${model.name}, create${model.name}, update${model.name}, delete${model.name} } = require('../controllers/${model.file}.controller');

const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);
// Assuming basic access control for now
// router.use(authorizeRoles('Admin', 'Manager'));

/**
 * @swagger
 * tags:
 *   name: ${model.name}
 *   description: ${model.name} API
 */

/**
 * @swagger
 * /api/${model.file}s:
 *   get:
 *     summary: Get all ${model.file}s
 *     tags: [${model.name}]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a ${model.file}
 *     tags: [${model.name}]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 */
router.route('/')
    .get(get${model.name}s)
    .post(create${model.name});

/**
 * @swagger
 * /api/${model.file}s/{id}:
 *   get:
 *     summary: Get a ${model.file} by ID
 *     tags: [${model.name}]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ${model.file} ID
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update a ${model.file}
 *     tags: [${model.name}]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete a ${model.file}
 *     tags: [${model.name}]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.route('/:id')
    .get(get${model.name})
    .put(update${model.name})
    .delete(delete${model.name});

module.exports = router;
`;

    fs.writeFileSync(path.join(routesDir, `${model.file}.routes.js`), routeCode);
});
console.log('Controllers and Routes generated successfully!');
