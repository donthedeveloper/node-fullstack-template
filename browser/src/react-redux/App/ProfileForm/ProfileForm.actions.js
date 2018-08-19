import axios from 'axios';
import {setUser} from '../User.actions';

// TODO: share constants file with reducer
const SET_PROFILE_CONFIRM_PASSWORD = 'SET_PROFILE_CONFIRM_PASSWORD';
const SET_PROFILE_EMAIL = 'SET_PROFILE_EMAIL';
const SET_PROFILE_ERROR_MESSAGE = 'SET_PROFILE_ERROR_MESSAGE';
const SET_PROFILE_PASSWORD = 'SET_PROFILE_PASSWORD';
const RESET_PROFILE_ERROR_MESSAGE = 'RESET_PROFILE_ERROR_MESSAGE';
const RESET_PROFILE_STATE = 'RESET_SIGNUP_STATE';

// action creators
export const setProfileConfirmPassword = (confirmPassword) => ({
    type: SET_PROFILE_CONFIRM_PASSWORD,
    confirmPassword
});

export const setProfileEmail = (email) => ({
    type: SET_PROFILE_EMAIL,
    email
});

export const setProfileErrorMessage = (error) => ({
    type: SET_PROFILE_ERROR_MESSAGE,
    error
});

export const setProfilePassword = (password) => ({
    type: SET_PROFILE_PASSWORD,
    password
});

export const resetProfileErrorMessage = () => ({
    type: RESET_PROFILE_ERROR_MESSAGE
});

export const resetProfileState = () => ({
    type: RESET_PROFILE_STATE
});

// thunks
export const updateProfile = (userId, email, password) =>
    dispatch =>
        axios.patch(`/api/user/${userId}`, {email, password})
            .then((response) => {
                dispatch(setUser(response.data.user));
                dispatch(resetProfileErrorMessage());
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    dispatch(setProfileErrorMessage(`You don't exist.`));
                }

                // TODO: @node-fullstack-template/issues/24
                if (err.response.status === 400) {
                    let errorMessage;
                    const errorData = err.response.data.error;
                    if (err.response.data.error.errors) {
                        errorMessage = errorData.errors.email.message;
                    } else {
                        errorMessage = errorData.message;
                    }
                    dispatch(setProfileErrorMessage(errorMessage));
                }
            });