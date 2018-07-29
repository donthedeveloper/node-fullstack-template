import React from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login.react';
import Signup from './Signup/Signup.react';

const App = (props) => {
    return (
        <div>
            <Route exact path='/' component={null} />
            <Route path={`/login`} component={Login} />
            <Route path={`/signup`} component={Signup} />
        </div>
    );
};

export default App;