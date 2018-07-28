import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store.jsx';

import App from './App/App.react';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/' component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);