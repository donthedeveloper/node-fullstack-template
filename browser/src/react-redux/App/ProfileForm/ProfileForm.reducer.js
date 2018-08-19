// TODO: share constants file with actions
const SET_PROFILE_CONFIRM_PASSWORD = 'SET_PROFILE_CONFIRM_PASSWORD';
const SET_PROFILE_EMAIL = 'SET_PROFILE_EMAIL';
const SET_PROFILE_ERROR = 'SET_PROFILE_ERROR';
const SET_PROFILE_PASSWORD = 'SET_PROFILE_PASSWORD';
const RESET_PROFILE_ERROR = 'RESET_PROFILE_ERROR';
const RESET_PROFILE_STATE = 'RESET_SIGNUP_STATE';

const initialState = {
    confirmPassword: '',
    email: '',
    error: {
        fields: [],
        messages: []
    },
    password: '',
};

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case RESET_PROFILE_ERROR:
            newState.error = initialState.error;
            break;
        case RESET_PROFILE_STATE:
            return initialState;
        case SET_PROFILE_EMAIL:
            newState.email = action.email;
            break;
        case SET_PROFILE_ERROR:
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
        case SET_PROFILE_PASSWORD:
            newState.password = action.password;
            break;
        case SET_PROFILE_CONFIRM_PASSWORD:
            newState.confirmPassword = action.confirmPassword;
            break;
        default:
            return state;
    }

    return newState;
}