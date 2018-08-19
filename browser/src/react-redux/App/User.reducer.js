const SET_USER = 'SET_USER';

const initialState = null;

export default (state=initialState, action) => {
    switch(action.type) {
        case SET_USER:
            const user = action.user;
            return user ? Object.assign({}, user) : user;
            break;
        default:
            return state;
    }
}