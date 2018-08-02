import axios from 'axios';
import {setUser} from '../User.actions';

// TODO: share constants file with reducer
const SET_LOGIN_EMAIL = 'SET_LOGIN_EMAIL';
const SET_LOGIN_ERROR_MESSAGE = 'SET_LOGIN_ERROR_MESSAGE';
const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';
const RESET_LOGIN_STATE = 'RESET_SIGNUP_STATE';

// normal action creators
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
                setLoginErrorMessage(err.response.data.message);
            });

// TODO: probably put this in User.actions.js
export const updateStoreWithUser = () =>
    dispatch => 
        axios.get('/api/whoami')
            .then((res) => {
                dispatch(setUser(res.data.user));
            })
            .catch((err) => {
                console.error(err);
            });