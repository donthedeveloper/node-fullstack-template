import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Redirect} from 'react-router';
import {Route} from 'react-router-dom';
import Login from './Login/Login.react';
import Profile from './Profile/Profile.react';
import Signup from './Signup/Signup.react';
import {updateStoreWithUser} from './User.actions';

const AuthenticatedRoute = ({isAllowed, ...props}) =>
    isAllowed
        ? <Route {...props} />
        : <Redirect to='/login' />;

const UnauthenticatedRoute = ({isAllowed, ...props}) =>
    isAllowed
        ? <Route {...props} />
        : <Redirect to='/profile' />;

class App extends Component {
    componentDidMount() {
        if (!this.props.user) {
            this.props.updateStoreWithUser();
        }
    }

    render() {
        const user = this.props.user;
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={null} />
                    <UnauthenticatedRoute
                        isAllowed={!user}
                        path='/login'
                        component={Login}
                    />
                    <UnauthenticatedRoute
                        isAllowed={!user}
                        path='/signup'
                        component={Signup}
                    />
                    <AuthenticatedRoute
                        isAllowed={user}
                        path='/profile'
                        component={Profile}
                    />
                </Switch>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {updateStoreWithUser})(App);