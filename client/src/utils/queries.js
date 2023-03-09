import { gql } from '@apollo/client';

export const GET_ME = gql`
query getMe {
    getMe {
        username
        email
        password
    }
}
`;

export const GET_TRIPS = gql`
query getTrip($_id: String!) {
    getTrips(_id: $_id) {
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
`