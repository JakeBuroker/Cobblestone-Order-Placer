
// Stores a list of all orders placed, useful for admin or user history views
const orders = (state = [], action) => {
    if(action.type === 'SET_ORDERS'){
      return action.payload
    }
    return state;
  }

  export default orders