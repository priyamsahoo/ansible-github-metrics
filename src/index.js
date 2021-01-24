import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
} from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://api.github.com/graphql',
        headers: {
            Authorization: `bearer 2d7e0c081fa5d44743afde3aefd46d8ac5187bab`,
        },
    }),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
