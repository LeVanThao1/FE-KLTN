const {gql} = require('apollo-server-express');

export const GET_ORDER = gql`
  query order($id: ID!) {
    order(id: $id) {
      id
      user {
        id
        name
        email
        phone
        address
        avatar
      }
      subOrder {
        id
        user {
          id
          name
          phone
          address
          email
        }
        detail {
          book {
            id
            name
            description
            images
          }
          price
          amount
        }
        address
        phone
        status {
          CANCLE
          WAITING
          CONFIRMED
          PROCESSING
          DONE
        }
        receivedDate
        deliveryDate
      }
      address
      total
      phone
    }
  }
`;

export const CREATE_ORDER = gql`
  query createOrder ($address: String!, $phone: String!, subOrder: [DetailUpdate!!){
    createOrder(address: $address, phone: $phone, subOrder: $subOrder) {
      message
    }
  }
`;
