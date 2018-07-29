import {combineReducers} from 'redux';
import loginReducer from './App/Login/Login.reducer';
import registrationReducer from './App/Registration/Registration.reducer';
import userReducer from './App/User.reducer';

const reducers = combineReducers({
    loginReducer,
    registrationReducer,
    userReducer
});

export default reducers;