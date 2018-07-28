import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login.react';
import Sample from './Sample/Sample.react';

const App = (props) => {
    return (
        <Fragment>
            <Route exact path='/' component={Sample} />
            <Route path={`/login`} component={Login} />
            {/* <Route path={`/registration`} component={Registration} /> */}
        </Fragment>
    );
};

export default App;