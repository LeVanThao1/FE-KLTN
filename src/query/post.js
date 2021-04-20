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
mutation createPost($dataPost: dataCreatePost!) {
    createPost(dataPost: $dataPost) {
      id
      title
      name
      description
      images
      bookWanna
      numberOfReprint
      publisher
      category {
        id
        name
      }
      year
      price
      author {
        id
        name
        avatar
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePostByUser($dataPost: dataUpdatePost!, $id: ID!) {
    updatePostByUser(dataPost: $dataPost, id: $id) {
      id
      title
      description
      images
      bookWanna
      author {
        name
        avatar
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      message
    }
  }
`;
