import {useLazyQuery, useQuery} from '@apollo/client';
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
import {GET_BOOK} from '../../query/user';

const Home = ({navigation}) => {
  // const [getUser, {called, loading, data, error}] = useLazyQuery(GET_USER, {
  //   onCompleted: (data) => {
  //     console.log(data);
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   },
  // });

  const {loading, error, data} = useQuery(GET_USER);
  console.log('data userrr', error);

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
          <View></View>
        </View>
      </ScrollView>
      {/* <BottomTabNavigator /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  home__container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
export default memo(Home);
