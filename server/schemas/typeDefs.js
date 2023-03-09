const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: String
    username: String
    email: String
    password: String
    savedTrips: [Trip]
    tripCount: Int
  }

  type Trip {
    tripId: String
    title: String
    description: String
    origin: String
    destination: String
    time: String
    date: String
  }

  input SavedTripInput {
    tripId: String
    title: String
    description: String
    origin: String
    destination: String
    time: String
    date: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getMe: User
    getTrips(_id: String!): [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveTrip(trip: SavedTripInput): User
    removeTrip(tripId: String!): User
    updateTrip(tripId: String!): User
  }
`;

module.exports = typeDefs;
