import axios from 'axios';

const SET_USER = 'SET_USER';

const _setUser = (user) => ({
    type: SET_USER,
    user
});

export const updateStoreWithUser = (user) =>
    dispatch => {
        if (user) {
            return dispatch(_setUser(user));
        }
        return axios.get('/api/whoami')
            .then((response) => dispatch(_setUser(response.data.user)))
            .catch((error) => console.error(error))
    }

export const logout = () =>
    dispatch =>
        axios.get('/api/logout')
            .then(() => {
                dispatch(updateStoreWithUser());
            })
            .catch((err) => {
                console.error(err);
            });