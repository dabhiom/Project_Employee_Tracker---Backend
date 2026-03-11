const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {  
        openapi: '3.0.0',
        info: {
            title: 'Project Manager Tracker API',
            version: '1.0.0', 
            description: 'API documentation for Project Manager Tracker',  
        },
        servers: [ 
            {
                url: process.env.SWAGGER_SERVER_URL || 'http://localhost:5000',
                description: 'Server (set SWAGGER_SERVER_URL in production)',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ], 
    },
    apis: ['./routes/*.js', './swagger/schemas.js'], // Files containing annotations
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
