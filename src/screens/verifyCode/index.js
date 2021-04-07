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

export default function VerifyCode() {
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    console.log(code);
  }, [code]);

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
          style={styles.textInput}
          value={code}
          onChangeText={(value) => setCode(value)}
        />
      </View>

      <TouchableOpacity style={styles.button}>
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
