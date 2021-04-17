import {gql} from '@apollo/client';

export const GET_BOOKS = gql`
  query books {
    books {
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
            description
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
      createdAt
    }
  }
`;

export const CREATE_BOOK = gql`
  query createBook(
    $amount: Float
    $price: Float
    $name: String
    $images: [String!]
    $year: String
    $numberOfRePrint: int
    $publisher: String
    $category: ID
    $description: String
  ) {
    createBook(
      amount: $amount
      price: $price
      name: $name
      images: $images
      year: $year
      numberOfRePrint: $numberOfRePrint
      publisher: $publisher
      category: $cateogy
      description: $description
    ) {
      message
    }
  }
`;

export const UPDATE_BOOK = gql`
  query updateBook(
    $id: ID!
    $amount: Float
    $price: Float
    $name: String
    $images: [String!]
    $year: String
    $numberOfRePrint: int
    $publisher: String
    $category: ID
    $description: String
  ) {
    updateBook(
      id: $id
      amount: $amount
      price: $price
      name: $name
      images: $images
      year: $year
      numberOfRePrint: $numberOfRePrint
      publisher: $publisher
      category: $cateogy
      description: $description
    ) {
      message
    }
  }
`;

export const DELETE_BOOK = gql`
  query deleteBook($id: ID!) {
    deleteBook(id: $id) {
      message
    }
  }
`;
