import axios from 'axios';
import {setUser} from '../User.actions';

// TODO: share constants file with reducer
const SET_PROFILE_CONFIRM_PASSWORD = 'SET_PROFILE_CONFIRM_PASSWORD';
const SET_PROFILE_EMAIL = 'SET_PROFILE_EMAIL';
const SET_PROFILE_ERROR = 'SET_PROFILE_ERROR';
const SET_PROFILE_PASSWORD = 'SET_PROFILE_PASSWORD';
const RESET_PROFILE_ERROR = 'RESET_PROFILE_ERROR';
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

export const setProfileError = (error) => ({
    type: SET_PROFILE_ERROR,
    error
});

export const setProfilePassword = (password) => ({
    type: SET_PROFILE_PASSWORD,
    password
});

export const resetProfileError = () => ({
    type: RESET_PROFILE_ERROR
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
                dispatch(resetProfileError());
            })
            .catch((err) => {
                // TODO: 
                if (err.response.status === 404) {
                    // dispatch(setProfileErrorMessage(`You don't exist.`));
                    // TODO: get user new state (by logging them out and redirecting to login page)
                }

                if (err.response.status === 400) {
                    dispatch(setProfileError(err.response.data.error));
                }
            });