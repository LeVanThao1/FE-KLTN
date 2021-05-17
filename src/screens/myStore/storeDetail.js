import React, {useState, memo, useContext, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Textarea from 'react-native-textarea';
import {Icon, ListItem, Separator, Button} from 'native-base';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Images from '../../assets/images/images';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {useLazyQuery} from '@apollo/client';
import {GET_STORE, GET_STORE_BY_USER} from '../../query/store';
import {introspectionFromSchema} from 'graphql';
import {transaction} from 'mobx';
import Toast from 'react-native-toast-message';
import {Notification} from '../../utils/notifications';
import {NOTIFI} from '../../constants';
import {COLORS} from '../../constants/themes';
import formatMoney from '../../utils/format';
const {width} = Dimensions.get('screen');
const StoreDetail = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {shop, user},
    } = useContext(MobXProviderContext);
    const {info, setInfo} = shop;
    const navigation = useNavigation();
    const [listItem, setListItem] = useState([]);
    const [text, setText] = useState('');
    const [store, {called, loading, data, error}] = useLazyQuery(
      GET_STORE_BY_USER,
      {
        onCompleted: async (data) => {
          setListItem({
            avatar: data?.store.avatar,
            background: data?.store.background,
            name: data?.store.name,
            address: data?.store.address,
            description: data?.store.description,
            book: data?.store.books,
          });
        },
        onError: (err) => {
          Toast.show(Notification(NOTIFI.error, err.message));
          console.log('get store', err);
        },
      },
    );
    useEffect(() => {
      store({
        variables: {
          id: route.params.id,
        },
      });
    }, [info]);
    useEffect(() => {}, [listItem]);
    const ProductItem = ({book}) => (
      <View
        style={{
          width: (width - 55) / 2,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate('Detail-Product', {productId: book.id})
          }>
          <Image
            source={{uri: book.book ? book.book.images[0] : book.images[0]}}
            style={styles.itemImage}
          />
          <Text style={styles.itemName} numberOfLines={1}>
            {book.book ? book.book.name : book.name}
          </Text>
          <Text style={styles.itemPrice}>
            Giá {formatMoney(book.price)} VNĐ
          </Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <ScrollView>
        <View style={styles.images}>
          <ImageBackground source={Images.slider1} style={styles.image}>
            <Image source={{uri: info.avatar}} style={styles.avatar} />
          </ImageBackground>
        </View>
        <View style={styles.container_store}>
          <View style={styles.content}>
            <Text>Tên shop </Text>
            <Text
              style={
                (styles.text,
                {
                  color: '#333',
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#111',
                  padding: 0,
                  marginLeft: 10,
                  width: '100%',
                })
              }>
              {listItem?.name}
            </Text>
          </View>
          <View style={styles.address}>
            <Text style={{paddingLeft: 8}}>Địa chỉ cửa hàng </Text>
            <Text
              style={{
                color: '#333',
                borderWidth: 0.3,
                borderColor: '#111',
                padding: 10,
                marginVertical: 5,
                marginLeft: 4,
                borderRadius: 6,
                width: '98%',
              }}
              numberOfLines={2}>
              {listItem?.address}
            </Text>
          </View>
          <View style={styles.des}>
            <Text>Mô tả shop: </Text>
            <Text style={styles.textarea}>{listItem?.description}</Text>
          </View>
          <View style={styles.product}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
                padding: 10,
                marginBottom: 16,
                borderWidth: 0.4,
                backgroundColor: '#ffffff',
              }}>
              Sách của cửa hàng
            </Text>
            <View style={styles.listBook}>
              {listItem?.book?.map((b, i) => (
                <ProductItem key={i} book={b} />
              ))}
            </View>
          </View>
          {/* money */}
        </View>
      </ScrollView>
    );
  });
};

const styles = StyleSheet.create({
  listBook: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: (width - 55) / 2,
    height: 240,
    marginHorizontal: 4,
    // marginLeft: 14,
    marginVertical: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderColor: '#5a5a5a',
    borderWidth: 0.2,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  itemImage: {
    width: (width - 88) / 2,
    height: 180,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    // marginHorizontal: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    color: '#484848',
    marginVertical: 4,
    textAlign: 'center',
  },
  itemPrice: {
    // textAlign: 'right'
    paddingHorizontal: 5,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
  },
  container_store: {
    flex: 0,
    margin: 10,
    padding: 10,
    // width: '90%',
  },
  product: {
    textAlign: 'center',
  },
  createStore: {
    marginHorizontal: 'auto',
    paddingVertical: '60%',
  },

  titleCreate: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 20,
  },
  btnCreate: {
    alignSelf: 'center',
    padding: 15,
    borderRadius: 4,
  },

  txtCreate: {
    color: '#fff',
  },

  image: {
    // flex: 1,
    width: '100%',
    height: 150,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 50,
    margin: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: '70%',
  },

  address: {
    marginVertical: 5,
  },

  text: {
    marginLeft: 10,
    width: '100%',
    height: 20,
    borderBottomWidth: 0.1,
    borderColor: '#111',
    color: '#111',
  },
  des: {
    flexDirection: 'column',
    margin: 5,
    width: '100%',
  },
  textareacont: {
    justifyContent: 'center',
  },
  textareaContainer: {
    height: 150,
    width: '100%',

    // padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    width: '98%',
    marginVertical: 10,
    padding: 10,
    textAlignVertical: 'top', // hack android
    height: 130,
    fontSize: 14,
    borderWidth: 0.1,
    borderRadius: 3,
    color: '#333',
    marginBottom: 20,
  },

  evalue: {
    marginVertical: 10,
    marginBottom: 20,
  },

  shipping_title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    margin: 10,
  },
  btn: {
    paddingHorizontal: 10,
    padding: 10,
    marginHorizontal: 85,
    width: '50%',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: COLORS.primary,
  },
});

export default memo(StoreDetail);
