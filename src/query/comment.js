import {gql} from '@apollo/client';

export default GET_COMMENT_BOOK = gql`
  query commentOfBook($id: ID!) {
    commentOfBook(id: $id) {
      id
      content
      author {
        id
        avatar
      }
      type {
        TEXT
        IMAGE
        VIDEO
      }
      reply {
        id
        content
        author {
          id
          avatar
        }
        type {
          TEXT
          IMAGE
          VIDEO
        }
      }
      createAt
    }
  }
`;

export default GET_COMMENTS_BOOK = gql`
  query commentsOfBook($bookId: ID!) {
    commentsOfBook(bookId: $bookId) {
      id
      content
      author {
        id
        avatar
      }
      type {
        TEXT
        IMAGE
        VIDEO
      }
      reply {
        id
        content
        author {
          id
          avatar
        }
        type {
          TEXT
          IMAGE
          VIDEO
        }
      }
      createAt
    }
  }
`;

export default GET_COMMENT_POST = gql`
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
        author
        images
        description
      }
      type {
        TEXT
        IMAGE
        VIDEO
      }
      reply {
        id
        content
        author {
          id
          avatar
        }
        type {
          TEXT
          IMAGE
          VIDEO
        }
      }
      createAt
    }
  }
`;

export default GET_COMMENTS_POST = gql`
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
        author
        images
        description
      }
      type {
        TEXT
        IMAGE
        VIDEO
      }
      reply {
        id
        content
        author {
          id
          avatar
        }
        type {
          TEXT
          IMAGE
          VIDEO
        }
      }
      createAt
    }
  }
`;

export default CREATE_COMMENT_BOOK = gql`
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

export default REPLY_COMMENT_BOOK = gql`
  query replyCommentBook($dataComment: dataComment!, commentId: ID!) {
    replyCommentBook(dataComment: $dataComment, commentId: $commentId) {
      message
    }
  }
`;

export default CREATE_COMMENT_POST = gql`
  mutation createCommentBook($dataComment: dataComment!, $postId: ID!) {
    createCommentBook(dataComment: $dataComment, postId: $postId) {
      id
      content
      post {
        id
        title
        description
        images
        author
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

export default REPLY_COMMENT_POST = gql`
  query replyCommentPost($dataComment: dataComment!, commentId: ID!) {
    replyCommentPost(dataComment: $dataComment, commentId: $commentId) {
      message
    }
  }
`;
