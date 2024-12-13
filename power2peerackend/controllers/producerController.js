const Producer = require('../models/ProducerStation');
const axios = require('axios');

// Add or update producer with geocoding
exports.addOrUpdateProducer = async (req, res) => {
    const { name, address, availableEnergy, pricePerUnit } = req.body;

    try {
        // Use Google Geocoding API to convert address to coordinates
        const geocodingResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address,
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
        });

        const coordinates = geocodingResponse.data.results[0].geometry.location;

        // Save or update producer in the database
        const producer = await Producer.findOneAndUpdate(
            { address },
            {
                name,
                address,
                coordinates,
                availableEnergy,
                pricePerUnit,
            },
            { upsert: true, new: true } // Create if doesn't exist
        );

        res.json({ message: 'Producer added/updated successfully!', producer });
    } catch (error) {
        res.status(500).json({ message: 'Error adding/updating producer.', error });
    }
};

// Fetch all producers
exports.getAllProducers = async (req, res) => {
    try {
        const producers = await Producer.find({});
        res.json({ producers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching producers.', error });
    }
};

// Update available energy
exports.updateAvailableEnergy = async (req, res) => {
    const { address, availableEnergy } = req.body;

    try {
        const producer = await Producer.findOneAndUpdate(
            { address },
            { availableEnergy, updatedAt: Date.now() },
            { new: true }
        );

        if (!producer) {
            return res.status(404).json({ message: 'Producer not found!' });
        }

        res.json({ message: 'Available energy updated successfully!', producer });
    } catch (error) {
        res.status(500).json({ message: 'Error updating available energy.', error });
    }
};
