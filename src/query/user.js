import {gql} from '@apollo/client';

export const LOGIN = gql`
  query login($phone: String!, $password: String!) {
    login(phone: $phone, password: $password) {
      user {
        name
        phone
        role
        avatar
      }
      token
      refreshToken
    }
  }
`;

export const GET_USER = gql`
  query profile {
    profile {
      name
      phone
      role
    }
  }
`;
