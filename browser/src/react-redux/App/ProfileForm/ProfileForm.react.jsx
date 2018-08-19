import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {resetProfileState, setProfileConfirmPassword, setProfileEmail, setProfileError, setProfilePassword, updateProfile} from './ProfileForm.actions';

class ProfileForm extends Component {

    componentDidMount = () => {
        this.props.setProfileEmail(this.props.user.email);
    }

    componentWillUnmount = () => {
        this.props.resetProfileState();
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
        this.props.updateProfile(this.props.user._id, this.props.email, this.props.password);
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

ProfileForm.propTypes = {
    // profile state
    email: PropTypes.string,
    error: PropTypes.shape({
        fields: PropTypes.array.isRequired,
        messages: PropTypes.array.isRequired
    }).isRequired,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    // user state
    user: PropTypes.shape({
        _id: PropTypes.string,
        email: PropTypes.string
    }),
    // profile action creators
    resetProfileState: PropTypes.func.isRequired,
    setProfileConfirmPassword: PropTypes.func.isRequired,
    setProfileEmail: PropTypes.func.isRequired,
    setProfileError: PropTypes.func.isRequired,
    setProfilePassword: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    // profile state
    email: state.profileForm.email,
    error: state.profileForm.error,
    password: state.profileForm.password,
    confirmPassword: state.profileForm.confirmPassword,
    // user state
    user: state.user
});

export default connect(
    mapStateToProps,
    {resetProfileState, setProfileConfirmPassword, setProfileEmail, setProfileError, setProfilePassword, updateProfile}
)(ProfileForm);