import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
// import "rsuite/dist/styles/rsuite-default.css";

const client = new ApolloClient({
  link: new HttpLink({
    // uri: `"${process.env.REACT_APP_GITHUB_URL}"`,
    uri: `${process.env.REACT_APP_GITHUB_API_URL}`,
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
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
  document.getElementById("root")
);
