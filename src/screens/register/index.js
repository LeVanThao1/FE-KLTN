import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Register = () => {
  return (
    <View style={styles.center}>
      <Text>This is the register screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Register;
