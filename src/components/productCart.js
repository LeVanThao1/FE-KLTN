import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');

const ProductCart = ({navigation, book, type}) => (
  <TouchableOpacity
    style={type ? styles.itemContainer__all : styles.itemContainer}
    onPress={() => navigation.navigate('Detail-Product', {productId: book.id})}>
    <Image
      source={{uri: book.book ? book.book.images[0] : book.images[0]}}
      style={styles.itemImage}
    />
    <Text style={styles.itemName} numberOfLines={1}>
      {book.book ? book.book.name : book.name}
    </Text>
    <Text style={styles.itemPrice}>{book.price}</Text>
  </TouchableOpacity>
);

export default ProductCart;
const styles = StyleSheet.create({
  itemContainer__all: {
    width: (width - 60) / 2,
    marginBottom: 15,
    borderRadius: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  itemContainer: {
    width: 120,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
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
    color: 'rgba(68, 108, 179, 1)',
  },
});
