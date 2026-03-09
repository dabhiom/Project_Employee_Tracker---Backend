/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - empId 
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the employee
 *         empId:
 *           type: string
 *           description: The unique employee ID
 *         name:
 *           type: string
 *           description: The employee name
 *         email:
 *           type: string
 *           description: The employee email
 *         role:
 *           type: string
 *           enum: ['1', '2', '3', '4']
 *           description: The employee role (1 - Super Admin, 2 - Manager, 3 - Team Lead, 4 - Employee)
 *         designation:
 *           type: string
 *         department:
 *           type: string
 *         employeeStatus:
 *           type: string
 *         employeeStartDate:
 *           type: string
 *           format: date
 *         workMode:
 *           type: string
 *           enum: [WFH, WFO, Hybrid]
 *     
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *           
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         token:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             empId:
 *               type: string
 *             name:
 *               type: string
 *             role:
 *               type: string
 */
