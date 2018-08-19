import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resetSignupState, sendSignupData, setSignupConfirmPassword, setSignupEmail, setSignupErrorMessage, setSignupPassword} from './SignupForm.actions';

class SignupForm extends Component {

    componentWillUnmount = () => {
        this.props.resetSignupState();
    }

    handleConfirmPasswordChange = (e) => {
        this.props.setSignupConfirmPassword(e.target.value);
    }

    handleEmailChange = (e) => {
        this.props.setSignupEmail(e.target.value);
    };

    handlePasswordChange = (e) => {
        this.props.setSignupPassword(e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const password = this.props.password;
        if (password && password !== this.props.confirmPassword) {
            this.props.setSignupErrorMessage('Passwords must match.');
            return;
        }

        this.props.sendSignupData(this.props.email, this.props.password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>{this.props.errorMessage}</p>
                <label htmlFor='email'>Email:</label>
                <input
                    id='email'
                    onChange={this.handleEmailChange}
                    required
                    type='email'
                    value={this.props.email}
                />
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    onChange={this.handlePasswordChange}
                    required
                    type='password'
                    value={this.props.password}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    id='confirmPassword'
                    onChange={this.handleConfirmPasswordChange}
                    required
                    type='password'
                    value={this.props.confirmPassword}
                />
                <input type='submit' value='Register' />
            </form>
        );
    }
}

SignupForm.propTypes = {
    // signup state
    confirmPassword: PropTypes.string,
    email: PropTypes.string,
    errorMessage: PropTypes.string,
    password: PropTypes.string,
    // user state
    user: PropTypes.shape({
        _id: PropTypes.string,
        email: PropTypes.string
    }),
    // signup action creators
    resetSignupState: PropTypes.func.isRequired,
    sendSignupData: PropTypes.func.isRequired,
    setSignupConfirmPassword: PropTypes.func.isRequired,
    setSignupEmail: PropTypes.func.isRequired,
    setSignupErrorMessage: PropTypes.func.isRequired,
    setSignupPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // signup state
    confirmPassword: state.signupForm.confirmPassword,
    email: state.signupForm.email,
    errorMessage: state.signupForm.errorMessage,
    password: state.signupForm.password,
    // user state
    user: state.user
});

export default connect(
    mapStateToProps,
    {resetSignupState, sendSignupData, setSignupConfirmPassword, setSignupEmail, setSignupErrorMessage, setSignupPassword}
)(SignupForm);