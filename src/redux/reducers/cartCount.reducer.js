


const cartCountReducer = (state = 0, action) => {
    if (action.type === 'ADD') {
        return state + 1;
    }
    if (action.type === 'REMOVE') {
        return state - 1;
    }
    if (action.type === 'RESET') {
        return state = 0;
      }
    return state;
}

export default cartCountReducer;
