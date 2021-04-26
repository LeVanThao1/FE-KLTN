import {gql} from '@apollo/client';

export const UPLOAD_SINGLE_FILE = gql`
  mutation uploadSingleFile($file: Upload!) {
    uploadSingleFile(file: $file) {
      url
    }
  }
`;

export const UPLOAD_MULTI_FILE = gql`
  mutation uploadMultiFile($files: [Upload!]!) {
    uploadMultiFile(files: $files) {
      id
      url
      name
      asset_id
      public_id
    }
  }
`;
