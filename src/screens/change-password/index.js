import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/themes';
import {passwordValidator} from '../../utils/validations';
export default function ForgotPassword({navigation}) {
  const onPress = () => {
    if (validateConfirmPassword(true) + validatePassword(true) !== 3) return;
    //handle here
  };

  const [currentPassword, setCurrentPassword] = useState({
    value: '',
    error: '',
    display: false,
  });
  const [newPassword, setNewPassword] = useState({
    value: '',
    error: '',
    display: false,
  });
  const [confirmNewPassword, setConfirmNewPassword] = useState({
    value: '',
    error: '',
    display: false,
  });

  const validateCurrentPassword = (type) => {
    if (!currentPassword.value.trim() && type) {
      setCurrentPassword((cur) => ({...cur, error: 'Enter password'}));
      return false;
    }
    if (!passwordValidator(currentPassword.value) && currentPassword.value) {
      setCurrentPassword((cur) => ({
        ...cur,
        error:
          'The password must contain at least 1 digit, 1 uppercase character, 1 lowercase character and at least 8 characters',
      }));
      return false;
    }
    return true;
  };

  const validateNewPassword = (type) => {
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
  const validateConfirmNewPassword = (type) => {
    if (!confirmNewPassword.value.trim() && type) {
      setConfirmNewPassword((cur) => ({
        ...cur,
        error: 'Enter confirm password',
      }));
      return false;
    }
    if (password.value.trim() !== confirmNewPassword.value.trim()) {
      setConfirmNewPassword((cur) => ({
        ...cur,
        error: 'Password must match',
      }));
      return false;
    }

    if (
      !passwordValidator(confirmNewPassword.value) &&
      confirmNewPassword.value
    ) {
      setConfirmNewPassword((cur) => ({
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
      <View style={{width: '100%'}}>
        <Text style={styles.text}>Chào mừng bạn quay trở lại!</Text>
      </View>
      <View style={styles.containerText}>
        <TextInput
          style={{
            ...styles.textInput,
            borderColor: !!currentPassword.error ? 'red' : '#696969',
          }}
          placeholder="Current Password"
          secureTextEntry={!currentPassword.display}
          value={currentPassword.value}
          onFocus={() => {
            setCurrentPassword({...currentPassword, error: ''});
          }}
          onChangeText={(value) => {
            setCurrentPassword({
              ...currentPassword,
              value: value,
            });
          }}
          onEndEditing={() => {
            !!currentPassword.value && validateCurrentPassword();
          }}
        />
        <Icon
          name={newPassword.display ? 'eye-off-outline' : 'eye-outline'}
          style={styles.icon}
          type="Ionicons"
          onPress={() =>
            setCurrentPassword({
              ...currentPassword,
              display: !currentPassword.display,
            })
          }
        />
      </View>

      <Text style={styles.err}>{currentPassword.error}</Text>
      <View style={styles.containerText}>
        <TextInput
          style={{
            ...styles.textInput,
            borderColor: !!newPassword.error ? 'red' : '#696969',
          }}
          placeholder="New Password"
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
            !!newPassword.value && validateNewPassword();
          }}
        />
        <Icon
          name={newPassword.display ? 'eye-off-outline' : 'eye-outline'}
          style={styles.icon}
          type="Ionicons"
          onPress={() =>
            setNewPassword({
              ...newPassword,
              display: !newPassword.display,
            })
          }
        />
      </View>
      <Text style={styles.err}>{newPassword.error}</Text>
      <View style={styles.containerText}>
        <TextInput
          style={{
            ...styles.textInput,
            borderColor: !!confirmNewPassword.error ? 'red' : '#696969',
          }}
          placeholder="Confirm new password"
          secureTextEntry={!confirmNewPassword.display}
          value={confirmNewPassword.value}
          onFocus={() => {
            setConfirmNewPassword({...confirmNewPassword, error: ''});
          }}
          onChangeText={(value) => {
            setConfirmNewPassword({
              ...confirmNewPassword,
              value: value,
            });
          }}
          onEndEditing={() => {
            !!confirmNewPassword.value && validateConfirmNewPassword();
          }}
        />
        <Icon
          name={confirmNewPassword.display ? 'eye-off-outline' : 'eye-outline'}
          style={styles.icon}
          type="Ionicons"
          onPress={() =>
            setConfirmNewPassword({
              ...confirmNewPassword,
              display: !confirmNewPassword.display,
            })
          }
        />
      </View>
      <Text style={styles.err}>{confirmNewPassword.error}</Text>
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
