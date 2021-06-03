import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {View} from 'native-base';
import React, {memo, useContext} from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import ProductCart from '../../components/productCart';
import {styles} from './styles';
const BookByCategory = ({navigation, category, type}) => {
  return useObserver(() => {
    const {
      stores: {book},
    } = useContext(MobXProviderContext);
    const {booksCategory, setBooksCategory} = book;

    return (
      <>
        {booksCategory[category] && (
          <FlatList
            contentContainerStyle={styles.bookByCategory}
            data={booksCategory[category]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <ProductCart
                key={index.toString()}
                book={item}
                type={true}
                navigation={navigation}
              />
            )}></FlatList>
        )}
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
