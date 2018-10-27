import axios from 'axios';
import {updateStoreWithUser} from '../User.actions';

// TODO: share constants file with reducer
const PUSH_PROFILE_ERROR = 'PUSH_PROFILE_ERROR';
const RESET_PROFILE_ERROR = 'RESET_PROFILE_ERROR';
const RESET_PROFILE_PASSWORDS = 'RESET_PROFILE_PASSWORDS';
const RESET_PROFILE_STATE = 'RESET_SIGNUP_STATE';
const SET_PROFILE_CONFIRM_PASSWORD = 'SET_PROFILE_CONFIRM_PASSWORD';
const SET_PROFILE_EMAIL = 'SET_PROFILE_EMAIL';
const SET_PROFILE_ERROR = 'SET_PROFILE_ERROR';
const SET_PROFILE_OLD_PASSWORD = 'SET_PROFILE_OLD_PASSWORD';
const SET_PROFILE_PASSWORD = 'SET_PROFILE_PASSWORD';

// action creators
export const pushProfileError = (error) => ({
    type: PUSH_PROFILE_ERROR,
    error
});

const _resetProfilePasswords = () => ({
    type: RESET_PROFILE_PASSWORDS
});

const _resetProfileError = () => ({
    type: RESET_PROFILE_ERROR
});

export const resetProfileState = () => ({
    type: RESET_PROFILE_STATE
});

export const setProfileConfirmPassword = (confirmPassword) => ({
    type: SET_PROFILE_CONFIRM_PASSWORD,
    confirmPassword
});

export const setProfileEmail = (email) => ({
    type: SET_PROFILE_EMAIL,
    email
});

export const setProfileOldPassword = (oldPassword) => ({
    type: SET_PROFILE_OLD_PASSWORD,
    oldPassword
});

export const setProfileError = (error) => ({
    type: SET_PROFILE_ERROR,
    error
});

export const setProfilePassword = (password) => ({
    type: SET_PROFILE_PASSWORD,
    password
});

// thunks
export const updateProfile = ({id, email, oldPassword, password}) =>
    dispatch =>
        axios.patch(`/api/user/${id}`, {
            email,
            old_password: oldPassword,
            password
        })
            .then((response) => {
                dispatch(updateStoreWithUser());
                dispatch(_resetProfileError());
                dispatch(_resetProfilePasswords());
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