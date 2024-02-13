const express = require("express")
const Stripe = require("stripe")
const router = express.Router()
require("dotenv").config()

const stripe = Stripe(process.env.STRIPE_KEY)


router.post('/create-checkout-session', async (req, res) => {
  const {products} = req.body
    const lineItems = products.map((product) => ({
      price_data: {
          currency:'usd',
          product_data: {
            name:product.name,
          },
 unit_amount:Math.round(product.price*100),
      },
quantity: product.quantity,
    }))
    const successUrl = `${process.env.CLIENT_URL}/checkout-success`
    const badUrl = `${process.env.CLIENT_URL}/checkout`
    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:successUrl,
      cancel_url:badUrl
    })
    res.json({id:session.id})
  })

  module.exports = router