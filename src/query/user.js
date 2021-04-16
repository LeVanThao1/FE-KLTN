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
    }
  }
`;

export const UPDATE_CART = gql`
  mutation updateCart($dataCart: [DetailUpdate!]!) {
    updateCart(dataCart: $dataCart) {
      message
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
    }
    token
    refreshToken
  }
`;
