import React from 'react';
import {connect} from 'react-redux';
import {Switch, Redirect} from 'react-router';
import {Link, Route} from 'react-router-dom';
import ForgotForm from './ForgotForm/ForgotForm.react';
import LoginForm from './LoginForm/LoginForm.react';
import ProfileForm from './ProfileForm/ProfileForm.react';
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

    getSnapShotBeforeUpdate = (prevProps) => {
        if (prevProps.user !== this.props.user) {
            this.updateWhenUserDoesntExist();
        }
    }

    componentDidMount() {
        this.updateWhenUserDoesntExist();
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    updateWhenUserDoesntExist() {
        if (!this.props.user) {
            this.props.updateStoreWithUser();
        }
    }

    render() {
        const user = this.props.user;
        return (
            <div>
                <ul>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>Signup</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><a href='' onClick={this.logout}>Logout</a></li>
                </ul>
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

// TODO: check user for proptypes

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {logout, updateStoreWithUser})(App);