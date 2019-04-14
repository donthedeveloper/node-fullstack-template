import {combineReducers} from 'redux';
import user from './App/User.reducer';

// TODO: change properties in store
const reducers = combineReducers({
    user
});

export default reducers;