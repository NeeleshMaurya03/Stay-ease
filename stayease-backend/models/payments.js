// routes/payments.js
router.post('/create-payment-intent', authenticate, async (req, res) => {
    const { amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // in paisa
      currency: 'inr',
      metadata: { userId: req.user.id }
    });
  
    res.json({ clientSecret: paymentIntent.client_secret });
  });