import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Feed from '../screens/feed';
// import Cart from '../screens/cart';
import Notification from '../screens/notification';
import {HomeStack} from './stack-navigation';
// import Profile from '../screens/profile';
// import AccountManager from '../screens/account-manager';
import {COLORS} from '../constants/themes';

import {Icon} from 'native-base';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: 'white',
        activeTintColor: COLORS.secondary,
        activeBackgroundColor: 'white',
        inactiveBackgroundColor: COLORS.primary,
        style: {
          backgroundColor: COLORS.primary,
        },
      }}
      screenOptions={({route}) => ({
        style: {
          paddingVertical: 8,
        },
        tabBarIcon: ({color, size}) => {
          const icons = {
            Home: {
              name: 'home',
              type: 'AntDesign',
            },
            Personal: {
              name: 'user',
              type: 'AntDesign',
            },
            Feed: {
              name: 'contacts',
              type: 'AntDesign',
            },
            Cart: {
              name: 'shoppingcart',
              type: 'AntDesign',
            },
            Notification: {
              name: 'notifications-none',
              type: 'MaterialIcons',
            },
          };

          return (
            <Icon
              name={icons[route.name].name}
              type={icons[route.name].type}
              style={{color: color}}
              size={size}
            />
          );
        },
      })}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={() => <HomeStack initialRoute="Home" />}
      />
      <Tab.Screen
        name="Feed"
        component={() => <HomeStack initialRoute="Feed" />}
      />
      <Tab.Screen
        name="Personal"
        component={() => <HomeStack initialRoute="Personal" />}
      />
      <Tab.Screen
        name="Cart"
        component={() => <HomeStack initialRoute="Cart" />}
      />
      <Tab.Screen
        name="Notification"
        component={() => <HomeStack initialRoute="Notification" />}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
