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
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(true);
      queryData(GET_BOOKS_CATEGORY, {id: category})
        .then(({data}) => {
          setBooksCategory({
            ...booksCategory,
            [category]: data.booksByCategory,
          });
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }, []);

    return (
      <>
        <View style={styles.bookByCategory}>
          {!loading ? (
            booksCategory[category] &&
            booksCategory[category].map((bk) => (
              <ProductCart
                key={bk.id}
                book={bk}
                type={true}
                navigation={navigation}
              />
            ))
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <Spinner color="rgba(68, 108, 179, 1)" />
            </View>
          )}
        </View>
        {!loading && booksCategory[category] ? (
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
