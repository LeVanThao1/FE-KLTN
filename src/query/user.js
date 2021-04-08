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
        store {
          id
          name
          avatar
          background
          description
          books {
            id
            price
            amount
            book {
              id
              name
              description
              images
              category {
                id
                name
              }
              year
              publisher
            }
            createdAt
          }
        }
        notifications {
          order {
            id
            title
            description
            order {
              id
              user {
                name
                phone
                avatar
                email
                address
              }
              detail {
                book {
                  id
                  price
                  amount
                  book {
                    id
                    name
                    description
                    images
                    category {
                      id
                      name
                    }
                    year
                    publisher
                  }
                  createdAt
                }
                price
                amount
              }
              address
              phone
              status
              receivedDate
              deliveryDate
              createdAt
            }
            seen
            createdAt
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
                id
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
                id
                name
              }
              type
              createdAt
            }
            seen
            createdAt
          }
        }
        interests {
          id
          name
        }
        cart {
          book {
            id
            price
            amount
            book {
              id
              name
              description
              images
              category {
                id
                name
              }
              year
              publisher
            }
            store {
              id
              name
              avatar
            }
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
      name
      phone
      role
    }
  }
`;
