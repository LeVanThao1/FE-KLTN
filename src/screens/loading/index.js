import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {_navigator} from '../../navigation/constants';

const Loading = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate(_navigator.cart);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.linearGradient}>
      {/* <FastImage
        source={require('../../assets/images/background-loading.jpg')}
        style={styles.imgStyle}
      /> */}
      <Text>adsd</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imgStyle: {
    flex: 1,
  },
});

export default Loading;
