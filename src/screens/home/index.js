import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {Icon} from 'native-base';
import {SliderBox} from 'react-native-image-slider-box';
import Images from '../../assets/images/images';
import CategoryIcon from './categoryIcon';
import CommonList from './commonList';
import Favourite from './favourite';
import MangaList from './manga';
import ProductList from './productsList';
const Home = (props) => {
  const [images, setImages] = useState([
    Images.slider1,
    Images.slider2,
    Images.slider3,
    Images.slider4,
  ]);
  return (
    <View style={styles.home__container}>
      <ScrollView>
        <SliderBox images={images} autoplay={true} />
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
        {/* <View>
          <ProductList />
        </View> */}
        {/* <Button
        onPress={() => {
          props.navigation.navigate('About');
        }}
        title="Go to About Screen"
      /> */}
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

export default Home;
