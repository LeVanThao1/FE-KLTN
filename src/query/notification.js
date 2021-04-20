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