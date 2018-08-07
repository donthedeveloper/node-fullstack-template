import {combineReducers} from 'redux';
import loginReducer from './App/Login/Login.reducer';
import profileReducer from './App/Profile/Profile.reducer';
import signupReducer from './App/Signup/Signup.reducer';
import user from './App/User.reducer';

// TODO: change properties in store
const reducers = combineReducers({
    loginReducer,
    // login,
    profileReducer,
    // profile,
    signupReducer,
    // signup,
    user
});

export default reducers;