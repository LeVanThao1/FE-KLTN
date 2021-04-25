const {gql} = require('@apollo/client');

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
  mutation createOrder($dataOrder: OrderCreate!) {
    createOrder(dataOrder: $dataOrder) {
      message
    }
  }
`;
