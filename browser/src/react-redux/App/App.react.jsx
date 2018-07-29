import React from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login.react';
import Registration from './Registration/Registration.react';

const App = (props) => {
    return (
        <div>
            <Route exact path='/' component={null} />
            <Route path={`/login`} component={Login} />
            <Route path={`/register`} component={Registration} />
        </div>
    );
};

export default App;