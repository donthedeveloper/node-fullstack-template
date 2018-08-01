// TODO: share constants file with reducer
// TODO: share constants file with reducer
const SET_SIGNUP_EMAIL = 'SET_SIGNUP_EMAIL';
const SET_SIGNUP_ERROR_MESSAGE = 'SET_SIGNUP_ERROR_MESSAGE';
const SET_SIGNUP_PASSWORD = 'SET_SIGNUP_PASSWORD';
const RESET_SIGNUP_STATE = 'RESET_SIGNUP_STATE';

export const setSignupEmail = (email) => ({
    type: SET_SIGNUP_EMAIL,
    email
});

export const setSignupErrorMessage = (error) => ({
    type: SET_SIGNUP_ERROR_MESSAGE,
    error
});

export const setSignupPassword = (password) => ({
    type: SET_SIGNUP_PASSWORD,
    password
});

export const resetSignupState = () => ({
    type: RESET_SIGNUP_STATE
});