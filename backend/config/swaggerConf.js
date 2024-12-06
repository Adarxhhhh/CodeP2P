const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Power2peer',
      version: '1.0.0',
      description: 'API documentation for power2peer',
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
