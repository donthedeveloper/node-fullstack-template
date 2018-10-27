import axios from 'axios';
import updateStoreWithUser from '../User.actions';

const RESET_RESET_FORM = 'RESET_RESET_FORM';
const SET_RESET_FORM_ERROR = 'SET_RESET_FORM_ERROR';
const SET_RESET_FORM_CONFIRM_PASSWORD = 'SET_RESET_FORM_CONFIRM_PASSWORD';
const SET_RESET_FORM_PASSWORD = 'SET_RESET_FORM_PASSWORD';

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
    dispatch => {
        axios.post(`/api/forgot/${token}`, password)
            .then(() => {
                dispatch(_resetResetForm());
                dispatch(updateStoreWithUser());
            })
            .catch((err) => {
                dispatch(_setResetFormError(err.response.data.error));
            });
    };