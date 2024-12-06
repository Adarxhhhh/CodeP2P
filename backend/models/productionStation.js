const mongoose = require('mongoose');

const productionStationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  gpsCoordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' },
  },
  createdAt: {type: Date, default: Date.now},
  capacity: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  meterNumber: {type: String, required: true},
  stationType: {type: String, enum: ['Solar Panel', 'Wind Turbine', 'Hydroelectric', 'Geothermal', 'Nuclear', 'Other'], required: true}
});

const dailyProductionSchema = new mongoose.Schema({
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductionStation', required: true },
  date: { type: Date, required: true, index: true },
  energyProduced: { type: Number, required: true },
});

dailyProductionSchema.index({ stationId: 1, date: 1 }, { unique: true });

const DailyProduction = mongoose.model('DailyProduction', dailyProductionSchema);

const ProductionStation = mongoose.model('ProductionStation', productionStationSchema);

module.exports = {
  ProductionStation,
  DailyProduction
};
