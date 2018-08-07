import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {updateStoreWithUser} from '../User.actions';

class Profile extends Component {
    
    // TODO: create tickets for these things
    // TODO: create handles for changing inputs
    // TODO: set up custom frontend validation for confirm password
    // TODO: set up /user GET route
    // TODO: set up backend validation error to be stored in frontend
    // TODO: set up success message
    // TODO: write tests for /whoami GET route
    // TODO: write tests for /user GET route
    // TODO: sketch stream of signup/login/profile pages
    // TODO: style components!
    // TODO: create custom validation messages that are friendlier
    // TODO: update friendlier messages in what we test

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
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
                    type='password'
                    value={this.props.password}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    id='confirmPassword'
                    onChange={this.handleOnConfirmPasswordChange}
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

export default connect(mapStateToProps, {updateStoreWithUser})(Profile);