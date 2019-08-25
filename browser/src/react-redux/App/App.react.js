import PropTypes from 'prop-types';
import React from 'react';
import {Switch, Redirect} from 'react-router';
import {Route} from 'react-router-dom';
import ForgotForm from './ForgotForm/ForgotForm.react';
import LoginForm from './LoginForm/LoginForm.react';
import Navigation from './Navigation/Navigation.react';
import ProfileForm from './ProfileForm/ProfileForm.react';
import ResetForm from './ResetForm/ResetForm.react';
import SignupForm from './SignupForm/SignupForm.react';
import {logout, updateStoreWithUser} from './User.actions';

const AuthenticatedRoute = ({isAllowed, ...props}) =>
    isAllowed
        ? <Route {...props} />
        : <Redirect to='/login' />;

const UnauthenticatedRoute = ({isAllowed, ...props}) =>
    isAllowed
        ? <Route {...props} />
        : <Redirect to='/profile' />;

class App extends React.Component {

    static propTypes = {
        user: PropTypes.shape({
            _id: PropTypes.string,
            email: PropTypes.string
        })
    };

    componentDidMount() {
        // this.props.updateStoreWithUser();
    }

    render() {
        const user = this.props.user;
        return (
            <div>
                <Navigation />
                <Switch>
                    <Route exact path='/' component={null} />
                    <UnauthenticatedRoute
                        isAllowed={!user}
                        path='/login'
                        component={LoginForm}
                    />
                    <UnauthenticatedRoute
                        isAllowed={!user}
                        path='/signup'
                        component={SignupForm}
                    />
                    <UnauthenticatedRoute
                        isAllowed={!user}
                        path='/forgot'
                        component={ForgotForm}
                    />
                    <UnauthenticatedRoute
                        isAllowed={!user}
                        path='/reset/:token?'
                        component={ResetForm}
                    />
                    <AuthenticatedRoute
                        isAllowed={user}
                        path='/profile'
                        component={ProfileForm}
                    />
                </Switch>
            </div>
        );
    }
};

export default App;