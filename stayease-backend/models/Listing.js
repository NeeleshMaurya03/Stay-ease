// models/Listing.js
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: String,
    city: { type: String, required: true },
    state: String,
    pincode: String,
    coordinates: [Number] // [longitude, latitude]
  },
  pricing: {
    daily: { type: Number, required: true },
    weekly: Number,
    monthly: Number,
    deposit: Number
  },
  basicDetails: {
    propertyType: { type: String, enum: ['Private Room', 'Shared Room', 'Studio'], required: true },
    bedrooms: { type: Number, min: 1 },
    bathrooms: { type: Number, min: 1 },
    area: Number, // in sqft
    maxOccupancy: { type: Number, min: 1 },
    minimumStay: { type: Number, default: 1 } // minimum days
  },
  amenities: {
    essentials: [String],
    safety: [String],
    added: [String]
  },
  specialTags: [String],
  images: [{
    url: String,
    caption: String
  }],
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  locationAdvantages: [{
    name: String,
    distance: Number, // in km
    time: String
  }],
  availability: {
    startDate: Date,
    isAvailable: { type: Boolean, default: true },
    bookedDates: [{
      from: Date,
      to: Date
    }]
  },
  preferences: {
    gender: { type: String, enum: ['Male', 'Female', 'Any'], default: 'Any' },
    suitableFor: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);