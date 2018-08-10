// TODO: share constants file with actions
const SET_PROFILE_CONFIRM_PASSWORD = 'SET_PROFILE_CONFIRM_PASSWORD';
const SET_PROFILE_EMAIL = 'SET_PROFILE_EMAIL';
const SET_PROFILE_ERROR_MESSAGE = 'SET_PROFILE_ERROR_MESSAGE';
const SET_PROFILE_PASSWORD = 'SET_PROFILE_PASSWORD';
const RESET_PROFILE_ERROR_MESSAGE = 'RESET_PROFILE_ERROR_MESSAGE';
const RESET_PROFILE_STATE = 'RESET_SIGNUP_STATE';

const initialState = {
    confirmPassword: '',
    email: '',
    password: '',
    errorMessage: ''
};

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case RESET_PROFILE_ERROR_MESSAGE:
            newState.errorMessage = initialState.errorMessage;
            break;
        case RESET_PROFILE_STATE:
            return initialState;
        case SET_PROFILE_EMAIL:
            newState.email = action.email;
            break;
        case SET_PROFILE_ERROR_MESSAGE:
            newState.errorMessage = action.error;
            break;
        case SET_PROFILE_PASSWORD:
            newState.password = action.password;
            break;
        case SET_PROFILE_CONFIRM_PASSWORD:
            newState.confirmPassword = action.confirmPassword;
            break;
        default:
            return state;
    }

    return newState;
}