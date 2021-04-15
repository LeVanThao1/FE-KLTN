import {gql} from '@apollo/client';

export const GET_POSTS = gql`
  query posts {
    posts {
      id
      title
      description
      name
      year
      numberOfReprint
      publisher
      bookWanna
      images
      author {
        id
        name
        avatar
        phone
      }
    }
  }
`;

export const GET_POST = gql`
  query postByUser($id: ID!) {
    postByUser(id: $id) {
      id
      title
      uniqueBook {
        id
        name
        images
        year
        number
        numberOfRePrint
        publisher
        category
        percent
      }
      description
      images
      author {
        id
        name
        email
        phone
        avatar
      }
      name
      year
      numberOfRePrint
      publisher
      category
      bookWanna
    }
  }
`;

export const CREATE_POST = gql`
  query createPostByUser(
    $id: ID!
    $title: String!
    $description: String!
    $images: [String!]
    $author: User!
    $name: String
    $year: String
    $numberOfRePrint: int
    $publisher: String
    $bookWanna: [String!]
  ) {
    createPostByUser(
      id: $id
      title: $title
      description: $description
      images: $images
      author: $author
      name: $name
      year: $year
      numberOfRePrint: $numberOfRePrint
      publisher: $publisher
      bookWanna: $bookWanna
    ) {
      message
    }
  }
`;

export const UPDATE_POST = gql`
  query updatePostByUser(
    $title: String!
    $description: String!
    $images: [String!]
    $author: User!
    $name: String
    $year: String
    $numberOfRePrint: int
    $publisher: String
    $bookWanna: [String!]
  ) {
    updatePostByUser(
      id: $id
      title: $title
      description: $description
      images: $images
      author: $author
      name: $name
      year: $year
      numberOfRePrint: $numberOfRePrint
      publisher: $publisher
      bookWanna: $bookWanna
    ) {
      message
    }
  }
`;

export const DELETE_POST = gql`
  query deletePost($id: ID!) {
    deletePost(id: $id) {
      message
    }
  }
`;
