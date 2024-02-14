
// Holds the list of items available for order
const menuItemsReducer = (state = [], action) => {
    if(action.type === 'SET_MENU_ITEMS'){
      return action.payload
    }
    return state;
  }
  
  export default menuItemsReducer;