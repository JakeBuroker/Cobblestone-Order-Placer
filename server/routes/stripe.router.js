const express = require("express");
const router = express.Router();
const pool = require('../modules/pool');
const Stripe = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);
const successUrl = `${process.env.CLIENT_URL}/checkout-success`;
const cancelUrl = `${process.env.CLIENT_URL}/checkout`;

// Route to create a Stripe checkout session.
router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  if (!products || products.length === 0) {
    return res
      .status(400)
      .json({ error: "No products provided for checkout." });
  }

  // Map products to Stripe's line item format for checkout
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.url],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  // Create the checkout session after receiving line items
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    // Send session ID back to the client.
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Webhook - TODO

const endpointSecret =
  "whsec_a6a1a5da4e830552397fd3c1d6623e3dce4b3bd97d5ad5202c4a35920e3ae8bez";
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("webhook here");
    } catch (err) {
      console.log("webhook failed");
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    response.send();
  }
);

module.exports = router;
