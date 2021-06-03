import {useLazyQuery} from '@apollo/client';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {COLORS, NOTIFI} from '../../constants';
import {FORGOT_PASSWORD} from '../../query/user';
import {Notification} from '../../utils/notifications';
import {deFormatPhone, formatPhone} from '../../utils/support/phoneFormat';
import {emailValidator, phoneNumberValidator} from '../../utils/validations';

export default function ResetPassword({navigation}) {
  const [forgotPassword] = useLazyQuery(FORGOT_PASSWORD, {
    onCompleted: (data) => {
      navigation.navigate('VerifyForgot', {
        type: typeForgot,
        account: account.value,
      });
    },
    onError: (err) => {
      Toast.show(Notification(NOTIFI.error, err.message));
      console.log(err);
    },
  });
  const onPress = () => {
    if (!validateAccount(true)) return;
    forgotPassword({
      variables: {
        type: typeForgot,
        email: account.value.trim().toLowerCase(),
        phone: typeForgot ? deFormatPhone(account.value) : '',
      },
    });
    //handle here
  };
  const [account, setAccount] = useState({
    value: '',
    error: '',
  });
  const [typeForgot, setTypeForgot] = useState(false);

  const validateAccount = (type) => {
    if (!account.value.trim() && type) {
      setUserId({
        ...account,
        error: 'Enter email or phone number',
      });
      return false;
    }
    if (typeForgot) {
      if (!phoneNumberValidator(deFormatPhone(account.value))) {
        setAccount({
          ...account,
          error: 'Incorrect phone number',
        });
        return false;
      }
    } else {
      if (!emailValidator(account.value)) {
        setAccount({
          ...userId,
          error: 'Incorrect email address',
        });
        return false;
      }
    }
    return true;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{width: '100%'}}
        onPress={() => navigation.navigate('Login')}>
        <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
          {'Trở lại'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>Lấy lại mật khẩu</Text>
      <View style={{width: '100%'}}>
        <Text style={styles.text}>Chào mừng bạn quay trở lại!</Text>
      </View>
      <View style={styles.containerText}>
        <TextInput
          style={{
            ...styles.textInput,
            borderColor: !!account.error ? 'red' : '#696969',
          }}
          placeholder="Email or phone number"
          value={account.value}
          onFocus={() => {
            setAccount({...account, error: ''});
          }}
          onChangeText={(value) => {
            if (value.length === 1) {
              setTypeForgot(Number.isInteger(parseInt(value)));
            }

            setAccount({
              ...account,
              value: typeForgot ? formatPhone(value) : value,
            });
          }}
          onEndEditing={() => {
            !!account.value && validateAccount();
          }}
        />
      </View>

      <Text style={styles.err}>{account.error}</Text>
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
