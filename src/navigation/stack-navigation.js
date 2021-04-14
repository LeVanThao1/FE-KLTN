import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import Home from '../screens/home';
import About from '../screens/about';
import DetailProduct from '../screens/detail-product';
import Contact from '../screens/contact';
import Payment from '../screens/payment/payment';
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
import BottomTabNavigator from './tab-navigation';
import VerifyCode from '../screens/verifyCode';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLazyQuery, useQuery} from '@apollo/client';
import {GET_USER, REFRESH_TOKEN} from '../query/user';
import {Spinner, View} from 'native-base';
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
      {/* <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="Detail-Product" component={DetailProduct} />
      <Stack.Screen name="tab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

const PaymentStack = () => {
  return (
    <Stack.Navigator initialRouteName="Thanh toán">
      <Stack.Screen name="Thanh toán" component={Payment} />
      <Stack.Screen name="Địa chỉ" component={Address} />
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
  return useObserver(() => {
    const {
      stores: {auth, user},
    } = useContext(MobXProviderContext);
    const [loading, setLoading] = useState(true);
    const [refreshToken, {dt, err}] = useLazyQuery(REFRESH_TOKEN, {
      onCompleted: async (data) => {
        user.setInfo(data.refreshToken.user);
        user.setCart(data.refreshToken.cart);
        auth.setLogin(data.refreshToken.token, data.refreshToken.refreshToken);
        setLoading(false);
      },
      onError: (err) => {
        console.log(err);
      },
    });
    const [getProfile, {called, load, data, error}] = useLazyQuery(GET_USER, {
      onCompleted: async (data) => {
        user.setInfo(data.profile);
        user.setCart(data.profile.cart);
        auth.setIsAuth(true);
        setLoading(false);
      },
      onError: (err) => {
        refreshToken();
      },
    });

    useEffect(() => {
      AsyncStorage.getItem('token').then((data) => {
        AsyncStorage.getItem('refreshToken').then((dt) => {
          if (data && dt) {
            // auth.setLogin(data,dt)
            auth.setToken(data);
            auth.setRefreshToken(dt);
          } else {
            setLoading(false);
          }
        });
      });
    }, []);
    useEffect(() => {
      if (auth) {
        getProfile();
      }
    }, [auth]);
    return (
      <>
        {!loading ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="Home" component={Home} /> */}
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="SignUp" component={Register} />
            <Stack.Screen name="Verify" component={VerifyCode} />
          </Stack.Navigator>
        ) : (
          <View style={styles.container}>
            <Spinner color="blue" />
          </View>
        )}
      </>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {
  HomeStack,
  ContactStack,
  AuthStack,
  AboutStack,
  PaymentStack,
  StoreStack,
  // ProductStack,
};
