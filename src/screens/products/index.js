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
import {GET_BOOKS} from '../../query/book';
import BookByCategory from '../home/bookByCategory';
import {styles} from './styles';

const Products = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {book, category},
    } = useContext(MobXProviderContext);
    const {categoryId} = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const {books, setBooks} = book;
    const {categories, setCategory} = category;
    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState({
      limit: 20,
      page: 1,
    });
    useEffect(() => {
      if (option.page !== 1) {
        setLoading(true);
        queryData(GET_BOOKS, {
          ...option,
        })
          .then(({data}) => {
            setBooks([...books, ...data.books]);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    }, [option]);

    useEffect(() => {
      setOption({
        limit: 20,
        page: 1,
      });
      if (refreshing) {
        setLoading(true);
        queryData(GET_BOOKS, {
          limit: 20,
          page: 1,
        })
          .then(({data}) => {
            setBooks(data.books);
            setRefreshing(false);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    }, [refreshing]);

    const [chooseCategory, setChooseCategory] = useState(categoryId);
    return (
      <ScrollView
        style={styles.home__container}
        onMomentumScrollEnd={(e) => {
          const scrollPosition = e.nativeEvent.contentOffset.y;
          const scrolViewHeight = e.nativeEvent.layoutMeasurement.height;
          const contentHeight = e.nativeEvent.contentSize.height;
          const isScrolledToBottom = scrolViewHeight + scrollPosition;
          if (isScrolledToBottom + 100 >= contentHeight) {
            setOption((cur) => ({...cur, page: cur.page + 1}));
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
            }}
          />
        }>
        <View style={styles.body}>
          <View style={styles.all__book}>
            <ScrollView horizontal={true} style={styles.scroll__view}>
              <View style={styles.filterContainer}>
                <View
                  key={'all'}
                  style={
                    chooseCategory === 'all'
                      ? styles.filterActiveButtonContainer
                      : styles.filterInactiveButtonContainer
                  }>
                  <TouchableOpacity onPress={() => setChooseCategory('all')}>
                    <Text
                      style={
                        chooseCategory === 'all'
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
                        e.id + '' === chooseCategory + ''
                          ? styles.filterActiveButtonContainer
                          : styles.filterInactiveButtonContainer
                      }>
                      <TouchableOpacity onPress={() => setChooseCategory(e.id)}>
                        <Text
                          style={
                            e.id + '' === chooseCategory + ''
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
            {chooseCategory === 'all' && (
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

            {categories &&
              categories.map(
                (ct) =>
                  chooseCategory + '' === ct.id + '' && (
                    <BookByCategory
                      navigation={navigation}
                      category={ct.id}
                      type={true}
                    />
                  ),
              )}
            {loading && <Spinner color="rgba(68, 108, 179, 1)" size="small" />}
          </View>
        </View>
      </ScrollView>
    );
  });
};

export default memo(Products);
