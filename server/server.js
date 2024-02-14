const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const cors = require('cors');
bodyParser = require('body-parser')

// Route Includes
const userRouter = require('./routes/user.router');
const menuRouter = require('./routes/menu.router');
const categoriesRouter = require('./routes/categories.router');
const ordersRouter = require('./routes/orders.router')
const detailsRouter = require('./routes/details.router')
const userOrdersRouter = require('./routes/userOrders.router')
const stripeRouter = require("./routes/stripe.router");

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/menu', menuRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/details', detailsRouter)
app.use('/api/userOrders', userOrdersRouter)

// Using CORS for requests from http://localhost:5173 
// allows cross-origin HTTP requests to the API for Stripe Checkout
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.options('*', cors());
app.use('/api/stripe', stripeRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
