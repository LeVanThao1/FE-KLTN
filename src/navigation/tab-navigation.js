import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Contact from '../screens/contact';
import Cart from '../screens/cart';
import Notication from '../screens/notification';
import {HomeStack} from './stack-navigation';
import Profile from '../screens/profile';
import AccountManager from '../screens/account-manager';

import {Icon} from 'native-base';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const icons = {
            Home: {
              name: 'home',
              type: 'AntDesign',
            },
            Profile: {
              name: 'user',
              type: 'AntDesign',
            },
            Contact: {
              name: 'contacts',
              type: 'AntDesign',
            },
            Cart: {
              name: 'shoppingcart',
              type: 'AntDesign',
            },
            Notication: {
              name: 'notifications-none',
              type: 'MaterialIcons',
            },
          };

          return (
            <Icon
              name={icons[route.name].name}
              type={icons[route.name].type}
              color={color}
              size={size}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Contact" component={Contact} />
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
      <Tab.Screen name="Profile" component={AccountManager} />

      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Notication" component={Notication} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
