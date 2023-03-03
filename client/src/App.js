import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Apollo
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import Home from "./pages/Home";
import './App.css';

import Navbar from './components/Navbar';

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
            {/* <Route
              exact path='/'
              element={<SearchBooks />}
            />
            <Route
              exact path='/saved'
              element={<SavedBooks />}
            /> */}
            {/* <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            /> */}
            <Route exact path="*" element={<Home />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
