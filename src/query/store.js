import {gql} from '@apollo/client';

export const GET_STORE = gql`
  query store {
    store {
      id
      name
      description
      owner {
        id
        name
        email
        avatar
        phone
      }
      books {
        id
        book {
          id
          name
          images
          year
          numberOfReprint
          publisher
          category {
            id
            name
          }
          description
        }
        name
        images
        year
        numberOfReprint
        publisher
        category {
          id
          name
        }
        description
        amount
        price
        sold
      }
      avatar
      background
    }
  }
`;

export const CREATE_STORE = gql`
  query createStore(
    $name: String!
    $description: String!
    $background: String
    $owner: ID!
    $avatar: String
  ) {
    createStore(
      name: $name
      description: $description
      background: $background
      owner: $owner
      avatar: $avatar
    ) {
      message
    }
  }
`;

export const UPDATE_STORE = gql`
  query createStore(
    $id: ID!
    $name: String!
    $description: String!
    $background: String
    $owner: ID!
    $avatar: String
  ) {
    createStore(
      id: $id
      name: $name
      description: $description
      background: $background
      owner: $owner
      avatar: $avatar
    ) {
      message
    }
  }
`;

export const DELETE_STORE = gql`
  query deleteStore($id: ID!) {
    deleteStore(id: $id) {
      message
    }
  }
`;
