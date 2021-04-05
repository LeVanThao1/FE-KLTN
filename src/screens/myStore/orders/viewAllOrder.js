import {Text, View} from 'native-base';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import All from './all';
import Processing from './processing';
import Comfirmed from './comfirmed';
import Done from './done';
import Waiting from './waiting';

const Tab = createMaterialTopTabNavigator();

const ViewAllOrder = () => {
  return (
    // <NavigationContainer>
    <Tab.Navigator initialRouteName="All">
      <Tab.Screen name="Tất cả" component={All} />
      <Tab.Screen name="Đang giao" component={Processing} />
      <Tab.Screen name="Chờ xác nhận" component={Waiting} />
      <Tab.Screen name="Đã xác nhận" component={Comfirmed} />
      <Tab.Screen name="Đã giao" component={Done} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default ViewAllOrder;
