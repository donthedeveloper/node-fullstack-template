import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {updateStoreWithUser} from '../User.actions';

class Profile extends Component {
    componentDidMount = async () => {
        if (!this.props.user) {
            // TODO: possibly add option callback parameter to updateStoreWithUser function to redirect on empty user
            await this.props.updateStoreWithUser();
            if (!this.props.user) {
                this.props.history.push('/login');
            }
        }
    }

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