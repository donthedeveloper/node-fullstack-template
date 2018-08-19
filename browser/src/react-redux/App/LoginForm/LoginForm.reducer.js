// TODO: share constants file with actions
const SET_LOGIN_EMAIL = 'SET_LOGIN_EMAIL';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';
const RESET_LOGIN_STATE = 'RESET_SIGNUP_STATE';

const initialState = {
    email: '',
    password: '',
    error: {
        fields: [],
        messages: []
    }
};

export default (state=initialState, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case RESET_LOGIN_STATE:
            return initialState;
        case SET_LOGIN_EMAIL:
            newState.email = action.email;
            break;
        case SET_LOGIN_ERROR:
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
        case SET_LOGIN_PASSWORD:
            newState.password = action.password;
            break;
        default:
            return state;
    }

    return newState;
}