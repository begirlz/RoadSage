const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Trip {
    tripId: String
    location: String
    title: String
  }

  input SavedTripInput {
    tripId: String
    location: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
  }
  type Query {
    me: User
}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveTrip(trip: SavedTripInput!, tripId: String!, locations: String!, title: String!): User
    removeTrip(tripId: String!): User
  }
`;

module.exports = typeDefs;
