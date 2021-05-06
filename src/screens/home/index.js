import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Spinner} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Images from '../../assets/images/images';
import {queryData} from '../../common';
import ProductCart from '../../components/productCart';
import {GET_BOOKS_CATEGORY} from '../../query/book';
import {GET_HOME} from '../../query/home';
import BookByCategory from './bookByCategory';
import {styles} from './styles';
import {COLORS} from '../../constants/themes'

const Home = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {book, user, category},
    } = useContext(MobXProviderContext);
    const [refreshing, setRefreshing] = React.useState(false);
    const {books, setBooks, booksCategory, setBooksCategory} = book;
    const {
      categories,
      setCategory,
      selectCategory,
      setSelectCategory,
    } = category;
    const [loading, setLoading] = useState(true);
    const [bookSell, setBookSell] = useState(undefined);
    const [loadingByCategory, setLoadingByCategory] = useState(false);
    useEffect(() => {
      setLoading(true);
      setSelectCategory('all');
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

    useEffect(() => {
      if (selectCategory !== 'all') {
        setLoadingByCategory(true);
        queryData(GET_BOOKS_CATEGORY, {id: selectCategory})
          .then(({data}) => {
            setBooksCategory({
              ...booksCategory,
              [selectCategory]: data.booksByCategory,
            });
            setLoadingByCategory(false);
          })
          .catch((err) => console.log(err));
      }
    }, [selectCategory]);

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
              <View>
                <Text style={styles.title}>BEST SELL</Text>
              </View>
              <ScrollView horizontal={true} style={styles.scroll__view}>
                {bookSell && (
                  <View style={styles.filterContainer}>
                    <ScrollView horizontal={true}>
                      <View style={styles.listItemContainer}>
                        {bookSell &&
                          bookSell.map((e, index) => (
                            <ProductCart
                              key={e.id}
                              book={e}
                              navigation={navigation}
                            />
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
                      selectCategory === 'all'
                        ? styles.filterActiveButtonContainer
                        : styles.filterInactiveButtonContainer
                    }>
                    <TouchableOpacity onPress={() => setSelectCategory('all')}>
                      <Text
                        style={
                          selectCategory === 'all'
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
                          e.id + '' === selectCategory + ''
                            ? styles.filterActiveButtonContainer
                            : styles.filterInactiveButtonContainer
                        }>
                        <TouchableOpacity
                          onPress={() => setSelectCategory(e.id)}>
                          <Text
                            style={
                              e.id + '' === selectCategory + ''
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
              {/* <View style={styles.bookByCategory}> */}
              {selectCategory === 'all' && (
                <>
                  <View style={styles.bookByCategory}>
                    {books &&
                      books.map((bk) => (
                        <ProductCart
                          key={bk.id}
                          book={bk}
                          type={true}
                          navigation={navigation}
                        />
                      ))}
                  </View>
                  {books ? (
                    books.length > 0 ? (
                      <TouchableOpacity
                        style={styles.seeMoreContainer}
                        onPress={() =>
                          navigation.navigate('Products', {categoryId: 'all'})
                        }>
                        <Text style={styles.seeMoreText}>
                          XEM THÊM SẢN PHẨM
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={{
                          ...styles.seeMoreContainer,
                          marginTop: 0,
                          marginBottom: 20,
                        }}>
                        <Text style={styles.seeMoreText}>
                          HIỆN TẠI CHƯA CÓ SẢN PHẨM
                        </Text>
                      </View>
                    )
                  ) : null}
                </>
              )}
              {!loadingByCategory ? (
                categories &&
                categories.map(
                  (ct) =>
                    selectCategory + '' === ct.id + '' && (
                      <BookByCategory
                        navigation={navigation}
                        category={ct.id}
                      />
                    ),
                )
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <Spinner color={COLORS.primary} />
                </View>
              )}
              {/* {books &&
                  books.map((bk) => (
                    <ProductItem
                      key={bk.id}
                      book={bk}
                      type={true}
                      navigation={navigation}
                    />
                  ))} */}
              {/* </View> */}
              {/* <View style={styles.seeMoreContainer}>
                <Text style={styles.seeMoreText}>XEM TẤT CẢ SẢN PHẨM</Text>
              </View> */}
            </View>
          </View>
        ) : (
          <Spinner color={COLORS.primary}/>
        )}
      </ScrollView>
    );
  });
};

export default memo(Home);
