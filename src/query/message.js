import {gql} from '@apollo/client';

export const GET_MESSAGE_GROUP = gql`
  query messagesInGroup($groupId: ID!, $limit: Int, $page: Int) {
    messagesInGroup(groupId: $groupId, limit: $limit, page: $page) {
      id
      content
      images
      datetime
      from {
        id
        name
        avatar
      }
      type
      seen
      createdAt
    }
  }
`;
export const GET_MESSAGE_USERID = gql`
  query messagesByUserID($userId: ID!) {
    messagesByUserID(userId: $userId) {
      id
      content
      images
      datetime
      from {
        id
        name
        avatar
      }
      to {
        id
      }
      type
      seen
      createdAt
    }
  }
`;
export const SEND_MESSAGE = gql`
  mutation sendMessage($dataMessage: dataCreateMessage!) {
    sendMessage(dataMessage: $dataMessage) {
      id
      content
      images
      datetime
      from {
        id
        name
        avatar
      }
      type
      seen
      createdAt
    }
  }
`;

export const SEND_MESSAGE_GET_TO = gql`
  mutation sendMessage($dataMessage: dataCreateMessage!) {
    sendMessage(dataMessage: $dataMessage) {
      id
      content
      images
      datetime
      from {
        id
        name
        avatar
      }
      to {
        id
        members {
          id
          name
          avatar
        }
      }
      type
      seen
      createdAt
    }
  }
`;

export const SEND_MESSAGE_IMAGE = gql`
  mutation sendMessageImage($dataMessageImage: dataMessageImage!) {
    sendMessageImage(dataMessageImage: $dataMessageImage) {
      id
      content
      images
      datetime
      from {
        id
        name
        avatar
      }
      type
      seen
      createdAt
    }
  }
`;

export const SEND_MESSAGE_IMAGE_GET_TO = gql`
  mutation sendMessageImage($dataMessageImage: dataMessageImage!) {
    sendMessageImage(dataMessageImage: $dataMessageImage) {
      id
      content
      images
      datetime
      from {
        id
        name
        avatar
      }
      to {
        id
        members {
          id
          name
          avatar
        }
      }
      type
      seen
      createdAt
    }
  }
`;

export const SEEN_MESSAGE = gql`
  query seenMessage($id: ID!) {
    seenMessage(id: $id) {
      id
      content
      images
      datetime
      from {
        id
        name
        avatar
      }
      type
      seen
      createdAt
    }
  }
`;

export const RECEIVE_MESSAGE = gql`
  subscription receiveMessage($userId: ID!) {
    receiveMessage(userId: $userId) {
      id
      content
      images
      datetime
      to {
        id
        members {
          id
          name
          avatar
        }
        lastMassage {
          id
          content
          images
          datetime
          from {
            id
          }
          type
          seen
          createdAt
        }
      }
      from {
        id
        name
        avatar
      }
      type
      seen
      createdAt
    }
  }
`;
