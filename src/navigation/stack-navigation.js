import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/home';
import About from '../screens/about';
import DetailProduct from '../screens/detail-product';
import Contact from '../screens/contact';

import Login from '../screens/login';
import Register from '../screens/register';
import ForgotPassword from '../screens/forgot-password';

const Stack = createStackNavigator();
import HeaderStack from '../header';
const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <HeaderStack navigation={navigation} />,
          headerStyle: {
            backgroundColor: 'rgba(68, 108, 179, 1)',
          },
        }}
      />
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

export {HomeStack, ContactStack, AuthStack};
