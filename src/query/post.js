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
      price
      category {
        id
        name
      }
      author {
        id
        name
        avatar
        phone
        email
        address
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
        reply {
          id
          content
          author {
            id
            name
            avatar
          }
        }
        createdAt
      }
      createdAt
    }
  }
`;

export const GET_POSTS_USER = gql`
  query postByUser($userId: ID) {
    posts(userId: $userId) {
      id
      comment {
        id
        content
        type
        author {
          id
          name
          avatar
        }
        reply {
          id
          content
          author {
            id
            name
            avatar
          }
        }
        createdAt
      }
      price
      title
      description
      images
      author {
        id
        name
        avatar
        phone
        email
        address
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
      createdAt
    }
  }
`;
export const GET_POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      comment {
        id
        content
        type
        author {
          id
          name
          avatar
          address
          phone
          email
        }
        reply {
          id
          content
          author {
            id
            name
            avatar
            address
            phone
            email
          }
        }
        createdAt
      }
      uniqueBook {
        name
      }
      price
      title
      description
      images
      author {
        id
        name
        email
        phone
        avatar
        address
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
      comment {
        id
        content
        type
        author {
          id
          name
          avatar
        }
        reply {
          id
          content
          author {
            id
            name
            avatar
          }
        }
        createdAt
      }
      createdAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($dataPost: dataUpdatePost!, $id: ID!) {
    updatePost(dataPost: $dataPost, id: $id) {
      message
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
