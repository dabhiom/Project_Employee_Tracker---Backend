/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           type: string
 *           description: The auto-generated id of the employee
 *         employeeId:
 *           type: string
 *           description: The unique auto-generated employee ID
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
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
 *               
 *     Leave:
 *       type: object
 *       required:
 *         - employeeId
 *         - leaveType
 *         - fromDate
 *         - toDate
 *         - totalDays
 *         - reason
 *       properties:
 *         _id:
 *           type: string
 *         employeeId:
 *           type: string
 *         leaveType:
 *           type: string
 *           enum: ['CL', 'SL', 'PL', 'LWP']
 *         fromDate:
 *           type: string
 *           format: date
 *         toDate:
 *           type: string
 *           format: date
 *         totalDays:
 *           type: number
 *         reason:
 *           type: string
 *         appliedDate:
 *           type: string
 *           format: date-time
 *         approvedBy:
 *           type: string
 *         approvalStatus:
 *           type: string
 *           enum: ['Pending', 'Approved', 'Rejected']
 *         comments:
 *           type: string
 *           
 *     Location:
 *       type: object
 *       required:
 *         - locationName
 *         - city
 *         - state
 *       properties:
 *         _id:
 *           type: string
 *         locationName:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         status:
 *           type: boolean
 *           
 *     PurchaseOrder:
 *       type: object
 *       required:
 *         - poNumber
 *         - clientId
 *         - projectId
 *         - poStartDate
 *         - poEndDate
 *         - poAmount
 *         - billingType
 *       properties:
 *         _id:
 *           type: string
 *         poNumber:
 *           type: string
 *         clientId:
 *           type: string
 *         projectId:
 *           type: string
 *         poStartDate:
 *           type: string
 *           format: date
 *         poEndDate:
 *           type: string
 *           format: date
 *         poAmount:
 *           type: number
 *         currency:
 *           type: string
 *         billingType:
 *           type: string
 *           enum: ['Monthly', 'Milestone']
 *         utilizedAmount:
 *           type: number
 *         remainingAmount:
 *           type: number
 *         status:
 *           type: boolean
 *         remarks:
 *           type: string
 *           
 *     POAllocation:
 *       type: object
 *       required:
 *         - poId
 *         - projectId
 *         - allocatedAmount
 *       properties:
 *         _id:
 *           type: string
 *         poId:
 *           type: string
 *         projectId:
 *           type: string
 *         allocatedAmount:
 *           type: number
 *         utilizedAmount:
 *           type: number
 *         remainingAmount:
 *           type: number
 *         status:
 *           type: boolean
 *           
 *     Manager:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - departmentId
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         departmentId:
 *           type: string
 *         status:
 *           type: boolean
 *           
 *     EndClient:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         status:
 *           type: boolean
 *           
 *     Project:
 *       type: object
 *       required:
 *         - projectName
 *         - clientId
 *         - projectType
 *       properties:
 *         _id:
 *           type: string
 *         projectName:
 *           type: string
 *         clientId:
 *           type: string
 *         projectType:
 *           type: string
 *           enum: ['Fixed', 'BOT', 'Support']
 *         projectStatus:
 *           type: string
 *           enum: ['Active', 'Hold', 'Closed']
 *         projectStartDate:
 *           type: string
 *           format: date
 *         projectEndDate:
 *           type: string
 *           format: date
 *         projectManagerId:
 *           type: string
 *         teamLeadId:
 *           type: string
 *         projectDescription:
 *           type: string
 *         clientAssetRequired:
 *           type: boolean
 *         projectComment:
 *           type: string
 *         status:
 *           type: boolean
 */
