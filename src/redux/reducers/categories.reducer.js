
// Manages the different categories of items available in the menu for easier navigation
const categoriesReducer = (state = [], action) => {
    if(action.type === 'SET_CATEGORIES'){
      return action.payload
    }
    return state;
  }

  export default categoriesReducer;