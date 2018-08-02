import React from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login.react';
import Profile from './Profile/Profile.react';
import Signup from './Signup/Signup.react';

const App = (props) => {
    return (
        <div>
            <Route exact path='/' component={null} />
            <Route path={`/login`} component={Login} />
            <Route path={`/profile`} component={Profile} />
            <Route path={`/signup`} component={Signup} />
        </div>
    );
};

export default App;