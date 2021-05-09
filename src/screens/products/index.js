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
  Dimensions,
} from 'react-native';
import {queryData} from '../../common';
import ProductCart from '../../components/productCart';
import {GET_BOOKS, GET_BOOKS_CATEGORY} from '../../query/book';
import BookByCategory from '../home/bookByCategory';
import {styles} from './styles';
import {COLORS} from '../../constants/index';

const Products = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {book, category},
    } = useContext(MobXProviderContext);
    const [refreshing, setRefreshing] = React.useState(false);
    const {
      books,
      setBooks,
      booksCategory,
      setBooksCategory,
      booksSearch,
    } = book;
    const {
      categories,
      setCategory,
      selectCategory,
      setSelectCategory,
      option,
      setOption,
    } = category;
    const [loading, setLoading] = useState(true);
    const [loadingByCategory, setLoadingByCategory] = useState(false);

    useEffect(() => {
      if (selectCategory === 'all') {
        if (option.page !== 1) {
          setLoading(true);
          queryData(GET_BOOKS, {
            ...option,
          })
            .then(({data}) => {
              if (data.books.length > 0) setBooks([...books, ...data.books]);
              else {
                setOption({...option, page: option.page - 1});
              }
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        }
      } else {
        if (booksCategory[selectCategory]) {
          if (option.page === 1) {
            return;
          } else {
            setLoading(true);
            queryData(GET_BOOKS_CATEGORY, {id: selectCategory, ...option})
              .then(({data}) => {
                if (data.booksByCategory.length > 0)
                  setBooksCategory({
                    ...booksCategory,
                    [selectCategory]: data.booksByCategory,
                  });
                else {
                  setOption({...option, page: option.page - 1});
                }
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          }
        }
      }
    }, [option]);

    useEffect(() => {
      if (selectCategory !== 'all') {
        if (!booksCategory[selectCategory]) {
          setLoadingByCategory(true);
          queryData(GET_BOOKS_CATEGORY, {id: selectCategory, ...option})
            .then(({data}) => {
              setBooksCategory({
                ...booksCategory,
                [selectCategory]: data.booksByCategory,
              });
              setLoadingByCategory(false);
            })
            .catch((err) => {
              console.log(err);
              setLoadingByCategory(false);
            });
        }
      }
    }, [selectCategory]);

    useEffect(() => {
      setOption({
        limit: 20,
        page: 1,
      });

      setSelectCategory('all');
      if (refreshing) {
        queryData(GET_BOOKS, {
          limit: 20,
          page: 1,
        })
          .then(({data}) => {
            setBooks(data.books);
            setRefreshing(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [refreshing]);

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
        }
        onMomentumScrollEnd={(e) => {
          const scrollPosition = e.nativeEvent.contentOffset.y;
          const scrolViewHeight = e.nativeEvent.layoutMeasurement.height;
          const contentHeight = e.nativeEvent.contentSize.height;
          const isScrolledToBottom = scrolViewHeight + scrollPosition;
          if (isScrolledToBottom + 150 >= contentHeight) {
            setOption({...option, page: option.page + 1});
          }
        }}>
        <View style={styles.body}>
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
                  <TouchableOpacity
                    onPress={() => {
                      setSelectCategory('all');
                      setOption({...option, page: 1});
                    }}>
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
                        onPress={() => {
                          setSelectCategory(e.id);
                          setOption({...option, page: 1});
                        }}>
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
            {booksSearch ? (
              booksSearch.length > 0 ? (
                <View style={styles.bookByCategory}>
                  {booksSearch.map((bk) => (
                    <ProductCart
                      key={bk.id}
                      book={bk}
                      type={true}
                      navigation={navigation}
                    />
                  ))}
                </View>
              ) : (
                <View
                  style={{
                    ...styles.seeMoreContainer,
                    marginTop: 0,
                    marginBottom: 20,
                  }}>
                  <Text style={styles.seeMoreText}>
                    KHÔNG TÌM THẤY KẾT QUẢ PHÙ HỢP
                  </Text>
                </View>
              )
            ) : (
              <>
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
                    {books
                      ? books.length === 0 && (
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
                      : null}
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
                          type={true}
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
              </>
            )}

            {loading && <Spinner color={COLORS.primary} size="small" />}
          </View>
        </View>
      </ScrollView>
    );
  });
};

export default memo(Products);
