import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'http://192.168.0.103:3000';

const httpLink = new HttpLink({uri: `${url}/graphql`});

const authMiddleware = new ApolloLink(async (operation, forward) => {
  operation.setContext({
    headers: {
      authorization: await AsyncStorage.getItem('token'),
      refresh_token: await AsyncStorage.getItem('refreshToken'),
    },
  });
  return forward(operation);
});

export const Client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
