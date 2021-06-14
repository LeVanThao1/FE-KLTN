import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import React, {memo, useContext, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import ProductCard from '../../components/productCart';
import {COLORS} from '../../constants/index';

const WishList = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {user},
    } = useContext(MobXProviderContext);
    const [loading, setLoading] = useState(false);
    return (
      <View style={styles.home__container}>
        {user.likes && user.likes.length > 0 ? (
          <ScrollView style={{flex: 1}}>
            <View
              style={{
                flexWrap: 'wrap',
                marginHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <FlatList
                contentContainerStyle={styles.bookByCategory}
                data={user.likes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <ProductCard
                    key={index.toString()}
                    book={item}
                    type={true}
                    navigation={navigation}
                  />
                )}></FlatList>

              {
                // user.likes.map((item) => (
                //   <View style={styles.product}>
                //     <ProductCard navigation={navigation} book={item} />
                //   </View>
                // <View style={styles.product}>
                //   <TouchableOpacity
                //     style={styles.list_product}
                //     // onStartShouldSetResponder={() => navigation.navigate('Detail-Product')}
                //     onPress={() =>
                //       navigation.navigate('Detail-Product', {
                //         productId: item.id,
                //       })
                //     }>
                //     <Image
                //       source={{
                //         uri: item.book ? item.book.images[0] : item.images[0],
                //       }}
                //       style={{width: '90%', height: 130, resizeMode: 'cover'}}
                //       // onPress={() => productHandler()}
                //     />
                //     <View>
                //       <Text style={styles.name} numberOfLines={1}>
                //         {item.book ? item.book.name : item.name}
                //       </Text>
                //       <View style={styles.content}>
                //         <Text style={styles.price}>Giá: {item.price}</Text>
                //       </View>
                //       <View style={styles.selled}>
                //         <Text>Còn lại: </Text>
                //         <Text>{item.amount}</Text>
                //       </View>
                //     </View>
                //   </TouchableOpacity>
                // </View>
                // ))
              }
            </View>
          </ScrollView>
        ) : (
          <Text style={{textAlign: 'center', fontSize: 14, marginVertical: 20}}>
            Chưa có sản phẩm yêu thích
          </Text>
        )}
      </View>
    );
  });
};

const styles = StyleSheet.create({
  home__container: {
    flex: 1,
    height: '100%',
    width: '100%',
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
    backgroundColor: COLORS.primary,
  },
  header_text: {
    fontSize: 17,
    padding: 10,
    color: '#fff',
  },
  list_product: {
    width: (Dimensions.get('window').width - 20) / 2 - 10,
    height: 225,
    // padding: 5,
    margin: 4,
    justifyContent: 'center',
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
    color: COLORS.primary,
  },
  selled: {
    flexDirection: 'row',
  },

  product: {
    width: '40%',
  },
  bookByCategory: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 8,
  },
});

export default WishList;
