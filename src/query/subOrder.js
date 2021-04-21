import {gql} from '@apollo/client';

export const GET_SUB_ORDERS = gql`
  query subOrdersByUser {
    subOrdersByUser {
      id
      user {
        id
        name
      }
      detail {
        book {
          id
          name
          images
        }
        amount
        price
      }
      address
      phone
      status
    }
  }
`;

export const GET_SUB_ORDER = gql`
  query subOrderByUser($id: ID!) {
    subOrderByUser(id: $id) {
      id
      user {
        id
        name
      }
      detail {
        book {
          id
          name
          images
        }
        amount
        price
      }
      address
      phone
      status
    }
  }
`;
