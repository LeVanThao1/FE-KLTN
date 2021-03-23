import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import Images from '../../assets/images/images';

const MangaList = () => {
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
    <View style={styles.list_product} onPress={() => ProductHandler()}>
      <Image
        source={item.image}
        style={{width: 100, height: 150}}
        onPress={() => ProductHandler()}
      />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.content}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.selled}>
            <Text>Selled:</Text>
            <Text>{item.selled}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.category__container}>
      <View style={styles.category_header}>
        <Text style={styles.header_text}>Old Book market</Text>
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
    backgroundColor: 'purple',
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

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'purple',
  },
  selled: {
    flexDirection: 'row',
  },
});
export default MangaList;
