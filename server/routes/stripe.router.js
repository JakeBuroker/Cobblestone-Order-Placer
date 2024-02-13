const express = require("express")
const Stripe = require("stripe")
const router = express.Router()
require("dotenv").config()

const stripe = Stripe(process.env.STRIPE_KEY)



router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Shelf Item',
            },
            unit_amount: 0,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`
    });
  
    res.send({url: session.url});
  });

  module.exports = router