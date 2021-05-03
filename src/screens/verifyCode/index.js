import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Icon} from 'native-base';
import {useLazyQuery, useQuery} from '@apollo/client';
import {VERIFY} from '../../query/user';
import {codeValidator} from '../../utils/validations';
import {deFormatPhone} from '../../utils/support/phoneFormat';
import {Notification} from '../../utils/notifications';
import {NOTIFI} from '../../constants';
import Toast from 'react-native-toast-message';
export default function VerifyCode({route, navigation}) {
  const [verify, {called, loading, data, error}] = useLazyQuery(VERIFY, {
    onCompleted: async (data) => {
      console.log(data);
      navigation.navigate('Login');
    },
    onError: (err) => {
      Toast.show(Notification(NOTIFI.error, err.message));
      console.log(err);
    },
  });
  const [code, setCode] = React.useState({
    value: '',
    error: '',
  });
  const {type, userId} = route.params;
  console.log(type, userId);
  const validationCode = () => {
    if (!code.value.trim()) {
      setCode((cur) => ({...cur, error: 'Enter code'}));
      return false;
    }
    if (code.value.length !== 6 && code.value) {
      setCode((cur) => ({
        ...cur,
        error: 'The code at least 6 characters',
      }));
      return false;
    }
    return true;
  };
  const onPress = () => {
    if (!validationCode()) return;
    verify({
      variables: {
        email: userId,
        phone: type ? deFormatPhone(userId) : userId,
        type,
        otp: code.value,
      },
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{width: '100%'}}>
        <Text style={{color: '#000'}}>Trở lại</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Mã xác thực</Text>
      <View style={{width: '100%'}}>
        <Text style={styles.text}>Nhập mã xác thực để qua bước tiếp theo!</Text>
      </View>
      <View style={{width: '100%', marginVertical: 12}}>
        <TextInput
          style={{
            ...styles.textInput,
            borderColor: !!code.error ? 'red' : '#696969',
          }}
          value={code.value}
          onChangeText={(value) => setCode({...code, value: value})}
          onFocus={() => {
            setCode({...code, error: ''});
          }}
          onEndEditing={() => {
            !!code.value && validationCode();
          }}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    width: '100%',
    marginBottom: 20,
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
    textAlign: 'center',
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
