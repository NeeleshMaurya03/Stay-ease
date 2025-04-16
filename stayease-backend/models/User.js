// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['host', 'guest'], required: true },
  isVerified: { type: Boolean, default: false },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);