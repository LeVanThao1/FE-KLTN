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
import formatMoney from '../../utils/format/index';

const Home = ({navigation}) => {
  const ProductItem = ({book}) => (
    <TouchableOpacity
      style={styles.itemContainer}
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
      <Text style={styles.itemPrice}>{formatMoney(book.price)}VND</Text>
    </TouchableOpacity>
  );
  return useObserver(() => {
    const {
      stores: {book, user, category},
    } = useContext(MobXProviderContext);
    const {books, setBooks} = book;
    const {categories, setCategory} = category;
    const [loading, setLoading] = useState(false);
    const [bookSell, setBookSell] = useState(undefined);
    const [getBooks, {}] = useLazyQuery(GET_BOOKS, {
      onCompleted: async (data) => {
        setBooks(data.books);
        setLoading(false);
      },
      onError: (err) => {
        console.log(err);
      },
    });
    const [getBooksSell, {}] = useLazyQuery(GET_BOOK_SELL, {
      onCompleted: async (data) => {
        setBookSell(data.bookSell);
      },
      onError: (err) => {
        console.log(err);
      },
    });

    const [getCategories, {}] = useLazyQuery(GET_CATEGORIES, {
      onCompleted: async (data) => {
        setCategory(data.categories);
        // setListItem(
        //   data.categories.map((ct, i) => ({
        //     id: ct.id,
        //     name: 'database',
        //     type: 'AntDesign',
        //     description: ct.name,
        //   })),
        // );
        // setLoading(false);
      },
      onError: (err) => {
        console.log(err);
      },
    });

    useEffect(() => {
      getBooksSell();
      getBooks();
      getCategories();
    }, []);

    const [chooseCategory, setChooseCategory] = useState(0);
    const [images, setImages] = useState([
      Images.slider1,
      'https://www.khaitam.com/Data/Sites/1/Product/116/hanh-trinh-ve-phuong-dong.jpg',
      Images.slider3,
      Images.slider4,
    ]);
    return (
      <View style={styles.home__container}>
        {!loading && (
          <ScrollView>
            <SliderBox images={images} autoplay={true} circleLoop={true} />
            <View
              style={{
                paddingBottom: 20,
                borderBottomWidth: 3,
                borderBottomColor: '#3e3e3e',
              }}>
              <Text style={styles.sectionTitle}>Best sell</Text>
              <ScrollView horizontal={true}>
                {bookSell && (
                  <View style={styles.filterContainer}>
                    <ScrollView horizontal={true}>
                      <View style={styles.listItemContainer}>
                        {bookSell &&
                          bookSell.map(
                            (e, index) =>
                              index % 2 === 0 &&
                              index < bookSell.length && (
                                <View key={index.toString()}>
                                  <ProductItem key={e.id} book={e} />
                                  <ProductItem
                                    key={bookSell && bookSell[index + 1].id}
                                    book={bookSell && bookSell[index + 1]}
                                  />
                                </View>
                              ),
                          )}
                      </View>
                    </ScrollView>
                  </View>
                )}
              </ScrollView>
            </View>
            <ScrollView horizontal={true}>
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
                      T???t c???
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
            <ScrollView horizontal={true}>
              <View style={styles.listItemContainer}>
                {books &&
                  books.map(
                    (e, index) =>
                      index % 2 === 0 &&
                      index < 10 && (
                        <View key={index.toString()}>
                          <ProductItem key={e.id} book={e} />
                          <ProductItem
                            key={books && books[index + 1].id}
                            book={books && books[index + 1]}
                          />
                        </View>
                      ),
                  )}
              </View>
            </ScrollView>

            <View style={styles.seeMoreContainer}>
              <Text style={styles.seeMoreText}>XEM T???T C??? S???N PH???M</Text>
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
    // paddingHorizontal: 12,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2f2f2f',
    paddingVertical: 10,
  },
  sectionImage: {
    width: width - 24,
    height: 130,
    borderRadius: 4,
  },
  //
  filterContainer: {
    flexDirection: 'row',
    marginTop: 0,
  },
  filterActiveButtonContainer: {
    backgroundColor: '#14ad5f',
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
  //
  listItemContainer: {
    flexDirection: 'row',
    marginLeft: 0,
    paddingHorizontal: 50,
  },
  itemContainer: {
    width: 120,
    marginRight: 10,
    marginTop: 15,
    borderColor: '#5a5a5a',
    borderWidth: 1,
  },
  itemImage: {
    width: '50%',
    height: 120,
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
    color: '#14ad5f',
  },
  seeMoreContainer: {
    marginTop: 10,
    padding: 12,
    borderTopWidth: 0.6,
    borderTopColor: '#ededed',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#0e45b4',
  },
});
export default memo(Home);
