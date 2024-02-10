const totalReducer = (state = 0, action) => {
  if (action.type === 'ADD') {
    return state + parseFloat(action.payload.price);
  }
  if (action.type === 'REMOVE') {
    return state - parseFloat(action.payload.price);
  }
  return state;
};


export default totalReducer