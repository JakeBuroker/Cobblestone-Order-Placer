const filteredMenuReducer = (state = [], action) => {
    if(action.type === 'SET_FILTERED_MENU_ITEMS'){
      return action.payload
    }
    return state;
  }
  
  // user will be on the redux state at:
  // state.user
  export default filteredMenuReducer;