const SET_RESET_FORM_ERROR = 'SET_RESET_FORM_ERROR';
const SET_RESET_FORM_CONFIRM_PASSWORD = 'SET_RESET_FORM_CONFIRM_PASSWORD';
const SET_RESET_FORM_PASSWORD = 'SET_RESET_FORM_PASSWORD';

const initialState = {
    confirmPassword: '',
    error: {
        fields: [],
        messages: []
    },
    password: ''
};

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SET_RESET_FORM_ERROR:
            const {field, message} = action.error;
            newState.error = Object.assign({}, initialState.error);
            newState.error.fields = [field];
            newState.error.messages = [message];
        case SET_RESET_FORM_CONFIRM_PASSWORD:
            newState.confirmPassword = action.confirmPassword;
            break;
        case SET_RESET_FORM_PASSWORD:
            newState.password = action.password;
            break;
        default:
            return state;
    }

    return newState;
};