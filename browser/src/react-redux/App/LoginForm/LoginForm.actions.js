import axios from 'axios';
import {updateStoreWithUser} from '../User.actions';

// TODO: share constants file with reducer
const SET_LOGIN_EMAIL = 'SET_LOGIN_EMAIL';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';
const RESET_LOGIN_STATE = 'RESET_SIGNUP_STATE';

// action creators
export const setLoginEmail = (email) => ({
    type: SET_LOGIN_EMAIL,
    email
});

export const setLoginError = (error) => ({
    type: SET_LOGIN_ERROR,
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
                if (err.response.status === 400) {
                    dispatch(setLoginError(err.response.data.error));
                }
            });