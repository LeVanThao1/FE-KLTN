import {gql} from '@apollo/client';

export const LOGIN = gql`
  query login(
    $phone: String
    $password: String!
    $type: Boolean!
    $email: String
  ) {
    login(phone: $phone, password: $password, type: $type, email: $email) {
      user {
        id
        name
        phone
        role
        avatar
        email
        address
        likes {
          id
          amount
          price
          images
          book {
            id
            name
            images
          }
          name
          sold
        }
        store {
          id
          name
          description
        }
        cart {
          book {
            id
            amount
            price
            images
            book {
              id
              name
              images
            }
            name
          }
          amount
          price
        }
        notifications {
          order {
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
          book {
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
          post {
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
      }
      token
      refreshToken
    }
  }
`;
export const REGISTER = gql`
  mutation register($newUser: UserInput!, $type: Boolean!) {
    register(newUser: $newUser, type: $type) {
      message
    }
  }
`;
export const VERIFY = gql`
  query verify($phone: String, $otp: String!, $type: Boolean!, $email: String) {
    verify(phone: $phone, otp: $otp, type: $type, email: $email) {
      message
    }
  }
`;
export const GET_USER = gql`
  query profile {
    profile {
      id
      name
      phone
      role
      avatar
      email
      address
      likes {
        id
        amount
        price
        images
        book {
          id
          name
          images
        }
        name
        sold
      }
      store {
        id
        name
        description
      }
      cart {
        book {
          id
          amount
          price
          images
          book {
            name
            images
          }
          name
        }
        amount
        price
      }
      notifications {
        order {
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
        book {
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
        post {
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
    }
  }
`;

export const UPDATE_CART = gql`
  mutation updateCart($dataCart: [DetailUpdate!]!) {
    updateCart(dataCart: $dataCart) {
      book {
        id
        amount
        price
        images
        book {
          name
          images
        }
        name
      }
      amount
      price
    }
  }
`;
export const REFRESH_TOKEN = gql`
  query refreshToken {
    user {
      id
      name
      phone
      role
      avatar
      email
      address
      likes {
        id
        amount
        price
        images
        book {
          id
          name
          images
        }
        name
        sold
      }
      cart {
        book {
          id
          amount
          price
          images
          book {
            id
            name
            images
          }
          name
        }
        amount
        price
      }
      notifications {
        order {
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
        book {
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
        post {
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
    }
    token
    refreshToken
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo($userUpdate: UserUpdate!) {
    updateUserInfo(userUpdate: $userUpdate) {
      message
    }
  }
`;

export const ADD_TO_LIKE = gql`
  mutation addToLike($id: ID!) {
    addToLike(id: $id) {
      message
    }
  }
`;
export const REMOVE_TO_LIKE = gql`
  mutation removeToLike($id: ID!) {
    removeToLike(id: $id) {
      message
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  query forgotPassword($email: String, $phone: String, $type: Boolean!) {
    forgotPassword(email: $email, phone: $phone, type: $type) {
      message
    }
  }
`;

export const CHECK_OTP_FORGOT = gql`
  query checkOTPForgot(
    $email: String
    $phone: String
    $type: Boolean!
    $otp: String!
  ) {
    checkOTPForgot(email: $email, phone: $phone, type: $type, otp: $otp)
  }
`;


export const RESET_PASSWORD = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      message
    }
  }
`