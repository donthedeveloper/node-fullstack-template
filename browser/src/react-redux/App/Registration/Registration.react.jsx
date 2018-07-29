import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setEmail, setErrorMessage, setPassword} from './Registration.actions';

class Registration extends Component {
    handleOnEmailChange = (e) => {
        this.props.setEmail(e.target.value);
    };

    handleOnPasswordChange = (e) => {
        this.props.setPassword(e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.sendRegistrationData(e);
    }

    sendRegistrationData = () => {
        const {email, password} = this.props;
        axios.post('/api/user', {email, password})
            .then((res) => {
                this.props.history.push('/api/profile');
            })
            .catch((err) => {
                this.props.setErrorMessage(err.response.data.message);
            });
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
                    required
                    type='password'
                    value={this.props.password}
                />
                <input type='submit' value='Register' />
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.loginReducer.email,
    errorMessage: state.loginReducer.errorMessage,
    password: state.loginReducer.password
});

export default connect(mapStateToProps, {setEmail, setErrorMessage, setPassword})(Registration);