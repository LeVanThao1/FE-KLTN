import {Spinner, View} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {queryData} from '../../common';
import {GET_BOOKS_CATEGORY} from '../../query/book';
import ProductCart from '../../components/productCart';
import {styles} from './styles';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
const BookByCategory = ({navigation, category, type}) => {
  return useObserver(() => {
    const {
      stores: {book},
    } = useContext(MobXProviderContext);
    const {booksCategory, setBooksCategory} = book;

    return (
      <>
        <View style={styles.bookByCategory}>
          {booksCategory[category] &&
            booksCategory[category].map((bk) => (
              <ProductCart
                key={bk.id}
                book={bk}
                type={true}
                navigation={navigation}
              />
            ))}
        </View>
        {booksCategory[category] ? (
          booksCategory[category].length > 0 ? (
            type ? null : (
              <TouchableOpacity
                style={styles.seeMoreContainer}
                onPress={() =>
                  navigation.navigate('Products', {categoryId: category})
                }>
                <Text style={styles.seeMoreText}>XEM THÊM SẢN PHẨM</Text>
              </TouchableOpacity>
            )
          ) : (
            <View
              style={{
                ...styles.seeMoreContainer,
                marginTop: 0,
                marginBottom: 20,
              }}>
              <Text style={styles.seeMoreText}>HIỆN TẠI CHƯA CÓ SẢN PHẨM</Text>
            </View>
          )
        ) : null}
      </>
    );
  });
};

export default memo(BookByCategory);
