
// Contains detailed information about orders, such as item specifics or statuses
const detailsReducer = (state = [], action) => {
    if(action.type === 'SET_DETAILS'){
      return action.payload
    }
    return state;
  }
  
  export default detailsReducer;