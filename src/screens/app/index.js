import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {MobXProviderContext, Provider, useObserver} from 'mobx-react';
import {View} from 'native-base';
import React, {useContext} from 'react';
import 'react-native-gesture-handler';
import {Client} from '../../config';
import {AuthStack} from '../../navigation';
import DrawerNavigator from '../../navigation/drawer-navigation';
import BottomTabNavigator from '../../navigation/tab-navigation';
import {stores} from '../../store';

const App = () => {
  return useObserver(() => {
    const {
      stores: {auth},
    } = useContext(MobXProviderContext);
    const {isAuth} = auth;
    return (
      <NavigationContainer>
        {/* <DrawerNavigator /> */}
        {!isAuth ? <AuthStack /> : <DrawerNavigator />}
      </NavigationContainer>
    );
  });
};

const AppProvider = () => {
  return (
    <ApolloProvider client={Client}>
      <Provider stores={stores}>
        <App />
      </Provider>
    </ApolloProvider>
  );
};

export default AppProvider;
