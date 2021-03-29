import {useLazyQuery} from '@apollo/client';
import {Button} from 'native-base';
import React, {useState, memo} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {GET_USER} from '../../query/user';
import {SliderBox} from 'react-native-image-slider-box';
import Images from '../../assets/images/images';
import CategoryIcon from './categoryIcon';
import CommonList from './commonList';
import Favourite from './favourite';
import MangaList from './manga';

const Home = ({navigation}) => {
  const [getUser, {called, loading, data, error}] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const [images, setImages] = useState([
    Images.slider1,
    Images.slider2,
    Images.slider3,
    Images.slider4,
  ]);
  return (
    <View style={styles.home__container}>
      <ScrollView>
        <SliderBox images={images} autoplay={true} circleLoop={true} />
        <View style={styles.category__icon}>
          <CategoryIcon />
        </View>
        <View style={styles.category__icon}>
          <CommonList />
        </View>
        <View style={styles.category__icon}>
          <MangaList />
        </View>
        <View style={styles.category__icon}>
          <Favourite />
        </View>
        {/* <View style={styles.center}>
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
    </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  home__container: {
    flex: 1,
    height: '100%',
  },
});
export default memo(Home);
