import React, {memo, useContext, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Images from '../../assets/images/images';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import {useLazyQuery} from '@apollo/client';
import {GET_BOOKS_CATEGORIES} from '../../query/category';

const Novel = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState(null);
  const [listItem, setListItem] = useState(null);
  const [booksByCategory, {called, loading, data, error}] = useLazyQuery(
    GET_BOOKS_CATEGORIES,
    {
      onCompleted: async (data) => {
        setCategory(data?.booksByCategory);
        setListItem(
          data.booksByCategory.map((ct, i) => ({
            id: ct.id,
            name: ct.book ? ct.book.name : ct.name,
            price: ct.price,
            image: ct.book ? ct.book.images[0] : ct.images[0],
            selled: ct.amount,
          })),
        );
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  useEffect(() => {
    booksByCategory({
      variables: {
        id: '60581fe5b9f43e3e70f27882',
      },
    });
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.list_product}
      // onStartShouldSetResponder={() => navigation.navigate('Detail-Product')}
      onPress={() =>
        navigation.navigate('Detail-Product', {productId: item.id})
      }>
      <Image
        source={{uri: item.image}}
        style={{width: '90%', height: 130, resizeMode: 'cover'}}
        // onPress={() => ProductHandler()}
        // thế là lúc nãy chắc do load lâu quá nên t tưởng k load dc , mà sao nó render những file  file log m nam o dau nao dau là sao lần thế
      />
      <View>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.content}>
          <Text style={styles.price}>Giá: {item.price}</Text>
        </View>
        <View style={styles.selled}>
          <Text>Còn lại: </Text>
          <Text>{item.selled}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.category__container}>
      <View style={styles.category_header}>
        <Text style={styles.header_text}>Tiểu thuyết</Text>
      </View>
      <View style={styles.category__row}>
        <FlatList
          // onPress={() => ProductHandler()}
          //   style={styles.flat_list}
          data={listItem && listItem}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  category__container: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: 10,
  },
  category__row: {
    flexDirection: 'row',
  },
  flat_list: {
    padding: 4,
    margin: 4,
    alignItems: 'center',
  },
  category_header: {
    backgroundColor: 'rgba(68, 108, 179, 1)',
  },
  header_text: {
    fontSize: 17,
    padding: 10,
    color: '#fff',
  },
  list_product: {
    width: 150,
    height: 225,
    padding: 5,
    margin: 4,
    // alignItems: 'center',
    borderWidth: 0.2,
    borderRadius: 6,
  },

  name: {
    paddingVertical: 8,
    fontSize: 15,
    textShadowColor: 'red',
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'rgba(68, 108, 179, 1)',
  },
  selled: {
    flexDirection: 'row',
  },
});
export default memo(Novel);
