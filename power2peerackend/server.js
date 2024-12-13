const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const ProducerStation = require('./models/ProducerStation');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));


// 1. Register User
app.post('/api/registerUser', async (req, res) => {
    try {
        const { name, address, contact, role, location } = req.body;

        // Validate input
        if (!name || !address || !contact || !role || !location) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        // Save user to the database
        const newUser = new User({ name, address, contact, role, location });
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully!', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Get IoT Data (Dummy Energy Data)
app.get('/api/getAvailableEnergy', async (req, res) => {
    try {
        const availableEnergy = Math.floor(Math.random() * 500) + 100; // Generate random energy
        res.status(200).json({ availableEnergy });
    } catch (error) {
        console.error('Error fetching IoT data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Set Producer's Price and Energy
app.post('/api/setPrice', async (req, res) => {
    try {
        const { userId, pricePerUnit, availableEnergy } = req.body;

        // Validate input
        if (!userId || !pricePerUnit || !availableEnergy) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        // Check if the producer station exists
        let station = await ProducerStation.findOne({ userId });
        if (!station) {
            // Create new producer station
            station = new ProducerStation({
                userId,
                pricePerUnit,
                availableEnergy,
                location: { lat: 37.7749, lng: -122.4194 }, // Dummy location; replace with real coordinates
            });
        } else {
            // Update existing producer station
            station.pricePerUnit = pricePerUnit;
            station.availableEnergy = availableEnergy;
        }

        await station.save();
        res.status(200).json({ message: 'Price and energy updated successfully!', station });
    } catch (error) {
        console.error('Error setting price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4. Get Nearby Stations
app.get('/api/getStations', async (req, res) => {
    try {
        const { lat, lng } = req.query;

        // Validate input
        if (!lat || !lng) {
            return res.status(400).json({ error: 'Latitude and Longitude are required!' });
        }

        const radius = 0.0725; // Approx. 5 miles in degrees
        const stations = await ProducerStation.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[parseFloat(lng), parseFloat(lat)], radius / 3963.2], // Convert radius to radians
                },
            },
        });

        res.status(200).json({ stations });
    } catch (error) {
        console.error('Error fetching nearby stations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
