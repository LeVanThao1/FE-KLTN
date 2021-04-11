import React, {memo} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {Icon} from 'native-base';
import Images from '../../assets/images/images';

const ProductList = () => {
  const listItem1 = [
    {
      id: 1,
      name: 'How',
      price: 108000,
      image: Images.rich,
    },
    {
      id: 2,
      name: 'How to become pooer',
      price: 108000,
      image: Images.poor,
    },
    {
      id: 3,
      name: 'OnePiece vs Teech',
      price: 108000,
      image: Images.onepiece1,
    },
    {
      id: 4,
      name: 'OnePiece vs Kaido',
      price: 108000,
      image: Images.onepiece2,
    },
    {
      id: 5,
      name: 'OnePiece vs BigMom',
      price: 108000,
      image: Images.onepiece1,
    },
  ];

  const ProductHandler = () => {
    console.log('buy book');
  };

  return (
    <View style={styles.category__container}>
      <View style={styles.category_header}>
        <Text style={styles.header_text}>Common</Text>
      </View>
      <View style={styles.category__row}>
        <View style={styles.list_product} onPress={() => ProductHandler()}>
          <Image
            source={listItem1.image}
            style={{width: 100, height: 150}}
            // onPress={() => ProductHandler()}
          />
          <View>
            <Text style={styles.name}>{listItem1.name}</Text>
            <Text style={styles.price}>{listItem1.price}</Text>
          </View>
        </View>
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
    padding: 5,
    margin: 4,
    alignItems: 'center',
    borderWidth: 0.6,
    borderRadius: 5,
  },

  name: {
    fontSize: 15,
    textShadowColor: 'red',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'rgba(68, 108, 179, 1)',
  },
});

export default memo(ProductList);
