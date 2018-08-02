import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {setUser} from '../User.actions';

class Profile extends Component {
    componentDidMount = () => {
        if (!this.props.user) {
            this.updateStoreWithUser();
        }
    }

    updateStoreWithUser() {
        axios.get('/api/whoami')
            .then((res) => {
                this.props.setUser(res.data.user);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                this.props.history.push('/login');
            });
    }

    render() {
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
                <input type='submit' value='Login' />
            </form>
        );
    }
}

Profile.propTypes = {
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
    // email: state.loginReducer.email,
    // errorMessage: state.loginReducer.errorMessage,
    // password: state.loginReducer.password,
    user: state.user
});

export default connect(mapStateToProps, {setUser})(Profile);