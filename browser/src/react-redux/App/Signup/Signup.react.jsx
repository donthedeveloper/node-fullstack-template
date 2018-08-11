import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendSignupData, setSignupConfirmPassword, setSignupEmail, setSignupErrorMessage, setSignupPassword} from './Signup.actions';
import {updateStoreWithUser} from '../User.actions';

class Signup extends Component {

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

Signup.propTypes = {
    confirmPassword: PropTypes.string,
    email: PropTypes.string,
    errorMessage: PropTypes.string,
    password: PropTypes.string,
    user: PropTypes.shape({
        _id: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string
    })
    // TODO: check action creators attached to props
};

const mapStateToProps = (state) => ({
    confirmPassword: state.signupReducer.confirmPassword,
    email: state.signupReducer.email,
    errorMessage: state.signupReducer.errorMessage,
    password: state.signupReducer.password,
    user: state.user
});

export default connect(mapStateToProps, {sendSignupData, setSignupConfirmPassword, setSignupEmail, setSignupErrorMessage, setSignupPassword, updateStoreWithUser})(Signup);