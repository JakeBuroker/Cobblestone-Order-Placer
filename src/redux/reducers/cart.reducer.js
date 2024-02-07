const cartReducer = (state = [], action) => {
    if(action.type === 'ADD'){
      return [...state, action.payload]
    }
    return state;
  }

  export default cartReducer