import {Button} from 'native-base';
import React, {useContext} from 'react';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';

const Login = () => {
  // return useObserver(() => {
  //   const {
  //     stores: {
  //       auth: {setIsAuth},
  //     },
  //   } = useContext(MobXProviderContext);
  return (
    <View style={styles.center}>
      <Text>This is the login screen</Text>
      <View style={styles.button}>
        <Button info onPress={() => setIsAuth(true)}>
          <Text> Login </Text>
        </Button>
      </View>
    </View>
  );
  // });
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
