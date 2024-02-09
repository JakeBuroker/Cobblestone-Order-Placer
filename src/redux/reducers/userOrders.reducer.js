const orders = (state = [], action) => {
    if(action.type === 'SET_USER_ORDERS'){
      return [...action.payload]
    }
    return state;
  }

  export default orders