import {gql} from '@apollo/client';

export const GET_BOOKS = gql`
  query books($limit: Int, $page: Int) {
    books(limit: $limit, page: $page) {
      id
      name
      images
      book {
        id
        name
        images
      }
      comment {
        id
        content
        type
        author {
          id
          name
          avatar
        }
        createdAt
      }
      author
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
      name
      year
      publisher
      numberOfReprint
      description
      images
      author
      comment {
        id
        content
        type
        author {
          id
          name
          avatar
        }
        createdAt
      }
      book {
        id
        name
        year
        publisher
        numberOfReprint
        description
        images
        author
        category {
          id
          name
        }
      }
      category {
        id
        name
      }
      amount
      price
      sold
      createdAt
      updatedAt
    }
  }
`;
export const GET_BOOK = gql`
  query book($id: ID!) {
    book(id: $id) {
      id
      author
      comment {
        id
        content
        type
        author {
          id
          name
          avatar
        }
        createdAt
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
        description
      }
      store {
        id
        name
        avatar
        background
        address
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
  mutation createBook($dataBook: BookCreate!) {
    createBook(dataBook: $dataBook) {
      id
      name
      author
      description
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
        author
        description
        year
        numberOfReprint
        publisher
        category {
          id
          name
        }
        images
      }
      images
      amount
      price
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation updateBook($dataBook: BookUpdate!, $id: ID!) {
    updateBook(dataBook: $dataBook, id: $id) {
      message
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      message
    }
  }
`;

export const SEARCH_BOOK = gql`
  query bookByName($name: String!, $category: ID, $limit: Int, $page: Int) {
    bookByName(name: $name, category: $category, limit: $limit, page: $page) {
      id
      book {
        id
        name
        images
      }
      name
      images
      amount
      price
      sold
      createdAt
    }
  }
`;

export const GET_BOOK_SELL = gql`
  query bookSell {
    bookSell {
      id
      name
      images
      category {
        id
        name
      }
      book {
        id
        name
        images
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
`;
export const GET_BOOKS_CATEGORY = gql`
  query booksByCategory($id: ID!, $limit: Int, $page: Int) {
    booksByCategory(id: $id, limit: $limit, page: $page) {
      id
      name
      images
      book {
        id
        name
        images
      }
      amount
      price
      sold
    }
  }
`;

export const GET_RECOMMENT_BY_NAME = gql`
  query getRecommentByName($name: String!, $type: String) {
    getRecommentByName(name: $name, type: $type) {
      id
      name
      author
      description
      year
      numberOfReprint
      publisher
      category {
        id
        name
      }
      images
    }
  }
`;
