import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {authenticate, resetLoginState, setLoginEmail, setLoginErrorMessage, setLoginPassword, updateStoreWithUser} from './Login.actions';
import {setUser} from '../User.actions';

class Login extends Component {
    componentDidMount = () => {
        if (!this.props.user) {
            this.props.updateStoreWithUser();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.authenticate(this.props.email, this.props.password);
    };

    handleOnEmailChange = (e) => {
        this.props.setLoginEmail(e.target.value);
    };

    handleOnPasswordChange = (e) => {
        this.props.setLoginPassword(e.target.value);
    };

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
                <input type='submit' value='Login' />
            </form>
        );
    }
}

Login.propTypes = {
    email: PropTypes.string,
    errorMessage: PropTypes.string,
    password: PropTypes.string,
    user: PropTypes.shape({
        _id: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    email: state.loginReducer.email,
    errorMessage: state.loginReducer.errorMessage,
    password: state.loginReducer.password,
    user: state.user
});

export default connect(mapStateToProps, {authenticate, resetLoginState, setLoginEmail, setLoginErrorMessage, setLoginPassword, setUser, updateStoreWithUser})(Login);