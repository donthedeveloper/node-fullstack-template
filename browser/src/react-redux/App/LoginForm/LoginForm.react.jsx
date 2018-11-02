import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {authenticate, resetLoginState, setLoginEmail, setLoginPassword} from './LoginForm.actions';

class LoginForm extends Component {

    componentWillUnmount = () => {
        this.props.resetLoginState();
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
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <ul>
                        {this.props.error.messages.map((message, i) =>
                            <li key={i}>{message}</li>
                        )}
                    </ul>
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
                <Link to='/forgot'>Forgot Password</Link>
            </div>
        );
    }
}

LoginForm.propTypes = {
    // login state
    email: PropTypes.string,
    error: PropTypes.shape({
      fields: PropTypes.array.isRequired,
      messages: PropTypes.array.isRequired 
    }).isRequired,
    password: PropTypes.string,
    // user state
    user: PropTypes.shape({
        _id: PropTypes.string,
        email: PropTypes.string,
    }),
    // login action creators
    authenticate: PropTypes.func.isRequired,
    resetLoginState: PropTypes.func.isRequired,
    setLoginEmail: PropTypes.func.isRequired,
    setLoginPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    email: state.loginForm.email,
    error: state.loginForm.error,
    password: state.loginForm.password,
    user: state.user
});

export default connect(mapStateToProps, {authenticate, resetLoginState, setLoginEmail, setLoginPassword})(LoginForm);