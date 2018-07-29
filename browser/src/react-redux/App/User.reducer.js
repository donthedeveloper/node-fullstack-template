const SET_USER = 'SET_USER';

const initialState = {
    user: null
};

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case SET_USER:
            newState.user = action.user;
            break;
        default:
            return state;
    }

    return newState;
}