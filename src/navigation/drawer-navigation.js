import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {HomeStack, ContactStack} from './stack-navigation';
import TabNavigator from './tab-navigation';
import Loading from '../screens/loading';

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
