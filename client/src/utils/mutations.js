import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_TRIP = gql`
    mutation saveTrip($tripData: SavedTripInput) {
        saveTrip(tripData: $tripData) {
            _id
            username
            email
            savedTrips {
                tripId
                title
                description
                origin
                destination
                time
                date
            }
            tripCount
        }
    }
`;

export const REMOVE_TRIP = gql`
    mutation removeTrip($tripId: ID!) {
        removeTrip(tripId: $tripId) {
            _id
            username
            email
            savedTrips {
                tripId
                title
                description
                origin
                destination
                time
                date
            }
        }
    }
`;

export const UPDATE_TRIP = gql`
    mutation updateTrip($trip: UpdateTripInput) {
        updateTrip(trip: $trip) {
            _id
            username
            savedTrips {
                tripId
                title
                description
                origin
                destination
            }
            tripCount
        }
    }
`;