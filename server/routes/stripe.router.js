const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
const successUrl = `${process.env.CLIENT_URL}/checkout-success`;
const cancelUrl = `${process.env.CLIENT_URL}/checkout`; 

router.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ error: 'No products provided for checkout.' });
  }

  const lineItems = products.map((product) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name,
        images: [product.url],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;