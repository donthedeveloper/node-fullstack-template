import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setResetFormConfirmPassword, setResetFormPassword} from './ResetForm.actions';

class ResetForm extends Component {

    handleConfirmPasswordChange(e) {
        this.props.setResetFormConfirmPassword(e.target.value);
    }

    handlePasswordChange(e) {
        this.props.setResetFormPassword(e.target.value);
    }
    
    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    confirmPassword: state.resetForm.confirmPassword,
    password: state.resetForm.password
});

export default connect(mapStateToProps, {setResetFormConfirmPassword, setResetFormPassword})(ResetForm);