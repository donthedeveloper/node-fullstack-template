import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authenticate, setLoginEmail, setLoginPassword} from './Login.actions';
import {updateStoreWithUser} from '../User.actions';

class Login extends Component {

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
    // TODO: check action creators attached to props
};

const mapStateToProps = (state) => ({
    email: state.loginReducer.email,
    errorMessage: state.loginReducer.errorMessage,
    password: state.loginReducer.password,
    user: state.user
});

export default connect(mapStateToProps, {authenticate, setLoginEmail, setLoginPassword, updateStoreWithUser})(Login);