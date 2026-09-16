// models/Parcel.js
const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project', 
        required: true 
    },
    ownerName: { 
        type: String, 
        required: true 
    },
    contactInfo: { 
        type: String 
    },
    areaSize: { 
        type: Number, 
        required: true 
    },
    // GeoJSON format for map rendering
    location: { 
        type: {
            type: String,
            enum: ['Polygon'], // We use Polygon to draw exact land boundaries
            required: true
        },
        coordinates: {
            type: [[[Number]]], // Array of arrays of arrays of numbers: [[[lng, lat], [lng, lat]...]]
            required: true
        }
    }
}, { timestamps: true });

// Create a 2dsphere index for ultra-fast geospatial queries
parcelSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Parcel', parcelSchema);