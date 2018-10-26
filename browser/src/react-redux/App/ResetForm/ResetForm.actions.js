const SET_RESET_FORM_ERROR = 'SET_RESET_FORM_ERROR';
const SET_RESET_FORM_CONFIRM_PASSWORD = 'SET_RESET_FORM_CONFIRM_PASSWORD';
const SET_RESET_FORM_PASSWORD = 'SET_RESET_FORM_PASSWORD';

const setResetFormError = (error) => ({
    type: SET_RESET_FORM_ERROR,
    error
});

const setResetFormConfirmPassword = (confirmPassword) => ({
    type: SET_RESET_FORM_CONFIRM_PASSWORD,
    confirmPassword
});

const setResetFormPassword = (password) => ({
    type: SET_RESET_FORM_PASSWORD,
    password
});