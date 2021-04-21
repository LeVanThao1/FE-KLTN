import {gql} from '@apollo/client';

export const COMMENTS_POST_NOTIFICATION = gql`
  subscription receiveNotificationCommentPost($userId: ID!) {
    receiveNotificationCommentPost(userId: $userId) {
      id
      title
      description
      commentPost {
          id
          content
          post {
              id
          }
          author {
              name
          }
          type
          createdAt
      }
      seen
      createdAt
    }
  }
`;

export const COMMENTS_BOOK_NOTIFICATION = gql`
  subscription receiveNotificationCommentBook($userId: ID!) {
    receiveNotificationCommentBook(userId: $userId) {
      id
      title
      description
      commentBook {
        id
        content
        book {
            id
        }
        author {
            name
        }
        type
        createdAt
      }
      seen
      createdAt
    }
  }
`;
export const COMMENTS_ORDER_NOTIFICATION = gql`
  subscription receiveNotificationOrder($userId: ID!) {
    receiveNotificationOrder(userId: $userId) {
      id
      title
      description
      order {
        id
      }
      seen
      createdAt
      updatedAt
    }
  }
`;