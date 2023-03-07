import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Apollo
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import Home from "./pages/Home";
import './App.css';

import Navbar from './components/Navbar';
import Mytrips from './components/MyTrips';
import Account from './components/Account';

// GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: 'graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route
              exact path="*"
              element={<Home />}
            />
            <Route
              exact path='/myTrips'
              element={<Mytrips />}
            />
            <Route
              exact path='/account'
              element={<Account />}
            />
            {/* <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            /> */}
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
