const categoriesReducer = (state = [], action) => {
    if(action.type === 'SET_CATEGORIES'){
      return action.payload
    }
    return state;
  }
  
  // user will be on the redux state at:
  // state.user
  export default categoriesReducer;