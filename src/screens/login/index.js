import {Button} from 'native-base';
import React, {useContext} from 'react';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {_navigator} from '../../navigation';

const Login = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {auth},
    } = useContext(MobXProviderContext);
    console.log(auth);
    return (
      <View style={styles.center}>
        <Text>This is the login screen</Text>
        <View style={styles.button}>
          <Button
            info
            onPress={() => {
              auth.setIsAuth(true);
            }}>
            <Text> Login </Text>
          </Button>
        </View>
      </View>
    );
  });
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
