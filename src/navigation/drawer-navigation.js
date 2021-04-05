import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  HomeStack,
  ContactStack,
  AboutStack,
  AuthStack,
  Payment,
  PaymentStack,
  StoreStack,
} from './stack-navigation';
import TabNavigator from './tab-navigation';
import Loading from '../screens/loading';
import {createSwitchNavigator} from 'react-navigation';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator AuthLoading={Loading} initialRouteName={'Home'}>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Category" component={ContactStack} />
      <Drawer.Screen name="Your Favourite" component={ContactStack} />
      <Drawer.Screen name="Contact" component={ContactStack} />
      <Drawer.Screen name="Payment" component={PaymentStack} />
      <Drawer.Screen name="Store" component={StoreStack} />
      <Drawer.Screen name="About" component={AboutStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

// const Switch = createSwitchNavigator();

// export const createRootNavigator = (signedIn = false) => {
//   return (
//     <Switch.Navigator initialRouteName={signedIn ? 'Home' : 'Auth'}>
//       <Switch.Screen name="Auth" component={AuthStack} />
//       <Switch.Screen name="Home" component={DrawerNavigator} />
//     </Switch.Navigator>
//   );
// };
