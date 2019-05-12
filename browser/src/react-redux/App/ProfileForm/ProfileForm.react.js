import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {updateStoreWithUser} from '../User.actions';

class ProfileForm extends Component {

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
        oldPassword: '',
        password: '',
    }

    componentDidMount = () => {
        const user = this.props.user;
        if (user) {
            this.setState({
                email: user.email
            });
        }
    }

    handleInputChange = ({target: {name, value}}) => {
        this.setState({
            [name]: value,
        });
        this.updateFieldErrors({
            [name]: ''
        });
    };

    // handleSubmit = (e) => {
    //     e.preventDefault();

    //     const {email, oldPassword, password} = this.props;
    //     if (password && password !== this.props.confirmPassword) {
    //         return this.props.pushProfileError({
    //             field: 'old_password',
    //             message: 'Passwords must match.'
    //         });
    //     }
        
    //     const id = this.props.user._id;
    //     const updatedUser = {};
    //     if (email) {
    //         updatedUser.email = email;
    //     }
    //     if (oldPassword) {
    //         updatedUser.oldPassword = oldPassword;
    //     }
    //     if (password) {
    //         updatedUser.password = password;
    //     }

    //     this.props.updateProfile({id, ...updatedUser});
    // }

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
            this.setState({fieldErrors}, () => this.updateProfile());
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

    updateProfile = () => {
        const {email, oldPassword, password} = this.state;

        const updatedUser = {};
        if (email !== this.props.user.email) {
            updatedUser.email = email;
        }
        if (oldPassword) {
            updatedUser.oldPassword = oldPassword;
        }
        if (password) {
            updatedUser.password = password;
        }
        console.log('user:', this.props.user);
        axios.patch(`/api/user/${this.props.user._id}`, updatedUser)
            .then(({data}) => {
                this.props.updateStoreWithUser(data.user);
                this.setState({
                    confirmPassword: '',
                    fieldErrors: {},
                    oldPassword: '',
                    password: ''
                });
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
                    } else {
                        this.setState({
                            genericError: errorBody.message
                        });
                    }
                }
            })
    }

    render() {
        const {email, confirmPassword, oldPassword, password} = this.state;
        const {fieldErrors, genericError} = this.state;
        const confirmPasswordError = fieldErrors.confirmPassword;
        const emailError = fieldErrors.email;
        const oldPasswordError = fieldErrors.old_password;
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
                    // required
                    type='email'
                    value={email}
                />
                {emailError && <p>{emailError}</p>}

                <label htmlFor='oldPassword'>Old Password:</label>
                <input
                    id='oldPassword'
                    name='oldPassword'
                    onChange={this.handleInputChange}
                    // required={Boolean(password)}
                    type='password'
                    value={oldPassword}
                />
                {oldPasswordError && <p>{oldPasswordError}</p>}

                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    name='password'
                    onChange={this.handleInputChange}
                    // required={Boolean(confirmPassword)}
                    type='password'
                    value={password}
                />
                {passwordError && <p>{passwordError}</p>}

                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    id='confirmPassword'
                    name='confirmPassword'
                    onChange={this.handleInputChange}
                    // required={Boolean(password)}
                    type='password'
                    value={confirmPassword}
                />
                {confirmPasswordError && <p>{confirmPasswordError}</p>}

                <input type='submit' value='Update' />
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {updateStoreWithUser})(ProfileForm);