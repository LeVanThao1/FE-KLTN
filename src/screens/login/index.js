import {useLazyQuery, useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Button, Spinner} from 'native-base';
import React, {useContext, useState} from 'react';
import {Icon} from 'native-base';
import {COLORS} from '../../constants/themes';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {LOGIN, REGISTER} from '../../query/user';
import {
  emailValidator,
  passwordValidator,
  phoneNumberValidator,
} from '../../utils/validations';
import {deFormatPhone, formatPhone} from '../../utils/support/phoneFormat';
import Toast from 'react-native-toast-message';
import {NOTIFI} from '../../constants';
import {Notification} from '../../utils/notifications';

const Login = ({navigation}) => {
  const [userID, setUserID] = React.useState({
    value: '',
    error: '',
  });
  const [password, setPassword] = React.useState({
    value: '',
    error: '',
  });
  const [displayPassword, setDisplayPassword] = React.useState(false);
  const [typeLogin, setTypeLogin] = useState(false);

  return useObserver(() => {
    const {
      stores: {auth, user, shop, notification},
    } = useContext(MobXProviderContext);
    const [loading, setLoading] = useState(false);
    const [login, {called, data, error}] = useLazyQuery(LOGIN, {
      onCompleted: async (data) => {
        const {token, refreshToken} = data?.login;
        shop.setInfo(data.login.user.store);
        user.setCart(data.login.user.cart);
        user.setLikes(data.login.user.likes);
        notification.setAllNotification(data.login.user.notifications);
        delete data.login.user.notifications;
        delete data.login.user.store;
        delete data.login.user.cart;
        delete data.login.user.likes;
        user.setInfo(data?.login.user);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        auth.setLogin(token, refreshToken);
        setLoading(false);
      },
      onError: (err) => {
        console.log(err);
        setLoading(false);
        Toast.show(Notification(NOTIFI.error, err.message));
      },
    });
    const validateUserId = () => {
      if (!userID.value) {
        setUserID({
          ...userID,
          error: 'Enter email or phone number',
        });
        return false;
      }
      if (typeLogin) {
        if (!phoneNumberValidator(deFormatPhone(userID.value))) {
          setUserID({
            ...userID,
            error: 'Incorrect phone number',
          });
          return false;
        }
      } else {
        if (!emailValidator(userID.value)) {
          setUserID({
            ...userID,
            error: 'Incorrect email address',
          });
          return false;
        }
      }
      return true;
    };
    const validatePassword = () => {
      if (!password.value.trim()) {
        setPassword((cur) => ({...cur, error: 'Enter password'}));
        return false;
      }
      // if (!passwordValidator(password.value) && password.value) {
      //   setPassword((cur) => ({
      //     ...cur,
      //     error:
      //       'The password must contain at least 1 digit, 1 uppercase character, 1 lowercase character and at least 8 characters',
      //   }));
      //   return false;
      // }
      return true;
    };
    const onPress = () => {
      if (validatePassword() + validateUserId() !== 2) return;
      let variables = {
        password: password.value,
        type: typeLogin,
      };
      if (typeLogin) variables.phone = deFormatPhone(userID.value.trim());
      else variables.email = userID.value.trim().toLowerCase();
      setLoading(true);
      login({
        variables: {
          ...variables,
        },
      });
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Đăng nhập</Text>
        <View style={{width: '100%'}}>
          <Text style={styles.text}>Chào mừng quay trở lại!</Text>
        </View>
        <View style={{width: '100%', marginTop: 12, marginBottom: 5}}>
          <TextInput
            style={{
              ...styles.textInput,
              borderColor: !!userID.error ? 'red' : '#696969',
            }}
            placeholder="Email or phone number"
            value={userID.value}
            onFocus={() => {
              setUserID({...userID, error: ''});
            }}
            onChangeText={(value) => {
              setUserID({
                ...userID,
                value: typeLogin ? formatPhone(value) : value,
              });
              if (value.length === 1) {
                setTypeLogin(Number.isInteger(parseInt(value)));
              }
            }}
          />
        </View>

        <Text style={styles.err}>{userID.error}</Text>
        <View style={styles.containerText}>
          <TextInput
            style={{
              ...styles.textInput,
              borderColor: !!password.error ? 'red' : '#696969',
            }}
            onFocus={() => {
              setPassword({...password, error: ''});
            }}
            placeholder="Password"
            secureTextEntry={!displayPassword}
            value={password.value}
            onChangeText={(value) => setPassword({...password, value: value})}
          />
          <Icon
            name={displayPassword ? 'eye-off-outline' : 'eye-outline'}
            style={styles.icon}
            type="Ionicons"
            onPress={() => setDisplayPassword(!displayPassword)}
          />
        </View>

        <Text style={styles.err}>{password.error}</Text>

        <TouchableOpacity
          style={{...styles.button, flexDirection: 'row'}}
          onPress={onPress}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
          {loading && (
            <Spinner
              size="small"
              color="#fff"
              style={{
                paddingLeft: 20,
                width: 20,
                height: 15,
              }}></Spinner>
          )}
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            <Text style={styles.text}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.text}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // alignItems: 'center',
  },
  title: {
    fontSize: 32,
    width: '100%',
    marginVertical: 20,
    fontWeight: '600',
    letterSpacing: 2,
  },
  text: {
    marginVertical: 8,
    letterSpacing: 0.75,
  },
  containerText: {
    width: '100%',
    position: 'relative',
    marginTop: 12,
    marginBottom: 5,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 14,
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#696969',
    letterSpacing: 0.75,
  },
  icon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
    fontSize: 24,
    color: '#696969',
  },
  button: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 5,
    marginVertical: 24,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    letterSpacing: 0.75,
  },
  err: {
    fontSize: 10,
    color: 'red',
  },
});

export default Login;
