import axios from 'axios';

const RESET_FORGOT_FORM = 'RESET_FORGOT_FORM';
const RESET_FORGOT_FORM_EMAIL = 'RESET_FORGOT_FORM_EMAIL';
const SET_FORGOT_FORM_EMAIL = 'SET_FORGOT_FORM_EMAIL';
const SET_FORGOT_FORM_EMAIL_SENT = 'SET_FORGOT_FORM_EMAIL_SENT';

export const resetForgotForm = () => ({
    type: RESET_FORGOT_FORM
});

const _resetForgotFormEmail = () => ({
    type: RESET_FORGOT_FORM_EMAIL
});

const _setForgotFormEmailSent = (bool) => ({
    type: SET_FORGOT_FORM_EMAIL_SENT,
    bool
});

export const setForgotFormEmail = (email) => ({
    type: SET_FORGOT_FORM_EMAIL,
    email
});

export const requestToken = (email) =>
    dispatch =>
        axios.post('/api/forgot', {email})
            .then((res) => {
                dispatch(_setForgotFormEmailSent(true));
                dispatch(_resetForgotFormEmail());
            });
            // todo: handle blank/invalid email, needs backend work