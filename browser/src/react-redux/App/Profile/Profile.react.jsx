import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {updateStoreWithUser} from '../User.actions';
import {resetProfileErrorMessage, setProfileConfirmPassword, setProfileEmail, setProfileErrorMessage, setProfilePassword} from './Profile.actions';

class Profile extends Component {
    
    // TODO: create tickets for these things
    // TODO: carry over confirm password to signup page
    // TODO: set up prop types for action creators attached to props
    // TODO: set up friendly property names for reducers that we combine
    // TODO: set up /user GET route
    // TODO: set up backend validation error to be stored in frontend
    // TODO: set up success message
    // TODO: write tests for /whoami GET route
    // TODO: write tests for /user GET route
    // TODO: sketch stream of signup/login/profile pages
    // TODO: style components!
    // TODO: create custom validation messages that are friendlier
    // TODO: update friendlier messages in what we test

    handleConfirmPasswordChange = (e) => {
        this.props.setProfileConfirmPassword(e.target.value);
    }

    handleEmailChange = (e) => {
        this.props.setProfileEmail(e.target.value);
    };

    handlePasswordChange = (e) => {
        this.props.setProfilePassword(e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const password = this.props.password;
        const confirmPassword = this.props.confirmPassword;
        if (password && password !== confirmPassword) {
            this.props.setProfileErrorMessage('Passwords must match.');
        } else {
            this.props.resetProfileErrorMessage();
        }
        // this.props.sendProfileData(this.props.email, this.props.password);
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
                    required={Boolean(this.props.confirmPassword)}
                    type='password'
                    value={this.props.password}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    id='confirmPassword'
                    onChange={this.handleConfirmPasswordChange}
                    required={Boolean(this.props.password)}
                    type='password'
                    value={this.props.confirmPassword}
                />
                <input type='submit' value='Update' />
            </form>
        );
    }
}

Profile.propTypes = {
    email: PropTypes.string,
    errorMessage: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    user: PropTypes.shape({
        _id: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    email: state.profileReducer.email,
    errorMessage: state.profileReducer.errorMessage,
    password: state.profileReducer.password,
    confirmPassword: state.profileReducer.confirmPassword,
    user: state.user
});

export default connect(mapStateToProps, {resetProfileErrorMessage, setProfileConfirmPassword, setProfileEmail, setProfileErrorMessage, setProfilePassword, updateStoreWithUser})(Profile);