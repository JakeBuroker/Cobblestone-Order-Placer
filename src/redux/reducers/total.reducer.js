
// Represents the total cost of the items in the cart
const totalReducer = (state = 0, action) => {
  if (action.type === 'ADD') {
    return state + parseFloat(action.payload.price);
  }
  if (action.type === 'REMOVE') {
    return state - parseFloat(action.payload.price);
  }
  if (action.type === 'RESET') {
    return state = 0;
  }
  return state;
};

export default totalReducer