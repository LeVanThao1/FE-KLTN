import {gql} from '@apollo/client';

export default GET_COMMENT_BOOK = gql`
  query getRecomment($dataUniqueBook: UniqueBookCreate!) {
    getRecomment(dataUniqueBook: $dataUniqueBook) {
      id
      name
      images
      year
      numberOfReprint
      publisher
      description
      category {
        id
        name
      }
    }
  }
`;
