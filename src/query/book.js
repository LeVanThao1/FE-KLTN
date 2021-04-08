import {gql} from '@apollo/client';

export const GET_BOOKS = gql`
  query books {
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
      }
      store {
        id
        name
        avatar
      }
      amount
      price
      sold
      createdAt
    }
  }
`;
export const GET_BOOKS_STORE = gql`
  query books($store: ID!) {
    books(store: $store) {
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
      }
      store {
        id
        name
        avatar
      }
      amount
      price
      sold
      createdAt
    }
  }
`;
export const GET_BOOK = gql`
  query book($id: ID!) {
    book(id: $id) {
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
      store {
        id
        name
        avatar
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
          }
          amount
          price
          sold
          createdAt
        }
      }
      amount
      price
      sold
      createdAt
    }
  }
`;
