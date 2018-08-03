import axios from 'axios';
import {updateStoreWithUser} from '../User.actions';

// TODO: share constants file with reducer
const SET_LOGIN_EMAIL = 'SET_LOGIN_EMAIL';
const SET_LOGIN_ERROR_MESSAGE = 'SET_LOGIN_ERROR_MESSAGE';
const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';
const RESET_LOGIN_STATE = 'RESET_SIGNUP_STATE';

// action creators
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

export const resetLoginState = () => ({
    type: RESET_LOGIN_STATE
});

// thunks
export const authenticate = (email, password) =>
    dispatch =>
        axios.post('/api/login', {email, password})
            .then(() => {
                dispatch(updateStoreWithUser());
                dispatch(resetLoginState());
            })
            .catch((err) => {
                dispatch(setLoginErrorMessage(err.response.data.message));
            });