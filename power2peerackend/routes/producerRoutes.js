const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController');

// Add or update producer
router.post('/addProducer', producerController.addOrUpdateProducer);

// Fetch all producers
router.get('/getAllProducers', producerController.getAllProducers);

// Update available energy
router.post('/updateAvailableEnergy', producerController.updateAvailableEnergy);

module.exports = router;
