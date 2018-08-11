import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {updateStoreWithUser} from '../User.actions';
import {resetProfileErrorMessage, setProfileConfirmPassword, setProfileEmail, setProfileErrorMessage, setProfilePassword, updateProfile} from './Profile.actions';

class Profile extends Component {
    
    // TODO: sketch stream of signup/login/profile pages
    // TODO: style components!

    componentDidMount = () => {
        this.props.setProfileEmail(this.props.user.email);
    }

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
        if (password && password !== this.props.confirmPassword) {
            this.props.setProfileErrorMessage('Passwords must match.');
        }
        // TODO: reset profile error message, as well as password/confirm password on successful update
        // this.props.resetProfileErrorMessage();
        console.log('id:', this.props.user._id);
        this.props.updateProfile(this.props.user._id, this.props.email, this.props.password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>{this.props.errorMessage}</p>
                <label htmlFor='email'>Email:</label>
                <input
                    id='email'
                    onChange={this.handleEmailChange}
                    // required
                    // type='email'
                    value={this.props.email}
                />
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    onChange={this.handlePasswordChange}
                    // required={Boolean(this.props.confirmPassword)}
                    type='password'
                    value={this.props.password}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    id='confirmPassword'
                    onChange={this.handleConfirmPasswordChange}
                    // required={Boolean(this.props.password)}
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

export default connect(
    mapStateToProps,
    {
        resetProfileErrorMessage,
        setProfileConfirmPassword,
        setProfileEmail,
        setProfileErrorMessage,
        setProfilePassword,
        updateProfile,
        updateStoreWithUser
    }
)(Profile);