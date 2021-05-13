import {ApolloProvider} from '@apollo/client';
import {Provider} from 'mobx-react';
import {Root} from 'native-base';
import React from 'react';
import 'react-native-gesture-handler';
import {Client} from '../../config';
import {stores} from '../../store';
import Loading from '../loading';

const AppProvider = () => {
  return (
    <ApolloProvider client={Client}>
      <Provider stores={stores}>
        <Root>
          <Loading />
        </Root>
      </Provider>
    </ApolloProvider>
  );
};

export default AppProvider;
