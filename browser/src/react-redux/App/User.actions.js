import axios from 'axios';

const SET_USER = 'SET_USER';

const _setUser = (user) => ({
    type: SET_USER,
    user
});

export const updateStoreWithUser = () =>
    dispatch => 
        axios.get('/api/whoami')
            .then((res) => {
                // todo: create option for callback and call it here
                dispatch(_setUser(res.data.user));
            })
            .catch((err) => {
                console.error(err);
            });

export const logout = () =>
    dispatch =>
        axios.get('/api/logout')
            .then(() => {
                dispatch(updateStoreWithUser());
            })
            .catch((err) => {
                console.error(err);
            });