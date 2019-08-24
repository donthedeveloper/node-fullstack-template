import React from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../User.actions';

const Navigation = ({logout, user}) => (
    <nav>
        <ul>
            {!user &&
                <>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>Signup</Link></li>
                </>
            }
            {user &&
                <>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><button onClick={logout}>Logout</button></li>
                </>
            }
        </ul>
    </nav>
);

const mapStateToProps = state => ({
    user: state.user
});

export default Navigation;