import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ForgotForm extends Component {

    state = {
        email: '',
        emailSent: false
    };

    requestToken() {
        axios.post('/api/forgot', {email: this.state.email})
            .then(() => {
                this.setState({
                    email: '',
                    emailSent: true
                });
            });
            // todo: handle blank/invalid email, needs backend work
            // todo: handle generic form error
    }

    handleInputChange = ({target: {name, value}}) => {
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.requestToken();
    }

    generateForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* todo: show generic form error */}
                <label htmlFor='email'>Email:</label>
                <input
                    id='email'
                    name='email'
                    onChange={this.handleInputChange}
                    required
                    type='email'
                    value={this.state.email}
                />
                {/* todo: bring in field specific error message once backend work is complete */}
                <input type='submit' />
            </form>
        );
    }

    generateSuccessMessage() {
        return (
            <div>
                <p>If an account with the email you provided exists, you will receive instructions to reset your password.</p>
                <Link to='/login'>Go to login page</Link>
            </div>
        );
    }

    render() {
        return (
            <div>
                {
                    this.state.emailSent
                        ? this.generateSuccessMessage()
                        : this.generateForm()
                }
            </div>
        );
    }
}

export default ForgotForm;