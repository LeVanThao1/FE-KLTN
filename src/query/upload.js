import {gql} from '@apollo/client';

export const UPLOAD_SINGLE_FILE = gql`
  mutation uploadSingleFile($file: Upload!) {
    uploadSingleFile(file: $file) {
      url
    }
  }
`;
