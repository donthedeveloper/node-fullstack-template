import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {requestToken, resetForgotForm, setForgotFormEmail} from './ForgotForm.actions';

class ForgotForm extends Component {

    componentWillUnmount() {
        this.props.resetForgotForm();
    }

    handleEmailChange = (e) => {
        this.props.setForgotFormEmail(e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.requestToken();
    }

    generateForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    onChange={this.handleEmailChange}
                    type='email'
                />
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
            // TODO: build out state check and reset component
            <div>
                {
                    this.props.emailSent
                        ? this.generateSuccessMessage()
                        : this.generateForm()
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.forgotForm.email,
    emailSent: state.forgotForm.emailSent
});

export default connect(mapStateToProps, {requestToken, resetForgotForm, setForgotFormEmail})(ForgotForm);