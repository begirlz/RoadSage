const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedlist: [Trip]
    tripCount: Int
  }

  type Trip {
    tripId: String
    title: String
    description: String
    origin: String
    destination: String
    time: Int
    date: Int
  }

  input SavedTripInput {
    tripId: String
    title: String
    description: String
    origin: String
    destination: String
    time: Int
    date: Int
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
    saveTrip(trip: SavedTripInput!, time: Int!, date: Int!, tripId: String!,description: String!, origin: String!, title: String!): User
    removeTrip(tripId: String!): User
  }
`;

module.exports = typeDefs;
