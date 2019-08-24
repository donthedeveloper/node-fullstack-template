import ApolloClient from 'apollo-client';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom';
import App from './App/App.react';
import './index.scss';

const client = new ApolloClient({});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Route path='/' component={App} />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('app')
);