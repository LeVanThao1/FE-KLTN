import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {MobXProviderContext, Provider, useObserver} from 'mobx-react';
import {Root} from 'native-base';
import React, {useContext} from 'react';
import 'react-native-gesture-handler';
import {Client} from '../../config';
import {AuthStack, HomeStack} from '../../navigation';
import BottomTabNavigator from '../../navigation/tab-navigation';
import {stores} from '../../store';
import Toast from 'react-native-toast-message';
const App = () => {
  return useObserver(() => {
    const {
      stores: {auth},
    } = useContext(MobXProviderContext);
    const {isAuth} = auth;
    return (
      <NavigationContainer>
        {/* <DrawerNavigator /> */}
        {!isAuth ? <AuthStack /> : <BottomTabNavigator />}
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    );
  });
};

const AppProvider = () => {
  return (
    <ApolloProvider client={Client}>
      <Provider stores={stores}>
        <Root>
          <App />
        </Root>
      </Provider>
    </ApolloProvider>
  );
};

export default AppProvider;
