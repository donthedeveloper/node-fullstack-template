import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {resetSignupState, setSignupEmail, setSignupErrorMessage, setSignupPassword} from './Signup.actions';
import {setUser} from '../User.actions';

class Signup extends Component {
    componentDidMount = () => {
        if (!this.props.user) {
            this.updateStoreWithUser();
        }
    }

    handleOnEmailChange = (e) => {
        this.props.setSignupEmail(e.target.value);
    };

    handleOnPasswordChange = (e) => {
        this.props.setSignupPassword(e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.sendSignupData(e);
    }

    redirectWhenLoggedIn() {
        this.props.history.push('/profile');
    }

    sendSignupData = () => {
        const {email, password} = this.props;
        axios.post('/api/user', {email, password})
            .then((res) => {
                this.updateStoreWithUser();
                this.props.resetSignupState();
            })
            .catch((err) => {
                this.props.setSignupErrorMessage(err.response.data.message);
            });
    }

    updateStoreWithUser() {
        console.log('kasdjflda');
        axios.get('/api/whoami')
            .then((res) => {
                console.log('res:', res);
                this.props.setUser(res.data.user);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        if (this.props.user) {
            return <Redirect to='/profile' />
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <p>{this.props.errorMessage}</p>
                <label htmlFor='email'>Email:</label>
                <input
                    id='email'
                    onChange={this.handleOnEmailChange}
                    required
                    type='email'
                    value={this.props.email}
                />
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    onChange={this.handleOnPasswordChange}
                    required
                    type='password'
                    value={this.props.password}
                />
                <input type='submit' value='Register' />
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.signupReducer.email,
    errorMessage: state.signupReducer.errorMessage,
    password: state.signupReducer.password,
    user: state.user
});

export default connect(mapStateToProps, {resetSignupState, setSignupEmail, setSignupErrorMessage, setSignupPassword, setUser})(Signup);