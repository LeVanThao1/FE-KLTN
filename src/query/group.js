import {gql} from '@apollo/client';

export const GET_GROUP = gql`
  query groups($limit: Int, $page: Int) {
    groups(limit: $limit, page: $page) {
      id
      members {
        id
        name
        avatar
        store {
          id
          name
          avatar
        }
      }
      lastMassage {
        id
        content
        images
        datetime
        from {
          id
        }
        type
        seen
        createdAt
      }
    }
  }
`;
export const GET_IMAGES_GROUP = gql`
  query getImages($id: ID!) {
    getImages(id: $id)
  }
`;
