const bookingSchema = new mongoose.Schema({
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dates: {
      checkIn: Date,
      checkOut: Date
    },
    totalPrice: Number,
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
  }, { timestamps: true });