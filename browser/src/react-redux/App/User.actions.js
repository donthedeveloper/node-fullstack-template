import axios from 'axios';

const SET_USER = 'SET_USER';

export const setUser = (user) => ({
    type: SET_USER,
    user
});

export const updateStoreWithUser = () =>
    dispatch => 
        axios.get('/api/whoami')
            .then((res) => {
                dispatch(setUser(res.data.user));
            })
            .catch((err) => {
                console.error(err);
            });

export const logout = () =>
    dispatch =>
        axios.get('/api/logout')
            .then((res) => {
                dispatch(updateStoreWithUser());
            })
            .catch((err) => {
                console.error(err);
            });