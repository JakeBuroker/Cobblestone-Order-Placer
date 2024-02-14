import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import menu from './menu.reducer';
import cart from './cart.reducer';
import total from './total.reducer'
import cartCount from './cartCount.reducer';
import orders from './orders.reducers'
import details from './details.reducer'
import userOrders from  './/userOrders.reducer'
import categories from './categories.reducer'

// rootReducer is the primary reducer
// bundles up all of the other reducers so our project can use them.
// imported in index.js as rootSaga

// bigger object for our store, with the objects from our reducers.
const rootReducer = combineReducers({
  errors, // Contains messages related to registration and login errors
  user, // Stores user information; contains an id and username when a user is logged in
  menu, // Holds the list of items available for order
  cart, // Manages the user's current selection of items, representing the shopping cart
  total, // Represents the total cost of the items in the cart
  cartCount, // Keeps track of the number of items in the cart
  orders, // Stores a list of all orders placed, useful for admin or user history views
  details, // Contains detailed information about orders, such as item specifics or statuses
  userOrders, // A filtered list of orders specifically related to the logged-in user
  categories, // Manages the different categories of items available in the menu for easier navigation
});

export default rootReducer;
