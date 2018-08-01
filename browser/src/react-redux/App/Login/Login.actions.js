// TODO: share constants file with reducer
const SET_LOGIN_EMAIL = 'SET_LOGIN_EMAIL';
const SET_LOGIN_ERROR_MESSAGE = 'SET_LOGIN_ERROR_MESSAGE';
const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';

export const setLoginEmail = (email) => ({
    type: SET_LOGIN_EMAIL,
    email
});

export const setLoginErrorMessage = (error) => ({
    type: SET_LOGIN_ERROR_MESSAGE,
    error
});

export const setLoginPassword = (password) => ({
    type: SET_LOGIN_PASSWORD,
    password
});