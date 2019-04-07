import {combineReducers} from 'redux';
import profileForm from './App/ProfileForm/ProfileForm.reducer';
import resetForm from './App/ResetForm/ResetForm.reducer';
import user from './App/User.reducer';

// TODO: change properties in store
const reducers = combineReducers({
    profileForm,
    resetForm,
    user
});

export default reducers;