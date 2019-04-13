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
        this.props.setProfileEmail(this.props.user.email);
    }

    componentWillUnmount = () => {
        this.props.resetProfileState();
    }

    handleInputChange = ({target: {name, value}}) => {
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {email, oldPassword, password} = this.props;
        if (password && password !== this.props.confirmPassword) {
            return this.props.pushProfileError({
                field: 'old_password',
                message: 'Passwords must match.'
            });
        }
        
        const id = this.props.user._id;
        const updatedUser = {};
        if (email) {
            updatedUser.email = email;
        }
        if (oldPassword) {
            updatedUser.oldPassword = oldPassword;
        }
        if (password) {
            updatedUser.password = password;
        }

        this.props.updateProfile({id, ...updatedUser});
    }

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

    updateProfile = () => {
        const {email, oldPassword, password} = this.state;
        axios.patch(`/api/user/${id}`, {
            email,
            old_password: oldPassword,
            password
        })
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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <ul>
                    {this.props.error.messages.map((message, i) =>
                        <li key={i}>{message}</li>
                    )}
                </ul>
                <label htmlFor='email'>Email:</label>
                <input
                    id='email'
                    name='email'
                    onChange={this.handleEmailChange}
                    required
                    type='email'
                    value={this.props.email}
                />
                <label htmlFor='oldPassword'>Old Password:</label>
                <input
                    id='oldPassword'
                    name='oldPassword'
                    onChange={this.handleOldPasswordChange}
                    required={Boolean(this.props.password)}
                    type='password'
                    value={this.props.oldPassword}
                />
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    name='password'
                    onChange={this.handlePasswordChange}
                    required={Boolean(this.props.confirmPassword)}
                    type='password'
                    value={this.props.password}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    id='confirmPassword'
                    name='confirmPassword'
                    onChange={this.handleConfirmPasswordChange}
                    required={Boolean(this.props.password)}
                    type='password'
                    value={this.props.confirmPassword}
                />
                <input type='submit' value='Update' />
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {updateStoreWithUser})(ProfileForm);