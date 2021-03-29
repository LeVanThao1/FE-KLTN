import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/home';
import About from '../screens/about';
import Contact from '../screens/contact';
import Payment from '../screens/payment';
import Login from '../screens/login';
import Register from '../screens/register';
import ForgotPassword from '../screens/forgot-password';
import Store from '../screens/myStore/index';

const Stack = createStackNavigator();
import HeaderStack from '../header';
const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={About}
        options={{
          title: 'My home',
          headerTitle: () => <HeaderStack navigation={navigation} />,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
        }}
      />
    </Stack.Navigator>
  );
};
const PaymentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Paymenttttt" component={Payment} />
    </Stack.Navigator>
  );
};
const StoreStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Store" component={Store} />
    </Stack.Navigator>
  );
};
const AboutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="About" component={About} />
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
