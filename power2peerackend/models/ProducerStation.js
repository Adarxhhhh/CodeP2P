const mongoose = require('mongoose');

const ProducerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    availableEnergy: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Producer', ProducerSchema);
