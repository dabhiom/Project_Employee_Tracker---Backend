const express = require('express');
const { getAllocations, getAllocation, createAllocation, updateAllocation, deleteAllocation } = require('../controllers/allocation.controller');

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
 *   name: Allocation
 *   description: Allocation API
 */

/**
 * @swagger
 * /api/allocations:
 *   get:
 *     summary: Get all allocations
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a allocation
 *     tags: [Allocation]
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
    .get(getAllocations)
    .post(createAllocation);

/**
 * @swagger
 * /api/allocations/{id}:
 *   get:
 *     summary: Get a allocation by ID
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The allocation ID
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update a allocation
 *     tags: [Allocation]
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
 *     summary: Delete a allocation
 *     tags: [Allocation]
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
    .get(getAllocation)
    .put(updateAllocation)
    .delete(deleteAllocation);

module.exports = router;
