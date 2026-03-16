const express = require('express');
const { getClientDdls, getEmployeeDdls, getDesignationDdls } = require('../controllers/ddl.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(verifyToken); // Ensure all DDL routes require authentication

/**
 * @swagger
 * tags:
 *   name: DDLs
 *   description: Drop Down List APIs returning only minimal necessary data for frontend selects.
 */

/**
 * @swagger
 * /api/ddls/clients:
 *   get:
 *     summary: Get clients dropdown list (id and name only)
 *     tags: [DDLs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route('/clients').get(getClientDdls);

/**
 * @swagger
 * /api/ddls/employees:
 *   get:
 *     summary: Get employees dropdown list (id and name only)
 *     tags: [DDLs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route('/employees').get(getEmployeeDdls);

/**
 * @swagger
 * /api/ddls/designations:
 *   get:
 *     summary: Get designations dropdown list (id and name only)
 *     tags: [DDLs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route('/designations').get(getDesignationDdls);

module.exports = router;
