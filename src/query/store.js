import {gql} from '@apollo/client';

export const GET_STORE = gql`
  query store($id: ID!) {
    store(id: $id) {
      avatar
      background
      id
      name
      description
      address
      books {
        book {
          name
        }
      }
    }
  }
`;

export const GET_STORES_LOCATION = gql`
  query locationsStores($lng: Float, $lat: Float, $distance: Int) {
    locationsStores(lng: $lng, lat: $lat, distance: $distance) {
      store {
        id
        name
        avatar
        description
        address
      }
      distance
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
  mutation updateStore($dataStore: storeUpdate!, $id: ID!) {
    updateStore(dataStore: $dataStore) {
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
