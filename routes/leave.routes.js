const express = require('express');
const { getLeaves, getLeave, createLeave, updateLeave, deleteLeave } = require('../controllers/leave.controller');

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
 *   name: Leave
 *   description: Leave API
 */

/**
 * @swagger
 * /api/leaves:
 *   get:
 *     summary: Get all leaves
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Leave'
 *   post:
 *     summary: Create a leave
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Leave'
 *     responses:
 *       201:
 *         description: Leave created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Leave'
 */
router.route('/')
    .get(getLeaves)
    .post(createLeave);

/**
 * @swagger
 * /api/leaves/{id}:
 *   get:
 *     summary: Get a leave by ID
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The leave ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Leave'
 *       404:
 *         description: Leave not found
 *   put:
 *     summary: Update a leave
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The leave ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Leave'
 *     responses:
 *       200:
 *         description: Leave updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Leave'
 *       404:
 *         description: Leave not found
 *   delete:
 *     summary: Delete a leave
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The leave ID
 *     responses:
 *       200:
 *         description: Leave deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Leave not found
 */
router.route('/:id')
    .get(getLeave)
    .put(updateLeave)
    .delete(deleteLeave);

module.exports = router;
