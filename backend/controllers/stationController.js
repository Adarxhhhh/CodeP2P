const { ProductionStation, DailyProduction } = require('../models/productionStation');
const User = require('../models/user');
const EnergyMetrics = require('../models/energyMetrics');

exports.addProductionStation = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user || user.role === 'Consumer') {
      return res.status(400).json({ error: 'User is not a valid producer' });
    }

    const existingStation = await ProductionStation.findOne({ meterNumber: req.body.meterNumber });
    if (existingStation) {
      return res.status(400).json({ error: 'Meter number must be unique' });
    }

    const newStation = new ProductionStation(req.body);
    await newStation.save();

    res.status(201).json({ message: 'Production station added successfully', station: newStation });
  } catch (error) {
    console.error('Error adding production station:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getProductionStations = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user || user.role === 'Consumer') {
      return res.status(400).json({ error: 'User is not a valid producer'});
    }

    const stations = await ProductionStation.find({ userId: userId});
    res.status(200).json({stations});
    
  } catch(error) {
    console.error('Error fetching productions stations', error);
    res.status(500).json({ error: 'Internal server error'});
  }
};


exports.getNearbyStations = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;

    const parsedRadius = parseFloat(radius); 
    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);

    if (isNaN(parsedRadius) || isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
      return res.status(400).json({ error: 'Invalid latitude, longitude, or radius' });
    }

    const stations = await ProductionStation.find({
      gpsCoordinates: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parsedLatitude, parsedLongitude] },
          $maxDistance: parsedRadius,
        },
      },
    });

    res.status(200).json({ stations });
  } catch (error) {
    console.error('Error fetching nearby production stations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateEnergyMetrics = async (req, res) => {
  try {
    const { userId, production, consumption } = req.body;

    const metrics = await EnergyMetrics.findOne({ userId });
    if (!metrics) {
      return res.status(404).json({ error: 'Metrics not found for user' });
    }

    metrics.totalProduction += production;
    metrics.totalConsumption += consumption;
    metrics.surplus = metrics.totalProduction - metrics.totalConsumption;

    await metrics.save();

    res.status(200).json({ message: 'Energy metrics updated', metrics });
  } catch (error) {
    console.error('Error updating energy metrics:', error);
    res.status(500).json({ error: 'Error updating energy metrics' });
  }
};


exports.addDailyProduction = async (req, res) => {
  try {
    const { stationId, date, energyProduced } = req.body;

    const station = await ProductionStation.findById(stationId);
    if (!station) {
      return res.status(404).json({ error: 'Production station not found' });
    }

    let prodDate = new Date(date);
    // prodDate.setHours(0, 0, 0, 0);

    const dailyProduction = await DailyProduction.findOneAndUpdate(
      { stationId, date: prodDate},
      { stationId, date: prodDate, energyProduced},
      { upsert: true, new: true}
    );

    const metrics = await EnergyMetrics.findOne({ userId: station.producerId });
    if (metrics) {
      metrics.totalProduction += energyProduced;
      metrics.surplus = metrics.totalProduction - metrics.totalConsumption;
      await metrics.save();
    }

    res.status(201).json({ message: 'Daily production data added', dailyProduction });
  } catch (error) {
    console.error('Error adding daily production data:', error);
    res.status(500).json({ error: 'Error adding daily production data' });
  }
};
