import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {updateStoreWithUser} from '../User.actions';

class LoginForm extends Component {

    state = {
        email: '',
        genericError: '',
        password: ''
    };

    handleInputChange = ({target: {name, value}}) => {
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.login();
    };

    login = () => {
        const {email, password} = this.state;
        axios.post('/api/login', {email, password})
            .then((response) => {
                // this.props.updateStoreWithUser(response.data.user);
            })
            .catch((error) => {
                this.setState({
                    genericError: error.response.data.error.message
                });
            });
    };

    render() {
        const {genericError} = this.state;
        return (
            <div className='login'>
                <form
                    className='login-form'
                    onSubmit={this.handleSubmit}
                >
                    {genericError &&
                        <p>{genericError}</p>
                    }

                    <label className='login-form__label' htmlFor='email'>
                        Email:
                    </label>
                    <input
                        className='login-form__input'
                        id='email'
                        name='email'
                        onChange={this.handleInputChange}
                        placeholder='Email'
                        required
                        type='email'
                        value={this.props.email}
                    />

                    <label className='login-form__label' htmlFor='password'>
                        Password:
                    </label>
                    <input
                        className='login-form__input'
                        id='password'
                        name='password'
                        onChange={this.handleInputChange}
                        placeholder='Password'
                        // required
                        type='password'
                        value={this.props.password}
                    />

                    <input
                        className='login-form__submit'
                        type='submit'
                        value='Log in'
                    />
                </form>
                <Link className='login__link' to='/forgot'>Forgot Password</Link>
            </div>
        );
    }
}

export default LoginForm;