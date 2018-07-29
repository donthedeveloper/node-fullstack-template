const SET_EMAIL = 'SET_EMAIL';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SET_PASSWORD = 'SET_PASSWORD';

const initialState = {
    email: '',
    password: '',
    errorMessage: ''
};

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case SET_EMAIL:
            newState.email = action.email;
            break;
        case SET_ERROR_MESSAGE:
            newState.errorMessage = action.error;
            break;
        case SET_PASSWORD:
            newState.password = action.password;
            break;
        default:
            return state;
    }

    return newState;
}