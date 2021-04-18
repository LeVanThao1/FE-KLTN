import {gql} from '@apollo/client';

export const GET_STORE = gql`
  query store($id: ID!) {
    store(id: $id) {
      name
      id
      description
      books {
        book {
          name
        }
      }
    }
  }
`;

export const CREATE_STORE = gql`
  mutation createStore($dataStore: storeCreate!) {
    createStore(dataStore: $dataStore) {
      message
    }
  }
`;

export const UPDATE_STORE = gql`
  mutation createStore($dataStore: storeUpdate!, $id: ID!) {
    createStore(dataStore: $dataStore) {
      message
    }
  }
`;

export const DELETE_STORE = gql`
  mutation deleteStore($id: ID!) {
    deleteStore(id: $id) {
      message
    }
  }
`;
