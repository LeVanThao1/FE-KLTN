import React, {memo} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Images from '../../assets/images/images';

const MangaList = () => {
  const navigation = useNavigation();
  const listItem1 = [
    {
      id: 1,
      name: 'How to become richer',
      price: 108000,
      image: Images.rich,
      selled: 11,
    },
    {
      id: 2,
      name: 'How to become pooer',
      price: 108000,
      image: Images.poor,
      selled: 11,
    },
    {
      id: 3,
      name: 'OnePiece vs Teech',
      price: 108000,
      image: Images.onepiece1,
      selled: 11,
    },
    {
      id: 4,
      name: 'OnePiece vs Kaido',
      price: 108000,
      image: Images.onepiece2,
      selled: 11,
    },
    {
      id: 5,
      name: 'OnePiece vs BigMom',
      price: 108000,
      image: Images.onepiece1,
      selled: 11,
    },
  ];

  const ProductHandler = () => {
    console.log('buy book');
  };

  const renderItem = ({item}) => (
    <View
      style={styles.list_product}
      onStartShouldSetResponder={() => navigation.navigate('Detail-Product')}
      onPress={() => ProductHandler()}>
      <Image
        source={item.image}
        style={{width: 100, height: 150}}
        onPress={() => ProductHandler()}
      />
      <View>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.content}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.selled}>
            <Text>Còn lại: </Text>
            <Text>{item.selled}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.category__container}>
      <View style={styles.category_header}>
        <Text style={styles.header_text}>Manga</Text>
      </View>
      <View style={styles.category__row}>
        <FlatList
          onPress={() => ProductHandler()}
          //   style={styles.flat_list}
          data={listItem1}
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
    color: 'rgba(68, 108, 179, 1)',
  },
  selled: {
    flexDirection: 'row',
  },
});
export default memo(MangaList);
