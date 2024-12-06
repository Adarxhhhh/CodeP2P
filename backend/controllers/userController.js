const User = require('../models/user');
const EnergyMetrics = require('../models/energyMetrics');

exports.registerUser = async (req, res) => {
  try {

    const newUser = new User(req.body);
    await newUser.save();

    const energyMetrics = new EnergyMetrics({ userId: newUser._id });
    await energyMetrics.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};
