import AsyncStorage from '@react-native-async-storage/async-storage';
import { MobXProviderContext } from 'mobx-react';
import { useObserver } from 'mobx-react-lite';
import { Button } from 'native-base';
import React, { useContext } from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Profile = () => {
  return useObserver(() => {
    const {
      stores: {auth, user},
    } = useContext(MobXProviderContext);
  return (
    <View style={styles.center}>
      <Text>This is the notification screen</Text>
      <Button onPress={() => {
        AsyncStorage.clear().then(() => {
          auth.setLogout()
        })
      }} ><Text>Logout</Text></Button>
    </View>
  );
  })
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Profile;
