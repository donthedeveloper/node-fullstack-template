// TODO: share constants file with actions

const SET_SIGNUP_CONFIRM_PASSWORD = 'SET_SIGNUP_CONFIRM_PASSWORD';
const SET_SIGNUP_EMAIL = 'SET_SIGNUP_EMAIL';
const SET_SIGNUP_ERROR = 'SET_SIGNUP_ERROR';
const SET_SIGNUP_PASSWORD = 'SET_SIGNUP_PASSWORD';
const RESET_SIGNUP_STATE = 'RESET_SIGNUP_STATE';

const initialState = {
    confirmPassword: '',
    email: '',
    error: {
        fields: [],
        messages: []
    },
    password: ''
};

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case RESET_SIGNUP_STATE:
            return initialState;
        case SET_SIGNUP_CONFIRM_PASSWORD:
            newState.confirmPassword = action.confirmPassword;
            break;
        case SET_SIGNUP_EMAIL:
            newState.email = action.email;
            break;
        case SET_SIGNUP_ERROR:
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
                newState.error.fields = [...newFields];
                newState.error.messages = [...newMessages];
            } else {
                newState.error.messages = [actionMessage];
            }
            break;
        case SET_SIGNUP_PASSWORD:
            newState.password = action.password;
            break;
        default:
            return state;
    }

    return newState;
}