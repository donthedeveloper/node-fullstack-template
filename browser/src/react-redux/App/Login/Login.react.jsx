import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {setEmail, setErrorMessage, setPassword} from './Login.actions';
import {setUser} from '../User.actions';

class Login extends Component {
    componentDidMount = () => {
        if (!this.props.user) {
            this.updateStoreWithUser();
        }
    }

    authenticate = () => {
        const {email, password} = this.props;
        axios.post('/api/login', {email, password})
            .then(() => {
                this.updateStoreWithUser();
            })
            .catch((err) => {
                this.props.setErrorMessage(err.response.data.message);
            });
    };

    updateStoreWithUser() {
        axios.get('/api/whoami')
            .then((res) => {
                this.props.setUser(res.data.user);
            })
            .catch((err) => {
                console.error(err);
            });
    }

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
        if (this.props.user) {
            return <Redirect to='/profile' />
        }

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