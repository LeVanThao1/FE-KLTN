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
import {REGISTER} from '../../query/user';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneNumberValidator,
} from '../../utils/validations';
import {deFormatPhone, formatPhone} from '../../utils/support/phoneFormat';
export default function Register({navigation}) {
  const [register, {called, loading, data, error}] = useMutation(REGISTER, {
    onCompleted: async (data) => {
      navigation.navigate('Verify', {
        userId: userId.value.trim().toLowerCase(),
        type: typeRegister,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const onPress = () => {
    if (
      validateUserId(true) +
        validateConfirmPassword(true) +
        validateName(true) +
        validatePassword(true) !==
      4
    )
      return;
    const newUser = {
      email: userId.value.trim().toLowerCase(),
      name: name.value,
      password: password.value.trim(),
      phone: typeRegister ? deFormatPhone(userId.value) : userId.value,
    };
    register({
      variables: {
        newUser,
        type: typeRegister,
      },
    });
  };
  const [userId, setUserId] = useState({
    value: '',
    error: '',
  });
  const [password, setPassword] = useState({
    value: '',
    error: '',
  });
  const [name, setName] = useState({
    value: '',
    error: '',
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });
  const [typeRegister, setTypeRegister] = useState(false);

  const validateUserId = (type) => {
    if (!userId.value.trim() && type) {
      setUserId({
        ...userId,
        error: 'Enter email or phone number',
      });
      return false;
    }
    if (typeRegister) {
      if (!phoneNumberValidator(deFormatPhone(userId.value))) {
        setUserId({
          ...userId,
          error: 'Incorrect phone number',
        });
        return false;
      }
    } else {
      if (!emailValidator(userId.value)) {
        setUserId({
          ...userId,
          error: 'Incorrect email address',
        });
        return false;
      }
    }
    return true;
  };
  const validateName = (type) => {
    if (!name.value.trim() && type) {
      setName((cur) => ({...cur, error: 'Enter name'}));
      return false;
    }
    // if (!nameValidator(name.value) && name.value) {
    //   setName((cur) => ({
    //     ...cur,
    //     error: 'The name must contain at least 3 characters',
    //   }));
    //   return false;
    // }
    return true;
  };
  const validatePassword = (type) => {
    if (!password.value.trim() && type) {
      setPassword((cur) => ({...cur, error: 'Enter password'}));
      return false;
    }
    if (!passwordValidator(password.value) && password.value) {
      setPassword((cur) => ({
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
      setConfirmPassword((cur) => ({...cur, error: 'Enter confirm password'}));
      return false;
    }
    if (password.value.trim() !== confirmPassword.value.trim()) {
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
      <Text style={styles.title}>Đăng ký</Text>
      <View style={{width: '100%'}}>
        <Text style={styles.text}>Chào mừng bạn quay trở lại!</Text>
      </View>
      <TextInput
        style={{
          ...styles.textInput,
          borderColor: !!userId.error ? 'red' : '#696969',
        }}
        placeholder="Email or Phone"
        value={userId.value}
        onFocus={() => {
          setUserId({...userId, error: ''});
        }}
        onChangeText={(value) => {
          if (value.length === 1) {
            setTypeRegister(Number.isInteger(parseInt(value)));
          }

          setUserId({
            ...userId,
            value: typeRegister ? formatPhone(value) : value,
          });
        }}
        onEndEditing={() => {
          !!userId.value && validateUserId();
        }}
      />
      <Text style={styles.err}>{userId.error}</Text>
      <TextInput
        style={{
          ...styles.textInput,
          borderColor: !!password.error ? 'red' : '#696969',
        }}
        placeholder="Name"
        value={name.value}
        onFocus={() => {
          setName({...name, error: ''});
        }}
        onChangeText={(value) => {
          setName({
            ...name,
            value: value,
          });
        }}
        onEndEditing={() => {
          !!name.value && validateName();
        }}
      />
      <Text style={styles.err}>{name.error}</Text>
      <View style={styles.containerText}>
        <TextInput
          style={{
            ...styles.textInput,
            borderColor: !!password.error ? 'red' : '#696969',
          }}
          placeholder="Password"
          secureTextEntry={!password.display}
          value={password.value}
          onFocus={() => {
            setPassword({...password, error: ''});
          }}
          onChangeText={(value) => {
            setPassword({
              ...password,
              value: value,
            });
          }}
          onEndEditing={() => {
            !!password.value && validatePassword();
          }}
        />
        <Icon
          name={password.display ? 'eye-off-outline' : 'eye-outline'}
          style={styles.icon}
          type="Ionicons"
          onPress={() => setPassword({...password, display: !password.display})}
        />
      </View>

      <Text style={styles.err}>{password.error}</Text>
      <View style={styles.containerText}>
        <TextInput
          style={{
            ...styles.textInput,
            borderColor: !!confirmPassword.error ? 'red' : '#696969',
          }}
          placeholder="Confirm new password"
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
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>
          Đã có tài khoản?{' '}
          <Text
            style={{
              ...styles.text,
              color: 'rgba(68, 108, 179, 1)',
              fontWeight: 'bold',
            }}>
            Đăng nhập.
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // alignItems: 'center',
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
