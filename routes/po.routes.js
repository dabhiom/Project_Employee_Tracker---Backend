const express = require('express');
const { getPurchaseOrders, getPurchaseOrder, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = require('../controllers/po.controller');

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
 *   name: PurchaseOrder
 *   description: PurchaseOrder API
 */

/**
 * @swagger
 * /api/pos:
 *   get:
 *     summary: Get all pos
 *     tags: [PurchaseOrder]
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
 *                     $ref: '#/components/schemas/PurchaseOrder'
 *   post:
 *     summary: Create a po
 *     tags: [PurchaseOrder]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseOrder'
 *     responses:
 *       201:
 *         description: PO created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/PurchaseOrder'
 */
router.route('/')
    .get(getPurchaseOrders)
    .post(createPurchaseOrder);

/**
 * @swagger
 * /api/pos/{id}:
 *   get:
 *     summary: Get a po by ID
 *     tags: [PurchaseOrder]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The po ID
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
 *                   $ref: '#/components/schemas/PurchaseOrder'
 *       404:
 *         description: PO not found
 *   put:
 *     summary: Update a po
 *     tags: [PurchaseOrder]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The po ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseOrder'
 *     responses:
 *       200:
 *         description: PO updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/PurchaseOrder'
 *       404:
 *         description: PO not found
 *   delete:
 *     summary: Delete a po
 *     tags: [PurchaseOrder]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The po ID
 *     responses:
 *       200:
 *         description: PO deleted
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
 *         description: PO not found
 */
router.route('/:id')
    .get(getPurchaseOrder)
    .put(updatePurchaseOrder)
    .delete(deletePurchaseOrder);

module.exports = router;
