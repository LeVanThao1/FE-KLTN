import {gql} from '@apollo/client';

export const GET_COMMENT_BOOK = gql`
  query commentOfBook($id: ID!) {
    commentOfBook(id: $id) {
      id
      content
      author {
        id
        avatar
      }
      type
      reply {
        id
        content
        author {
          id
          avatar
        }
        type
      }
      createAt
    }
  }
`;

export const GET_COMMENTS_BOOK = gql`
  query commentsOfBook($bookId: ID!) {
    commentsOfBook(bookId: $bookId) {
      id
      content
      author {
        id
        avatar
      }
      type
      reply {
        id
        content
        author {
          id
          avatar
        }
        type
      }
      createAt
    }
  }
`;

export const GET_COMMENT_POST = gql`
  query commentOfPost($id: ID!) {
    commentOfPost(id: $id) {
      id
      content
      author {
        id
        avatar
      }
      post {
        id
        title
        images
        description
      }
      type
      reply {
        id
        content
        author {
          id
          avatar
        }
        type
      }
      createdAt
    }
  }
`;

export const GET_COMMENTS_POST = gql`
  query commentsOfPost($postId: ID!) {
    commentsOfPost(postId: $postId) {
      id
      content
      author {
        id
        avatar
      }
      post {
        id
        title
        author {
          id
          name
        }
        images
        description
      }
      type
      reply {
        id
        content
        author {
          id
          avatar
        }
        type
      }
      createdAt
    }
  }
`;

export const CREATE_COMMENT_BOOK = gql`
  mutation createCommentBook($dataComment: dataComment!, $commentId: ID!) {
    createCommentBook(dataComment: $dataComment, commentId: $commentId) {
      id
      content
      book {
        id
      }
      author
      type
      reply {
        id
        content
        author {
          id
          avatar
        }
        type {
          VIDEO
          TEXT
          IMAGE
        }
      }
      createdAt
    }
  }
`;

export const REPLY_COMMENT_BOOK = gql`
  query replyCommentBook($dataComment: dataComment!, $commentId: ID!) {
    replyCommentBook(dataComment: $dataComment, commentId: $commentId) {
      message
    }
  }
`;

export const CREATE_COMMENT_POST = gql`
  mutation createCommentPost($dataComment: dataComment!, $postId: ID!) {
    createCommentPost(dataComment: $dataComment, postId: $postId) {
      id
      content
      post {
        id
        title
        description
        images
      }
      author {
        id
        name
      }
      type
      reply {
        id
        content
        author {
          id
          avatar
        }
        type
      }
      createdAt
    }
  }
`;

export const REPLY_COMMENT_POST = gql`
  query replyCommentPost($dataComment: dataComment!, $commentId: ID!) {
    replyCommentPost(dataComment: $dataComment, commentId: $commentId) {
      message
    }
  }
`;
