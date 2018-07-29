import {combineReducers} from 'redux';
import loginReducer from './App/Login/Login.reducer';
import signupReducer from './App/Signup/Signup.reducer';
import user from './App/User.reducer';

const reducers = combineReducers({
    loginReducer,
    signupReducer,
    user
});

export default reducers;