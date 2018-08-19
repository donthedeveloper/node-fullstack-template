// TODO: share constants file with actions

const SET_SIGNUP_CONFIRM_PASSWORD = 'SET_SIGNUP_CONFIRM_PASSWORD';
const SET_SIGNUP_EMAIL = 'SET_SIGNUP_EMAIL';
const SET_SIGNUP_ERROR_MESSAGE = 'SET_SIGNUP_ERROR_MESSAGE';
const SET_SIGNUP_PASSWORD = 'SET_SIGNUP_PASSWORD';
const RESET_SIGNUP_STATE = 'RESET_SIGNUP_STATE';

const initialState = {
    confirmPassword: '',
    email: '',
    password: '',
    errorMessage: ''
};

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case RESET_SIGNUP_STATE:
            return initialState;
        case SET_SIGNUP_CONFIRM_PASSWORD:
            newState.confirmPassword = action.confirmPassword;
            break;
        case SET_SIGNUP_EMAIL:
            newState.email = action.email;
            break;
        case SET_SIGNUP_ERROR_MESSAGE:
            newState.errorMessage = action.error;
            break;
        case SET_SIGNUP_PASSWORD:
            newState.password = action.password;
            break;
        default:
            return state;
    }

    return newState;
}