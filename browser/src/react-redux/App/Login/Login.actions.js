const SET_EMAIL = 'SET_EMAIL';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SET_PASSWORD = 'SET_PASSWORD';

export const setEmail = (email) => ({
    type: SET_EMAIL,
    email
});

export const setErrorMessage = (error) => ({
    type: SET_ERROR_MESSAGE,
    error
})

export const setPassword = (password) => ({
    type: SET_PASSWORD,
    password
});