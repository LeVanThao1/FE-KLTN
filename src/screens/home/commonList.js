import React, {memo, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import Images from '../../assets/images/images';
import {useLazyQuery} from '@apollo/client';
import {GET_BOOKS} from '../../query/book';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';

const CommonList = () => {
  return useObserver(() => {
    const {
      stores: {book},
    } = useContext(MobXProviderContext);
    const {books} = book;
    const navigation = useNavigation();
    const [listItem, setListItem] = useState(null);
    useEffect(() => {
      books &&
        setListItem(
          books?.map((ct, i) => ({
            id: ct.id,
            name: ct.book ? ct.book.name : ct.name,
            price: ct.price,
            image: ct.book ? ct.book.images[0] : ct.images[0],
            selled: ct.amount,
          })),
        );
    }, [books]);

    const productHandler = () => {
      console.log('buy book');
    };
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
          // onPress={() => productHandler()}
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
          <Text style={styles.header_text}>Common</Text>
        </View>
        <View style={styles.category__row}>
          <FlatList
            // onPress={() => productHandler()}
            //   style={styles.flat_list}
            data={listItem && listItem}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>
      </View>
    );
  });
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
    backgroundColor: '#f44f4f',
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
    alignItems: 'center',
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
    color: '#f44f4f',
  },
  selled: {
    flexDirection: 'row',
  },
});

export default memo(CommonList);
