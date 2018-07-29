const SET_USER = 'SET_USER';

const initialState = null;

export default (state=initialState, action) => {
    // let newState = Object.assign({}, state);

    switch(action.type) {
        case SET_USER:
            const user = action.user;
            return user ? action.Object.assign({}, action.user) : null;
            break;
        default:
            return state;
    }

    // return newState;
}