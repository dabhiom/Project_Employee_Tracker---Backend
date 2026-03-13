const express = require('express');
const { getEndClients, getEndClient, createEndClient, updateEndClient, deleteEndClient } = require('../controllers/endClient.controller');

const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

const router = express.Router();

router.use(verifyToken);
// router.use(authorizeRoles('Admin', 'Manager'));

/**
 * @swagger
 * tags:
 *   name: EndClient
 *   description: EndClient API
 */

/**
 * @swagger
 * /api/end-clients:
 *   get:
 *     summary: Get all end-clients
 *     tags: [EndClient]
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
 *                     $ref: '#/components/schemas/EndClient'
 *   post:
 *     summary: Create an end-client
 *     tags: [EndClient]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EndClient'
 *     responses:
 *       201:
 *         description: EndClient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/EndClient'
 */
router.route('/')
    .get(getEndClients)
    .post(createEndClient);

/**
 * @swagger
 * /api/end-clients/{id}:
 *   get:
 *     summary: Get an end-client by ID
 *     tags: [EndClient]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The end-client ID
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
 *                   $ref: '#/components/schemas/EndClient'
 *       404:
 *         description: EndClient not found
 *   put:
 *     summary: Update an end-client
 *     tags: [EndClient]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The end-client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EndClient'
 *     responses:
 *       200:
 *         description: EndClient updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/EndClient'
 *       404:
 *         description: EndClient not found
 *   delete:
 *     summary: Delete an end-client
 *     tags: [EndClient]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The end-client ID
 *     responses:
 *       200:
 *         description: EndClient deleted
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
 *         description: EndClient not found
 */
router.route('/:id')
    .get(getEndClient)
    .put(updateEndClient)
    .delete(deleteEndClient);

module.exports = router;
