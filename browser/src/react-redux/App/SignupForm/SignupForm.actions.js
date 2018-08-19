import axios from 'axios';
import {updateStoreWithUser} from '../User.actions';

// TODO: share constants file with reducer
const SET_SIGNUP_CONFIRM_PASSWORD = 'SET_SIGNUP_CONFIRM_PASSWORD';
const SET_SIGNUP_EMAIL = 'SET_SIGNUP_EMAIL';
const SET_SIGNUP_ERROR_MESSAGE = 'SET_SIGNUP_ERROR_MESSAGE';
const SET_SIGNUP_PASSWORD = 'SET_SIGNUP_PASSWORD';
const RESET_SIGNUP_STATE = 'RESET_SIGNUP_STATE';

// action creators
export const setSignupConfirmPassword = (confirmPassword) => ({
    type: SET_SIGNUP_CONFIRM_PASSWORD,
    confirmPassword
})

export const setSignupEmail = (email) => ({
    type: SET_SIGNUP_EMAIL,
    email
});

// TODO: is this still needed?
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

// thunks
export const sendSignupData = (email, password) =>
    dispatch =>
        axios.post('/api/user', {email, password})
            .then((res) => {
                dispatch(updateStoreWithUser());
                dispatch(resetSignupState());
            })
            .catch((err) => {
                console.log('message:', err.response.data.message);
                dispatch(setSignupErrorMessage(errorData.errors.email.message));

                if (err.response.status === 400) {
                    let errorMessage;

                    const errorData = err.response.data.error;
                    // TODO: we should be checking for password field as well @node-fullstack-template/issues/24
                    if (err.response.data.error.errors) {
                        errorMessage = errorData.errors.email.message;
                    } else {
                        errorMessage = errorData.message;
                    }
                    dispatch(setProfileErrorMessage(errorMessage));
                }
            });