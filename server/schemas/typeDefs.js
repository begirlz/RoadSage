const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedTrips: [Trip]
    tripCount: Int
  }

  type Trip {
    tripId: ID
    title: String
    description: String
    origin: String
    destination: String
    time: String
    date: String
  }

  input SavedTripInput {
    tripId: ID
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
    users: [User]
    user(username: String!): User
    trips: [Trip]
  }
  type Query {
    me: User
}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveTrip(trip: SavedTripInput): User
    removeTrip(tripId: String!): User
  }
`;

module.exports = typeDefs;
