import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';

import {passwordValidator} from '../../utils/validations';
import {RESET_PASSWORD} from '../../query/user';
import {Notification} from '../../utils/notifications';
import {NOTIFI} from '../../constants';
import Toast from 'react-native-toast-message';

export default function ResetPassword({navigation, route}) {
  console.log(token);
  const {token} = route.params;
  const onPress = () => {
    if (validateConfirmPassword(true) + validatePassword(true) !== 2) return;
    resetPassword({
      variables: {
        token,
        password: newPassword.value,
      },
    });
    //handle here
  };
  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      navigation.navigate('Login');
    },
    onError: (err) => {
      Toast.show(Notification(NOTIFI.error, err.message));
      console.log(err);
    },
  });
  const [newPassword, setNewPassword] = useState({
    value: '',
    error: '',
    display: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
    display: false,
  });

  const validatePassword = (type) => {
    if (!newPassword.value.trim() && type) {
      setNewPassword((cur) => ({...cur, error: 'Enter password'}));
      return false;
    }
    if (!passwordValidator(newPassword.value) && newPassword.value) {
      setNewPassword((cur) => ({
        ...cur,
        error:
          'The password must contain at least 1 digit, 1 uppercase character, 1 lowercase character and at least 8 characters',
      }));
      return false;
    }
    return true;
  };

  const validateConfirmPassword = (type) => {
    if (!confirmPassword.value.trim() && type) {
      setConfirmPassword((cur) => ({
        ...cur,
        error: 'Enter confirm new password',
      }));
      return false;
    }
    if (newPassword.value.trim() !== confirmPassword.value.trim()) {
      setConfirmPassword((cur) => ({
        ...cur,
        error: 'Password must match',
      }));
      return false;
    }

    if (!passwordValidator(confirmPassword.value) && confirmPassword.value) {
      setConfirmPassword((cur) => ({
        ...cur,
        error:
          'The password must contain at least 1 digit, 1 uppercase character, 1 lowercase character and at least 8 characters',
      }));
      return false;
    }
    return true;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{width: '100%'}}
        onPress={() => navigation.navigate('Login')}>
        <Text style={{color: 'rgba(68, 108, 179, 1)', fontWeight: 'bold'}}>
          {'Trở lại'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>Thiết lập lại mật khẩu</Text>
      <View style={{width: '100%'}}>
        <Text style={styles.text}>Chào mừng bạn quay trở lại!</Text>
      </View>
      <View style={styles.containerText}>
        <TextInput
          style={{
            ...styles.textInput,
            borderColor: !!newPassword.error ? 'red' : '#696969',
          }}
          placeholder="Password"
          secureTextEntry={!newPassword.display}
          value={newPassword.value}
          onFocus={() => {
            setNewPassword({...newPassword, error: ''});
          }}
          onChangeText={(value) => {
            setNewPassword({
              ...newPassword,
              value: value,
            });
          }}
          onEndEditing={() => {
            !!newPassword.value && validatePassword();
          }}
        />
        <Icon
          name={newPassword.display ? 'eye-off-outline' : 'eye-outline'}
          style={styles.icon}
          type="Ionicons"
          onPress={() =>
            setNewPassword({...newPassword, display: !newPassword.display})
          }
        />
      </View>

      <Text style={styles.err}>{newPassword.error}</Text>
      <View style={styles.containerText}>
        <TextInput
          style={{
            ...styles.textInput,
            borderColor: !!confirmPassword.error ? 'red' : '#696969',
          }}
          placeholder="Confirm password"
          secureTextEntry={!confirmPassword.display}
          value={confirmPassword.value}
          onFocus={() => {
            setConfirmPassword({...confirmPassword, error: ''});
          }}
          onChangeText={(value) => {
            setConfirmPassword({
              ...confirmPassword,
              value: value,
            });
          }}
          onEndEditing={() => {
            !!confirmPassword.value && validateConfirmPassword();
          }}
        />
        <Icon
          name={confirmPassword.display ? 'eye-off-outline' : 'eye-outline'}
          style={styles.icon}
          type="Ionicons"
          onPress={() =>
            setConfirmPassword({
              ...confirmPassword,
              display: !confirmPassword.display,
            })
          }
        />
      </View>

      <Text style={styles.err}>{confirmPassword.error}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 23,
    width: '100%',
    marginBottom: 20,
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
    backgroundColor: 'rgba(68, 108, 179, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 4,
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
    textAlign: 'left',
  },
});
