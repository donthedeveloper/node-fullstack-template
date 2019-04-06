import axios from 'axios';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateStoreWithUser} from '../User.actions';

class SignupForm extends Component {

    static propTypes = {
        user: PropTypes.shape({
            _id: PropTypes.string,
            email: PropTypes.string
        })
    };

    state = {
        confirmPassword: '',
        email: '',
        fieldErrors: {},
        genericError: '',
        password: '',
    };

    createUser({email, password}) {
        axios.post('/api/user', {email, password})
            .then((user) => {
                this.props.updateStoreWithUser(user);
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

        const {confirmPassword, email, password} = this.state;
        const passwordsMatch = password === confirmPassword;
        const fieldErrors = {};
        if (password && !passwordsMatch) {
            this.updateFieldErrors({
                confirmPassword: 'Passwords must match'
            })
        } else {
            this.setState({fieldErrors}, () => this.createUser({email, password}));
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

    render() {
        const {confirmPassword, email, fieldErrors, genericError, password} = this.state;
        const confirmPasswordError = fieldErrors.confirmPassword;
        const emailError = fieldErrors.email;
        const passwordError = fieldErrors.password;

        return (
            <form onSubmit={this.handleSubmit}>

                {genericError &&
                    <p>{genericError}</p>
                }

                <label htmlFor='email'>Email:</label>
                <input
                    id='email'
                    name='email'
                    onChange={this.handleInputChange}
                    required
                    type='email'
                    value={email}
                />
                {emailError &&
                    <p>{emailError}</p>
                }

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

                <input type='submit' value='Register' />
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {updateStoreWithUser})(SignupForm);