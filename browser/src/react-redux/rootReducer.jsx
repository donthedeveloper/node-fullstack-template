import {combineReducers} from 'redux';
import {samples} from './App/Sample/reducer';
import loginReducer from './App/Login/Login.reducer';

const reducers = combineReducers({
    loginReducer,
    samples
});

export default reducers;