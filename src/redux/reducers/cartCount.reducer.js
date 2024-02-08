


const cartCountReducer = (state = 0, action) => {
    if (action.type === 'ADD') {
        return state + 1;
    }
    if (action.type === 'REMOVE') {
        return state - 1;
    }
    console.log(state);
    return state;
}

export default cartCountReducer;
