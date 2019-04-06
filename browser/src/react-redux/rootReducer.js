import {combineReducers} from 'redux';
import forgotForm from './App/ForgotForm/ForgotForm.reducer';
import profileForm from './App/ProfileForm/ProfileForm.reducer';
import resetForm from './App/ResetForm/ResetForm.reducer';
import user from './App/User.reducer';

// TODO: change properties in store
const reducers = combineReducers({
    forgotForm,
    profileForm,
    resetForm,
    user
});

export default reducers;