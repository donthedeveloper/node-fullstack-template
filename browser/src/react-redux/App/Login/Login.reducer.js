// TODO: share constants file with actions
const SET_LOGIN_EMAIL = 'SET_LOGIN_EMAIL';
const SET_LOGIN_ERROR_MESSAGE = 'SET_LOGIN_ERROR_MESSAGE';
const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';

const initialState = {
    email: '',
    password: '',
    errorMessage: ''
};

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case SET_LOGIN_EMAIL:
            newState.email = action.email;
            break;
        case SET_LOGIN_ERROR_MESSAGE:
            newState.errorMessage = action.error;
            break;
        case SET_LOGIN_PASSWORD:
            newState.password = action.password;
            break;
        default:
            return state;
    }

    return newState;
}