const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Listing = require('../models/Listing');

// GET /api/listings/host/listings
router.get('/host/listings', authenticate, authorize('host'), async (req, res) => {
  try {
    const listings = await Listing.find({ host: req.user.id });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});