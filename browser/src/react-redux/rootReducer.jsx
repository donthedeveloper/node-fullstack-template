import {combineReducers} from 'redux';
import forgotForm from './App/ForgotForm/ForgotForm.reducer';
import loginForm from './App/LoginForm/LoginForm.reducer';
import profileForm from './App/ProfileForm/ProfileForm.reducer';
import signupForm from './App/SignupForm/SignupForm.reducer';
import user from './App/User.reducer';

// TODO: change properties in store
const reducers = combineReducers({
    forgotForm,
    loginForm,
    profileForm,
    signupForm,
    user
});

export default reducers;