const totalReducer = (state = 0, action) => {
  if(action.type === 'ADD'){
    return state += parseFloat(action.payload.price)
  }
  if(action.type === 'REMOVE'){
    return state - action.payload.price;
    
  }
  console.log(state)

  return (state);
}


  export default totalReducer