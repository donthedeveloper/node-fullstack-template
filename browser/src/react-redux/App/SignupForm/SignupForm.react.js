import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resetSignupState, sendSignupData, setSignupConfirmPassword, setSignupEmail, setSignupError, setSignupPassword} from './SignupForm.actions';

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
            // TODO: make this utility function for creating errors
            this.props.setSignupError({
                message: 'Passwords must match.'
            });
            return;
        }

        this.props.sendSignupData(this.props.email, this.props.password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <ul>
                    {this.props.error.messages.map((message, i) =>
                        <li key={i}>{message}</li>
                    )}
                </ul>
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
    error: PropTypes.shape({
        fields: PropTypes.array.isRequired,
        messages: PropTypes.array.isRequired 
      }).isRequired,
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
    setSignupError: PropTypes.func.isRequired,
    setSignupPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // signup state
    confirmPassword: state.signupForm.confirmPassword,
    email: state.signupForm.email,
    error: state.signupForm.error,
    password: state.signupForm.password,
    // user state
    user: state.user
});

export default connect(
    mapStateToProps,
    {resetSignupState, sendSignupData, setSignupConfirmPassword, setSignupEmail, setSignupError, setSignupPassword}
)(SignupForm);