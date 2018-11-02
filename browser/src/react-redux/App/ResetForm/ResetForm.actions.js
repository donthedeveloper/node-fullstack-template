import axios from 'axios';
import {updateStoreWithUser} from '../User.actions';

const PUSH_RESET_FORM_ERROR = 'PUSH_RESET_FORM_ERROR';
const RESET_RESET_FORM = 'RESET_RESET_FORM';
const SET_RESET_FORM_ERROR = 'SET_RESET_FORM_ERROR';
const SET_RESET_FORM_CONFIRM_PASSWORD = 'SET_RESET_FORM_CONFIRM_PASSWORD';
const SET_RESET_FORM_PASSWORD = 'SET_RESET_FORM_PASSWORD';

export const pushResetFormError = (error) => ({
    type: PUSH_RESET_FORM_ERROR,
    error
});

const _resetResetForm = () => ({
    type: RESET_RESET_FORM
});

const _setResetFormError = (error) => ({
    type: SET_RESET_FORM_ERROR,
    error
});

export const setResetFormConfirmPassword = (confirmPassword) => ({
    type: SET_RESET_FORM_CONFIRM_PASSWORD,
    confirmPassword
});

export const setResetFormPassword = (password) => ({
    type: SET_RESET_FORM_PASSWORD,
    password
});

export const changeResetFormPassword = (password, token) =>
    dispatch =>
        axios.post(`/api/reset/${token}`, {password})
            .then(() => {
                dispatch(_resetResetForm());
                dispatch(updateStoreWithUser());
            })
            .catch((err) => {
                // debugger;
                dispatch(_setResetFormError(err.response.data.error));
            });

export const verifyToken = (token) =>
    dispatch =>
            axios.get(`/api/reset/${token}`)
                .catch((err) => {
                    if (err.response.status === 400) {
                        dispatch(_setResetFormError(err.response.data.error));
                    }
                });