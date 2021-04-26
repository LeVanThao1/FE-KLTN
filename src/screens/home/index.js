import {useLazyQuery, useQuery} from '@apollo/client';
import React, {useState, memo, useContext, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {GET_USER} from '../../query/user';
import {SliderBox} from 'react-native-image-slider-box';
import Images from '../../assets/images/images';
import CategoryIcon from './categoryIcon';
import CommonList from './commonList';
import MangaList from './manga';
import {GET_BOOKS, GET_BOOK_SELL} from '../../query/book';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import Novel from './novel';
import Science from './science';
import Literary from './literary';
import History from './history';
import {NotiSuccess} from '../../utils/notifications';
import {GET_CATEGORIES} from '../../query/category';
const {width, height} = Dimensions.get('window');
import {queryData} from '../../common';
import {GET_HOME} from '../../query/home';
import {Spinner} from 'native-base';
const Home = ({navigation}) => {
  const ProductItem = ({book, type}) => (
    <TouchableOpacity
      style={type ? styles.itemContainer__all : styles.itemContainer}
      onPress={() =>
        navigation.navigate('Detail-Product', {productId: book.id})
      }>
      <Image
        source={{uri: book.book ? book.book.images[0] : book.images[0]}}
        style={styles.itemImage}
      />
      <Text style={styles.itemName} numberOfLines={1}>
        {book.book ? book.book.name : book.name}
      </Text>
      <Text style={styles.itemPrice}>{book.price}</Text>
    </TouchableOpacity>
  );
  return useObserver(() => {
    const {
      stores: {book, user, category},
    } = useContext(MobXProviderContext);
    const [refreshing, setRefreshing] = React.useState(false);
    const [books, setBooks] = useState(undefined);
    const {categories, setCategory} = category;
    const [loading, setLoading] = useState(true);
    const [bookSell, setBookSell] = useState(undefined);

    useEffect(() => {
      setLoading(true);
      queryData(GET_HOME)
        .then(({data}) => {
          const {books, categories, bestSell} = data.home;
          setBooks(books);
          setCategory(categories);
          setBookSell(bestSell);
          setRefreshing(false);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }, [refreshing]);

    const [chooseCategory, setChooseCategory] = useState(0);
    const [images, setImages] = useState([
      Images.slider1,
      Images.slider2,
      Images.slider3,
      Images.slider4,
    ]);
    return (
      <ScrollView
        style={styles.home__container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
            }}
          />
        }>
        <View style={styles.slider__container}>
          <SliderBox images={images} autoplay={true} circleLoop={true} />
        </View>
        {!loading ? (
          <View style={styles.body}>
            <View style={styles.bestSell}>
              <Text style={styles.title}>BEST SELL</Text>
              <ScrollView horizontal={true} style={styles.scroll__view}>
                {bookSell && (
                  <View style={styles.filterContainer}>
                    <ScrollView horizontal={true}>
                      <View style={styles.listItemContainer}>
                        {bookSell &&
                          bookSell.map((e, index) => (
                            <ProductItem key={e.id} book={e} />
                          ))}
                      </View>
                    </ScrollView>
                  </View>
                )}
              </ScrollView>
            </View>
            <View style={styles.all__book}>
              <ScrollView horizontal={true} style={styles.scroll__view}>
                <View style={styles.filterContainer}>
                  <View
                    key={'all'}
                    style={
                      chooseCategory === 0
                        ? styles.filterActiveButtonContainer
                        : styles.filterInactiveButtonContainer
                    }>
                    <TouchableOpacity onPress={() => setChooseCategory(0)}>
                      <Text
                        style={
                          chooseCategory === 0
                            ? styles.filterActiveText
                            : styles.filterInactiveText
                        }>
                        Tất cả
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {categories &&
                    categories.map((e, index) => (
                      <View
                        key={index.toString()}
                        style={
                          index + 1 === chooseCategory
                            ? styles.filterActiveButtonContainer
                            : styles.filterInactiveButtonContainer
                        }>
                        <TouchableOpacity
                          onPress={() => setChooseCategory(index + 1)}>
                          <Text
                            style={
                              index + 1 === chooseCategory
                                ? styles.filterActiveText
                                : styles.filterInactiveText
                            }>
                            {e.name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                </View>
              </ScrollView>
              <View style={styles.bookByCategory}>
                {books &&
                  books.map((bk) => (
                    <ProductItem key={bk.id} book={bk} type={true} />
                  ))}
              </View>
              <View style={styles.seeMoreContainer}>
                <Text style={styles.seeMoreText}>XEM TẤT CẢ SẢN PHẨM</Text>
              </View>
            </View>
          </View>
        ) : (
          <Spinner color="rgba(68, 108, 179, 1)" />
        )}
      </ScrollView>
    );
  });
};

const styles = StyleSheet.create({
  home__container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  slider__container: {
    borderRadius: 10,
    marginVertical: 10,
  },
  body: {
    marginHorizontal: 12,
  },
  title: {
    fontSize: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 0,
  },
  listItemContainer: {
    flexDirection: 'row',
    marginLeft: 0,
    paddingHorizontal: 12,
  },
  itemContainer__all: {
    width: (width - 60) / 2,
    marginBottom: 15,
    borderRadius: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  itemContainer: {
    width: 120,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  itemName: {
    fontSize: 14,
    paddingHorizontal: 5,
    color: '#484848',
    marginVertical: 4,
  },
  itemPrice: {
    paddingHorizontal: 5,
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(68, 108, 179, 1)',
  },
  filterActiveButtonContainer: {
    backgroundColor: 'rgba(68, 108, 179, 1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 10,
  },
  filterInactiveButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: '#5a5a5a',
    borderWidth: 1,
    marginRight: 10,
  },
  filterActiveText: {
    color: '#fff',
  },
  filterInactiveText: {
    color: '#000',
  },
  all__book: {
    marginVertical: 12,
  },
  scroll__view: {
    paddingVertical: 10,
  },
  bookByCategory: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  seeMoreContainer: {
    marginVertical: 6,
    borderTopWidth: 0.6,
    borderTopColor: '#ededed',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#0e45b4',
  },
});
export default memo(Home);
