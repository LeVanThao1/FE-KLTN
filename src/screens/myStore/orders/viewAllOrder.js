import {Text, View} from 'native-base';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import All from './all';
import Processing from './processing';
import Comfirmed from './comfirmed';
import Done from './done';
import Waiting from './waiting';
import {ScrollView} from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();

const ViewAllOrder = () => {
  return (
    // <NavigationContainer>
    <ScrollView>
      <Tab.Navigator
        initialRouteName="All"
        tabBarOptions={{
          activeTintColor: 'rgba(68, 108, 179, 1)',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Tất cả" component={All} />
        <Tab.Screen name="Đang giao" component={Processing} />
        <Tab.Screen name="Chờ xác nhận" component={Waiting} />
        <Tab.Screen name="Đã xác nhận" component={Comfirmed} />
        <Tab.Screen name="Đã giao" component={Done} />
      </Tab.Navigator>
    </ScrollView>
    // </NavigationContainer>
  );
};

export default ViewAllOrder;
