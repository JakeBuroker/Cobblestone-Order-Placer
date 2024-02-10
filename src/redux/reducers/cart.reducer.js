const cartReducer = (state = [], action) => {
  if(action.type === 'ADD') {
    return [...state, action.payload];
  }
  if (action.type === 'REMOVE') {
    return state.filter((item, index) => index !== action.payload.index);
  }
  return state;
};


export default cartReducer