import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setEmail, setErrorMessage, setPassword} from './Login.actions';
import {setUser} from '../User.actions';

class Login extends Component {
    // componentDidMount = () => {
    //     const user = this.props.user;
    //     if (user) {
    //         this.redirectWhenLoggedIn();
    //     }
    // }

    authenticate = () => {
        const {email, password} = this.props;
        axios.post('/api/login', {email, password})
            .then(() => {
                // TODO: make get whoami call and redirect after
                this.redirectWhenLoggedIn();
            })
            .catch((err) => {
                this.props.setErrorMessage(err.response.data.message);
            });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.authenticate();
    };

    handleOnEmailChange = (e) => {
        this.props.setEmail(e.target.value);
    };

    handleOnPasswordChange = (e) => {
        this.props.setPassword(e.target.value);
    };

    redirectWhenLoggedIn() {
        this.props.history.push('/profile');
    }

    render() {
        // TODO: <Redirect> if user object is populated with ID
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

const mapStateToProps = (state) => ({
    email: state.loginReducer.email,
    errorMessage: state.loginReducer.errorMessage,
    password: state.loginReducer.password,
    user: state.user
});

export default connect(mapStateToProps, {setEmail, setErrorMessage, setPassword, setUser})(Login);