const express = require('express');
const { getPOAllocations, getPOAllocation, createPOAllocation, updatePOAllocation, deletePOAllocation } = require('../controllers/poAllocation.controller');

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
 *   name: POAllocation
 *   description: POAllocation API
 */

/**
 * @swagger
 * /api/poAllocations:
 *   get:
 *     summary: Get all poAllocations
 *     tags: [POAllocation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a poAllocation
 *     tags: [POAllocation]
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
    .get(getPOAllocations)
    .post(createPOAllocation);

/**
 * @swagger
 * /api/poAllocations/{id}:
 *   get:
 *     summary: Get a poAllocation by ID
 *     tags: [POAllocation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The poAllocation ID
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update a poAllocation
 *     tags: [POAllocation]
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
 *     summary: Delete a poAllocation
 *     tags: [POAllocation]
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
    .get(getPOAllocation)
    .put(updatePOAllocation)
    .delete(deletePOAllocation);

module.exports = router;
