import axios from 'axios';
import {setUser, updateStoreWithUser} from '../User.actions';

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
// TODO: get rid of this? I think it's just a reference
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

export const updateProfile = (userId, email, password) =>
    dispatch =>
        axios.patch(`/api/user/${userId}`, {email, password})
            .then((response) => {
                dispatch(setUser(response.data.user));
                dispatch(resetProfileErrorMessage());
            })
            .catch((err) => {
                console.log(err.response.errors);
                if (err.response.status === 404) {
                    dispatch(setProfileErrorMessage(`You don't exist.`));
                }

                if (err.response.status === 400) {
                    console.log(err.response);
                    dispatch(setProfileErrorMessage(err.response.data.errors.email.message));
                }
            });