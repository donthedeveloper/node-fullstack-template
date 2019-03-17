import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import './index.scss';

import App from './App/App.react';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/' component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);