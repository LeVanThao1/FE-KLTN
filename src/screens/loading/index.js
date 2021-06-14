import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import BG from '../../assets/images/bg.jpg';
import {queryData} from '../../common';
import {AuthStack} from '../../navigation/stack-navigation';
import BottomTabNavigator from '../../navigation/tab-navigation';
import {REFRESH_TOKEN} from '../../query/user';
const Loading = (props) => {
  return useObserver(() => {
    const {
      stores: {auth, user, shop, notification},
    } = useContext(MobXProviderContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (auth.isAuth) {
        setLoading(false);
      } else {
        AsyncStorage.getItem('token').then((data) => {
          AsyncStorage.getItem('refreshToken').then((dt) => {
            if (data && dt) {
              queryData(REFRESH_TOKEN)
                .then(({data}) => {
                  shop.setInfo(data.refreshToken.user.store);
                  user.setCart(data.refreshToken.user.cart);
                  notification.setAllNotification(
                    data.refreshToken.user.notifications,
                  );
                  user.setLikes(data.refreshToken.user.likes);
                  delete data.refreshToken.user.likes;
                  delete data.refreshToken.user.notifications;
                  delete data.refreshToken.user.store;
                  delete data.refreshToken.user.cart;
                  user.setInfo(data.refreshToken.user);
                  auth.setLogin(
                    data.refreshToken.token,
                    data.refreshToken.refreshToken,
                  );
                  AsyncStorage.setItem('token', data.refreshToken.token);
                  AsyncStorage.setItem(
                    'refreshToken',
                    data.refreshToken.refreshToken,
                  );
                  setLoading(false);
                })
                .catch((err) => {
                  console.log(err, 'loading');

                  setLoading(false);
                });
            } else {
              AsyncStorage.clear().then(() => {
                auth.setLogout();
              });
              setLoading(false);
            }
          });
        });
      }
    }, []);
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
