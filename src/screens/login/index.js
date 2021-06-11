import {useLazyQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Icon, Spinner} from 'native-base';
import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {NOTIFI} from '../../constants';
import {COLORS} from '../../constants/themes';
import {LOGIN} from '../../query/user';
import {Notification} from '../../utils/notifications';
import {deFormatPhone, formatPhone} from '../../utils/support/phoneFormat';
import {emailValidator, phoneNumberValidator} from '../../utils/validations';
const Login = ({}) => {
  const navigation = useNavigation();
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
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        console.log(data.login.user.store)
        const {token, refreshToken} = data?.login;
        shop.setInfo(data.login.user.store);
        user.setCart(data.login.user.cart);
        user.setLikes(data.login.user.likes);
        notification.setAllNotification(data.login.user.notifications);
        const tamp = {...data};
        user.setInfo(data?.login.user);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        auth.setLogin(token, refreshToken);
        setLoading(false);
        // navigation.navigate({routeName: 'App'});
        navigation.reset({routeName: 'App'});
      },
      onError: (err) => {
        setLoading(false);
        let message = 'Đăng nhập không thành công';
        if (err.message === 'User not found') {
          message = 'Tài khoản không tồn tại';
        }
        if (err.message === 'Password is incorrect.') {
          message = 'Mật khẩu không đúng';
        }
        Toast.show(Notification(NOTIFI.error, message));
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


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     marginVertical: 6,
//     borderRadius: 5,
//   },
//   postHeader: {
//     height: 50,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 6,
//     paddingVertical: 0,
//     paddingHorizontal: 11,
//   },
//   row: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   UserName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#222121',
//   },
//   PostTime: {
//     fontSize: 12,
//     color: '#747476',
//   },
//   PostTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000000',
//     paddingHorizontal: 11,
//     paddingVertical: 0,
//   },
//   PostDescription: {
//     fontSize: 14,
//     color: '#222121',
//     paddingHorizontal: 11,
//     paddingVertical: 0,
//   },
//   PhotoGroup: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     flexWrap: 'wrap',
//   },
//   PhotoContainer: {
//     width: '50%',
//     padding: 10,
//   },
//   PostPhoto: {
//     width: '100%',
//     height: 210
//   },
//   PostFooter: {
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   TextCount: {
//     fontSize: 11,
//     color: '#424040'
//   },
//   Button: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   txt: {
//     fontSize: 12,
//     color: '#424040'
//   },
//   BreakLine: {
//     width: '100%',
//     height: 0.5,
//     backgroundColor: '#000',
//   },
//   OverlayGroup: {
//     width: '100%',
//     position: 'relative',
//   },
//   Overlay: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     top: 0,
//     left: 0,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     // backgroundColor: 
//   },
//   User: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderColor: '#1777f2',
//     borderWidth: 3
//     // borderWidth: ${(props) => (props.story ? '3px' : 0)};
//   }
// });
