import {useLazyQuery} from '@apollo/client';
import {Button} from 'native-base';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GET_USER} from '../../query/user';

const Home = ({navigation}) => {
  const [getUser, {called, loading, data, error}] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <View style={styles.center}>
      <Text>This is the home screen</Text>
      <Button
        onPress={() => {
          navigation.navigate('About');
        }}>
        <Text>Go to About Screen</Text>
      </Button>
      <Button
        onPress={() => {
          getUser();
        }}>
        <Text>get User</Text>
      </Button>
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

export default Home;
