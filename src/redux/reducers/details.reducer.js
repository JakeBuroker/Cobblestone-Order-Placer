const detailsReducer = (state = [], action) => {
    if(action.type === 'SET_DETAILS'){
      return action.payload
    }
    return state;
  }
  
  // user will be on the redux state at:
  // state.user
  export default detailsReducer;