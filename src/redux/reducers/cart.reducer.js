const cartReducer = (state = [], action) => {
    if(action.type === 'ADD'){
      return [...state, action.payload]
    }
      if (action.type === 'REMOVE') {
        const i = action.payload;
        return state.filter((item, x) => x !== i);
       }
    return state;
  }

  export default cartReducer