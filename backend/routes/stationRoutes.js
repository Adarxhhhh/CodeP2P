const express = require('express');
const { addProductionStation, getNearbyStations, getProductionStations, addDailyProduction } = require('../controllers/stationController');
// const { updateEnergyMetrics } = require('../controllers/energyMetricsController');

const router = express.Router();

router.post('/add', addProductionStation);
router.get('/nearby', getNearbyStations);
router.get('/list/:userId', getProductionStations);
router.post('/daily_update', addDailyProduction);

module.exports = router;
