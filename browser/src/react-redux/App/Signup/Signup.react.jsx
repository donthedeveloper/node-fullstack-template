import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {sendSignupData, setSignupEmail, setSignupPassword} from './Signup.actions';
import {updateStoreWithUser} from '../User.actions';

class Signup extends Component {
    componentDidMount = () => {
        if (!this.props.user) {
            this.props.updateStoreWithUser();
        }
    }

    handleOnEmailChange = (e) => {
        this.props.setSignupEmail(e.target.value);
    };

    handleOnPasswordChange = (e) => {
        this.props.setSignupPassword(e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendSignupData(this.props.email, this.props.password);
    }

    render() {
        if (this.props.user) {
            return <Redirect to='/profile' />
        }

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

Signup.propTypes = {
    email: PropTypes.string,
    errorMessage: PropTypes.string,
    password: PropTypes.string,
    user: PropTypes.shape({
        _id: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    email: state.signupReducer.email,
    errorMessage: state.signupReducer.errorMessage,
    password: state.signupReducer.password,
    user: state.user
});

export default connect(mapStateToProps, {sendSignupData, setSignupEmail, setSignupPassword, updateStoreWithUser})(Signup);