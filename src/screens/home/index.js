import {useLazyQuery, useQuery} from '@apollo/client';
import React, {useState, memo, useContext, useEffect} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {GET_USER} from '../../query/user';
import {SliderBox} from 'react-native-image-slider-box';
import Images from '../../assets/images/images';
import CategoryIcon from './categoryIcon';
import CommonList from './commonList';
import MangaList from './manga';
import {GET_BOOKS} from '../../query/book';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import Novel from './novel';
import Science from './science';
import Literary from './literary';

const Home = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {book, user},
    } = useContext(MobXProviderContext);
    const {books, setBooks} = book;
    console.log(user.info);
    const [getBooks, {called, loading, data, error}] = useLazyQuery(GET_BOOKS, {
      onCompleted: async (data) => {
        setBooks(data.books);
      },
      onError: (err) => {
        console.log(err);
      },
    });
    useEffect(() => {
      getBooks();
    }, []);

    const [images, setImages] = useState([
      Images.slider1,
      Images.slider2,
      Images.slider3,
      Images.slider4,
    ]);
    return (
      <View style={styles.home__container}>
        {!loading && (
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
              <Novel />
            </View>
            <View style={styles.category__icon}>
              <Science />
            </View>
            <View style={styles.category__icon}>
              <Literary />
            </View>
            <View style={styles.category__icon}>
              <History />
            </View>
          </ScrollView>
        )}
      </View>
    );
  });
};

const styles = StyleSheet.create({
  home__container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
export default memo(Home);
