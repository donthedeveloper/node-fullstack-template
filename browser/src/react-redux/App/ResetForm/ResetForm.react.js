import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {changeResetFormPassword, pushResetFormError, setResetFormConfirmPassword, setResetFormPassword, verifyToken} from './ResetForm.actions';

class ResetForm extends Component {

    componentDidMount() {
        this.props.verifyToken(this.props.match.params.token);
    }

    handleConfirmPasswordChange = (e) => {
        this.props.setResetFormConfirmPassword(e.target.value);
    }

    handlePasswordChange = (e) => {
        this.props.setResetFormPassword(e.target.value);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.props.password !== this.props.confirmPassword) {
            return this.props.pushResetFormError({
                field: 'old_password',
                message: 'Passwords must match.'
            });
        }

        this.props.changeResetFormPassword(this.props.password, this.props.match.params.token);
    }

    generateInvalidTokenMessage() {
        return <p>This is an invalid token. Please go back to the <Link to='/forgot'>forgot password page</Link> and request a new token.</p>;
    }

    render() {
        if (this.props.error.messages.includes('Invalid or expired token.')) {
            return this.generateInvalidTokenMessage();
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <ul>
                    {this.props.error.messages.map((message, i) =>
                        <li key={i}>{message}</li>
                    )}
                </ul>
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    onChange={this.handlePasswordChange}
                    required
                    type='password'
                    value={this.props.password}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    id='confirmPassword'
                    onChange={this.handleConfirmPasswordChange}
                    required
                    type='password'
                    value={this.props.confirmPassword}
                />
                <input type='submit' value='Update' />
            </form>
        )
    }
}

ResetForm.propTypes = {
    // profile state
    error: PropTypes.shape({
        fields: PropTypes.array.isRequired,
        messages: PropTypes.array.isRequired
    }).isRequired,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    // profile action creators
    changeResetFormPassword: PropTypes.func.isRequired,
    pushResetFormError: PropTypes.func.isRequired,
    setResetFormConfirmPassword: PropTypes.func.isRequired,
    setResetFormPassword: PropTypes.func.isRequired,
    verifyToken: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    confirmPassword: state.resetForm.confirmPassword,
    error: state.resetForm.error,
    password: state.resetForm.password
});

export default connect(
    mapStateToProps,
    {changeResetFormPassword, pushResetFormError, setResetFormConfirmPassword, setResetFormPassword, verifyToken})
(ResetForm);