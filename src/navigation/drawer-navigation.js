import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {HomeStack, ContactStack, AuthStack} from './stack-navigation';
import TabNavigator from './tab-navigation';
import Loading from '../screens/loading';
import {createSwitchNavigator} from 'react-navigation';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator AuthLoading={Loading} initialRouteName={'AuthLoading'}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Contact" component={ContactStack} />
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
