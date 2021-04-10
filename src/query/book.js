import {gql} from '@apollo/client';

export const GET_BOOK = gql`
  query books {
    books {
      id
      book
      store
      amount
      price
      createAt
      updatedAt
      deleteAt
    }
  }
`;
