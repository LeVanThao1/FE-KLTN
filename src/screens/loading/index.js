import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import {_navigator} from '../../navigation/constants';
import BG from '../../assets/images/bg.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useNavigation,
  StackActions,
  NavigationContainer,
} from '@react-navigation/native';
import {GET_USER, REFRESH_TOKEN} from '../../query/user';
import {useLazyQuery} from '@apollo/client';
import Toast from 'react-native-toast-message';
import BottomTabNavigator from '../../navigation/tab-navigation';
import {AuthStack} from '../../navigation/stack-navigation';
const Loading = (props) => {
  // const navigation = useNavigation();
  return useObserver(() => {
    const {
      stores: {auth, user, shop, notification},
    } = useContext(MobXProviderContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      AsyncStorage.getItem('token').then((data) => {
        AsyncStorage.getItem('refreshToken').then((dt) => {
          if (data && dt) {
            // auth.setLogin(data,dt)
            refreshToken();
          } else {
            AsyncStorage.clear().then(() => {
              auth.setLogout();
            });
            setLoading(false);
          }
        });
      });
    }, []);
    const [refreshToken, {dt, err}] = useLazyQuery(REFRESH_TOKEN, {
      onCompleted: async (data) => {
        console.log(data);
        shop.setInfo(data.refreshToken.user.store);
        user.setCart(data.refreshToken.user.cart);
        notification.setAllNotification(data.refreshToken.user.notifications);
        user.setLikes(data.refreshToken.user.likes);
        delete data.refreshToken.user.likes;
        delete data.refreshToken.user.notifications;
        delete data.refreshToken.user.store;
        delete data.refreshToken.user.cart;
        user.setInfo(data.refreshToken.user);
        auth.setLogin(data.refreshToken.token, data.refreshToken.refreshToken);
        await AsyncStorage.setItem('token', data.refreshToken.token);
        await AsyncStorage.setItem(
          'refreshToken',
          data.refreshToken.refreshToken,
        );
        setLoading(false);
      },
      onError: (err) => {
        console.log(err, 'loading');

        setLoading(false);
        // Toast.show(Notifi.Notification(NOTIFI.error, err.message));
      },
    });
    return (
      <NavigationContainer>
        {loading ? (
          <ImageBackground
            style={{width: '100%', height: '100%'}}
            source={BG}></ImageBackground>
        ) : !auth?.isAuth ? (
          <AuthStack />
        ) : (
          <BottomTabNavigator />
        )}

        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    );
  });
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imgStyle: {
    flex: 1,
  },
});

export default Loading;
