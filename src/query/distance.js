import {gql} from '@apollo/client';

export const GET_DISTANCE = gql`
  query distances($origin: String!, $destination: [String!]!) {
    distances(origin: $origin, destination: $destination)
  }
`;
