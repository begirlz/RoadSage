const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    savedTrips: [Trip]
    tripCount: Int
  }

  type Trip {
    tripId: ID!
    title: String
    description: String
    origin: String
    destination: String
    time: String
    date: String
  }

  input SavedTripInput {
    title: String
    description: String
    origin: String
    destination: String
    time: String
    date: String
  }

  input UpdateTripInput {
    tripId: ID!
    title: String
    description: String
    origin: String
    destination: String
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
    saveTrip(tripData: SavedTripInput): User
    removeTrip(tripId: ID!): User
    updateTrip(trip: UpdateTripInput): User
  }
`;

module.exports = typeDefs;
