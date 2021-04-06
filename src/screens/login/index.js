import {useLazyQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Button, Spinner} from 'native-base';
import React, {useContext} from 'react';
import {Icon} from 'native-base';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {LOGIN} from '../../query/user';

const Login = ({navigation}) => {
  const [userID, setUserID] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayPassword, setDisplayPassword] = React.useState(false);
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
      // <View style={styles.center}>
      //   <Text>This is the login screen</Text>
      //   <View style={styles.button}>
      //     <Button info onPress={onPress}>
      //       <Text> Login </Text>
      //     </Button>
      //   </View>

      //   {error && <Text>{error.message}</Text>}
      //   {loading && <Spinner color="green" />}
      // </View>
      <View style={styles.container}>
        {/* <TouchableOpacity style={{width: '100%'}}>
          <Text style={{color: '#000'}}>Back</Text>
        </TouchableOpacity> */}
        <Text style={styles.title}>Login</Text>
        <View style={{width: '100%'}}>
          <Text style={styles.text}>Welcome back!</Text>
        </View>
        <View style={{width: '100%', marginVertical: 12}}>
          <TextInput
            style={styles.textInput}
            placeholder="Email or phone number"
            value={userID}
            onChangeText={(value) => setUserID(value)}
          />
        </View>
        <View
          style={{
            width: '100%',
            position: 'relative',
            marginVertical: 12,
            justifyContent: 'center',
          }}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={!displayPassword}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Icon
            name={displayPassword ? 'eye-off-outline' : 'eye-outline'}
            style={{
              position: 'absolute',
              right: 12,
              zIndex: 1,
              fontSize: 24,
              color: '#696969',
            }}
            type="Ionicons"
            onPress={() => setDisplayPassword(!displayPassword)}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Forgot password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.text}>Registry now</Text>
        </TouchableOpacity>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  // center: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   textAlign: 'center',
  // },
  // button: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
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
  textInput: {
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 10,
    paddingHorizontal: 16,

    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#696969',
    letterSpacing: 0.75,
  },
  button: {
    backgroundColor: 'rgba(68, 108, 179, 1)',
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
});

export default Login;
