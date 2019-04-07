import {combineReducers} from 'redux';
import profileForm from './App/ProfileForm/ProfileForm.reducer';
import user from './App/User.reducer';

// TODO: change properties in store
const reducers = combineReducers({
    profileForm,
    user
});

export default reducers;