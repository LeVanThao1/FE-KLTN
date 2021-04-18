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
      category {
        id
        name
      }
      author {
        id
        name
        avatar
      }
      createdAt
    }
  }
`;

export const GET_POSTS_USER= gql`
  query postByUser($userId: ID) {
    posts(userId: $userId) {
      id
      title
      description
      images
      author {
        id
        name
        avatar
      }
      name
      year
      numberOfReprint
      publisher
      category {
        id
        name
      }
      bookWanna
    }
  }
`;
export const GET_POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      title
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
      numberOfReprint
      publisher
      category {
        id
        name
      }
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
      numberOfReprint: $numberOfRePrint
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
      numberOfReprint: $numberOfRePrint
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
