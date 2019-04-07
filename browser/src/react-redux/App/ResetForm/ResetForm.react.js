import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateStoreWithUser} from '../User.actions';

class ResetForm extends Component {

    state = {
        confirmPassword: '',
        fieldErrors: {},
        genericError: '',
        password: '',
        tokenIsValid: false
    };

    componentDidMount() {
        this.verifyToken();
    }

    changePassword() {
        axios.post(`/api/reset/${this.props.match.params.token}`, {password: this.state.password})
            .then(() => {
                this.setState({
                    confirmPassword: '',
                    password: ''
                });
                this.props.updateStoreWithUser();
            })
            .catch((error) => {
                const errorBody = error.response.data.error;
                if (error.response.status === 400) {
                    const fieldErrors = errorBody.errors;
                    if (fieldErrors) {
                        const fieldErrorsState = Object.entries(fieldErrors).reduce((fieldErrorsState, [fieldName, fieldError]) => {
                            fieldErrorsState[fieldName] = fieldError.message;
                            return fieldErrorsState;
                        }, {});
                        this.updateFieldErrors(fieldErrorsState);
                    }
                }
                this.setState({
                    genericError: errorBody.message
                });
            })
    }

    generateInvalidTokenMessage() {
        return (
            <p>
                This is an invalid token. Please go back to the <Link to='/forgot'>forgot password page</Link> and request a new token.
            </p>
        );
    }

    handleInputChange = ({target: {name, value}}) => {
        this.setState({
            [name]: value,
        });
        this.updateFieldErrors({
            [name]: ''
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {confirmPassword, password} = this.state;
        const passwordsMatch = password === confirmPassword;
        const fieldErrors = {};
        if (password && !passwordsMatch) {
            this.updateFieldErrors({
                confirmPassword: 'Passwords must match'
            })
        } else {
            this.setState({fieldErrors}, () => this.changePassword());
        }
    }

    updateFieldErrors(fieldErrors) {
        this.setState({
            fieldErrors: {
                ...this.state.fieldErrors,
                ...fieldErrors
            }
        })
    }

    verifyToken() {
        axios.get(`/api/reset/${this.props.match.params.token}`)
            .then(() => {
                this.setState({
                    tokenIsValid: true
                });
            });
    }

    render() {
        if (!this.state.tokenIsValid) {
            return this.generateInvalidTokenMessage();
        }
        
        const {confirmPassword, fieldErrors, password} = this.state;
        const confirmPasswordError = fieldErrors.confirmPassword;
        const passwordError = fieldErrors.password;
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    name='password'
                    onChange={this.handleInputChange}
                    required
                    type='password'
                    value={password}
                />
                {passwordError &&
                    <p>{passwordError}</p>
                }

                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    id='confirmPassword'
                    name='confirmPassword'
                    onChange={this.handleInputChange}
                    required
                    type='password'
                    value={confirmPassword}
                />
                {confirmPasswordError &&
                    <p>{confirmPasswordError}</p>
                }

                <input type='submit' value='Update' />
            </form>
        );
    }
}

export default connect(null, {updateStoreWithUser})(ResetForm);