import {useLazyQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Button, Spinner} from 'native-base';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LOGIN} from '../../query/user';

const Login = () => {
  return useObserver(() => {
    const {
      stores: {auth, user},
    } = useContext(MobXProviderContext);

    const [login, {called, loading, data, error}] = useLazyQuery(LOGIN, {
      onCompleted: async (data) => {
        const {token, refreshToken} = data?.login;
        user.setInfo(data?.login.user);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('refreshToken', token);
        auth.setLogin(token, refreshToken);
      },
    });

    const onPress = () => {
      login({
        variables: {
          phone: '0964555151',
          password: 'ta210402',
        },
      });
    };

    return (
      <View style={styles.center}>
        <Text>This is the login screen</Text>
        <View style={styles.button}>
          <Button info onPress={onPress}>
            <Text> Login </Text>
          </Button>
        </View>

        {error && <Text>{error.message}</Text>}
        {loading && <Spinner color="green" />}
      </View>
    );
  });
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
