import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

export default function Register({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{width: '100%'}}
        onPress={() => navigation.navigate('Login')}>
        <Text style={{color: '#000'}}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Registry</Text>
      <View style={{width: '100%'}}>
        <Text style={styles.text}>Welcome back!</Text>
      </View>
      <TextInput style={styles.textInput} placeholder="Email"></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry></TextInput>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registry</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Have an account? Login</Text>
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
    marginVertical: 16,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#696969',
    letterSpacing: 0.75,
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
});
