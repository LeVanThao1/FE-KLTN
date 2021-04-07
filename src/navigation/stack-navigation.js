import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/home';
import About from '../screens/about';
import DetailProduct from '../screens/detail-product';
import Contact from '../screens/contact';
import Payment from '../screens/payment';
import Login from '../screens/login';
import Register from '../screens/register';
import ForgotPassword from '../screens/forgot-password';
import Store from '../screens/myStore/index';
const Stack = createStackNavigator();
import HeaderStack from '../header';
import CreateStore from '../screens/myStore/createStore';
import ManageStore from '../screens/myStore/manageStore';
import {NavigationContainer} from '@react-navigation/native';
import ViewAll from '../screens/myStore/viewAll';
import ViewAllOrder from '../screens/myStore/orders/viewAllOrder';
import Statistics from '../screens/myStore/finance/statistics';
import Revenue from '../screens/myStore/finance/revenue';
import CreateProduct from '../screens/myStore/manageStore';
import Address from '../screens/payment/address';
const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'My home',
          headerTitle: () => <HeaderStack navigation={navigation} />,
          headerStyle: {
            backgroundColor: 'rgba(68, 108, 179, 1)',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const PaymentStack = () => {
  return (
    <Stack.Navigator initialRouteName="Thanh toán">
      <Stack.Screen name="Thanh toán" component={Payment} />
      {/* <Stack.Screen name="Địa chỉ" component={Address} /> */}
    </Stack.Navigator>
  );
};
const StoreStack = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="Store">
      <Stack.Screen name="Store" component={CreateStore} />
      <Stack.Screen name="CreateProduct" component={CreateProduct} />
      <Stack.Screen name="ViewAllProduct" component={ViewAll} />
      <Stack.Screen name="ManageOrder" component={ViewAllOrder} />
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="Revenue" component={Revenue} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
const AboutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Detail-Product" component={DetailProduct} />
    </Stack.Navigator>
  );
};

const ContactStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SignUp" component={Register} />
    </Stack.Navigator>
  );
};

export {
  HomeStack,
  ContactStack,
  AuthStack,
  AboutStack,
  PaymentStack,
  StoreStack,
};
