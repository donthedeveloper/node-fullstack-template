const RESET_FORGOT_FORM = 'RESET_FORGOT_FORM';
const RESET_FORGOT_FORM_EMAIL = 'RESET_FORGOT_FORM_EMAIL';
const SET_FORGOT_FORM_EMAIL = 'SET_FORGOT_FORM_EMAIL';
const SET_FORGOT_FORM_EMAIL_SENT = 'SET_FORGOT_FORM_EMAIL_SENT';

const initialState = {
    email: '',
    emailSent: false
};

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case RESET_FORGOT_FORM:
            return initialState;
        case RESET_FORGOT_FORM_EMAIL:
            newState.email = '';
            break;
        case SET_FORGOT_FORM_EMAIL:
            newState.email = action.email;
            break;
        case SET_FORGOT_FORM_EMAIL_SENT:
            newState.emailSent = action.bool;
            break;
        default:
            return state;
    }

    return newState;
};