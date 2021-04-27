import {gql} from '@apollo/client';

export const GET_HOME = gql`
  query home {
    home {
      categories {
        id
        name
      }
      bestSell {
        id
        name
        images
        year
        numberOfReprint
        publisher
        category {
          id
          name
        }
        book {
          id
          name
          images
          year
          numberOfReprint
          publisher
          category {
            id
            name
          }
        }
        amount
        price
        sold
      }
      books {
        id
        name
        images
        year
        numberOfReprint
        publisher
        category {
          id
          name
        }
        book {
          id
          name
          images
          year
          numberOfReprint
          publisher
          category {
            id
            name
          }
        }
        amount
        price
        sold
      }
    }
  }
`;
