const mongoose = require('mongoose');

const energyMetricsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalProduction: { type: Number, default: 0 },
  totalConsumption: { type: Number, default: 0 },
  surplus: { type: Number, default: 0 },
});

module.exports = mongoose.model('EnergyMetrics', energyMetricsSchema);
