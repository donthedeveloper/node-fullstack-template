const RESET_RESET_FORM = 'RESET_RESET_FORM';
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
        case RESET_RESET_FORM:
            return initialState;
        case SET_RESET_FORM_ERROR:
            const actionErrors = action.error.errors;
            const actionMessage = action.error.message;
            newState.error = Object.assign({}, initialState.error);

            const newFields = [];
            const newMessages = [];
            if (actionErrors) {
                for (let key in actionErrors) {
                    newFields.push(actionErrors[key].name);
                    newMessages.push(actionErrors[key].message);
                }
                newState.error.fields = [newFields];
                newState.error.messages = [...newMessages];
            } else {
                newState.error.messages = [actionMessage];
            }
            break;
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