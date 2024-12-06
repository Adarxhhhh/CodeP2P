const express = require('express');
const connectDB = require('./config/db');
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./config/swaggerConf');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

connectDB();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/station', require('./routes/stationRoutes'));
app.use('/api/user', userRoutes);

// app.use('/api/consumer', consumerRoutes);

module.exports = app;

