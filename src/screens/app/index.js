import 'react-native-gesture-handler';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MobXProviderContext, useObserver, Provider} from 'mobx-react';
// import {DrawerNavigator, AuthStack} from '../../navigation';
import DrawerNavigator from '../../navigation/drawer-navigation';
import {AuthStack} from '../../navigation';
import {stores} from '../../store';
import {Root} from 'native-base';
const App = () => {
  return useObserver(() => {
    const {
      stores: {auth},
    } = useContext(MobXProviderContext);
    const {isAuth} = auth;
    return (
      <NavigationContainer>
        {/* {!isAuth ? <AuthStack /> : <DrawerNavigator />}
         */}
        <DrawerNavigator />
      </NavigationContainer>
    );
  });
};

const AppProvider = () => {
  return (
    <Provider stores={stores}>
      <App />
    </Provider>
  );
};

export default AppProvider;
