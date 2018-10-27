import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {changeResetFormPassword, setResetFormConfirmPassword, setResetFormPassword} from './ResetForm.actions';

class ResetForm extends Component {

    handleConfirmPasswordChange = (e) => {
        this.props.setResetFormConfirmPassword(e.target.value);
    }

    handlePasswordChange = (e) => {
        this.props.setResetFormPassword(e.target.value);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.changeResetFormPassword(this.props.password, this.props.match.params.token);
    }

    render() {
        // todo: error message when there is no token, instead?
        // if (!this.props.match.params.token) {
        //     return <Redirect to='/forgot' />;
        // }

        return (
            <form onSubmit={this.handleSubmit}>
                {/* <ul>
                    {this.props.error.messages.map((message, i) =>
                        <li key={i}>{message}</li>
                    )}
                </ul> */}
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    onChange={this.handlePasswordChange}
                    required={Boolean(this.props.confirmPassword)}
                    type='password'
                    value={this.props.password}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    id='confirmPassword'
                    onChange={this.handleConfirmPasswordChange}
                    required={Boolean(this.props.password)}
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
    setResetFormConfirmPassword: PropTypes.func.isRequired,
    setResetFormPassword: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    confirmPassword: state.resetForm.confirmPassword,
    error: state.resetForm.error,
    password: state.resetForm.password
});

export default connect(mapStateToProps, {changeResetFormPassword, setResetFormConfirmPassword, setResetFormPassword})(ResetForm);