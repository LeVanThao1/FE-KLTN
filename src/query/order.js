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

export const ORDERS_BY_STORE = gql`
  query subOrdersByStore {
    subOrdersByStore {
      id
      user {
        id
        name
      }
      detail {
        book {
          id
          name
          images
        }
        price
        amount
      }
      address
      phone
      status
      note
      store {
        id
      }
      ship
      statusPayment
      dateOfPayment
      receivedDate
      deliveryDate
      createdAt
    }
  }
`;

export const ORDER_BY_STORE = gql`
  query subOrderByStore($id: ID!) {
    subOrderByStore(id: $id) {
      id
      user {
        id
        name
      }
      detail {
        book {
          id
          name
          images
        }
        price
        amount
      }
      address
      phone
      status
      note
      store {
        id
      }
      statusPayment
      dateOfPayment
      receivedDate
      deliveryDate
      createdAt
    }
  }
`;

export const UPDATE_STATUS_ORDER = gql`
  mutation updateStatusSubOrder($dataStatus: STATUS!, $id: ID!) {
    updateStatusSubOrder(dataStatus: $dataStatus, id: $id) {
      message
    }
  }
`;

export const CANCEL_ORDER_BY_USER = gql `
  mutation cancleOrderByUser($id: ID!) {
    cancleOrderByUser(id: $id) {
      message
    }
  }
`
