import {gql} from '@apollo/client';

export const GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      name
    }
  }
`;

export const GET_BOOKS_CATEGORIES = gql`
  query booksByCategory($id: ID!) {
    booksByCategory(id: $id) {
      id
      name
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
      name
      images
      year
      numberOfReprint
      publisher
      category {
        id
        name
      }
      createdAt
    }
  }
`;

export const CREATE_CATEGORY = gql`
  query createCategory($name: String!) {
    createCategory(name: $name) {
      message
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  query createCategory($id: ID!, $name: String) {
    createCategory(id: $id, name: $name) {
      message
    }
  }
`;

export const DELETE_CATEGORY = gql`
  query deleteCategory($id: ID!) {
    deleteCategory {
      message
    }
  }
`;
