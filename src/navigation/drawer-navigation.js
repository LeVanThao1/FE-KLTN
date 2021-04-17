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
  PostStack,
} from './stack-navigation';
import TabNavigator from './tab-navigation';
import Loading from '../screens/loading';
import {createSwitchNavigator} from 'react-navigation';
import BottomTabNavigator from './tab-navigation';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator AuthLoading={Loading} initialRouteName={'Home'}>
      {/* <Drawer.Screen name="Home" component={<HomeStack initialRoute="Home"/>} /> */}
      {/* <Drawer.Screen name="Category" component={<HomeStack initialRoute="Home"/>}/> */}
      {/* <Drawer.Screen name="Your Favourite" component={ContactStack} /> */}
      {/* <Drawer.Screen name="Contact" component={ContactStack} /> */}
      {/* <Drawer.Screen name="Payment" component={<HomeStack initialRoute="Payment"/>} />
      <Drawer.Screen name="Store" component={<HomeStack initialRoute="Payment"/>} />
      <Drawer.Screen name="Posts" component={PostStack} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
