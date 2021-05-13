import {useLazyQuery, useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {valueFromAST} from 'graphql';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Button, Text, View} from 'native-base';
import React, {useState, memo, useContext, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {NOTIFI} from '../../constants';
import {DELETE_BOOK, GET_BOOKS, GET_BOOKS_STORE} from '../../query/book';
import {Notification} from '../../utils/notifications';
import {styles, stylesTable} from './styles';
import {COLORS} from '../../constants/themes';


const ViewAll = () => {
  return useObserver(() => {
    const {
      stores: {shop},
    } = useContext(MobXProviderContext);
    const navigation = useNavigation();
    const {bookStore, setBookStore} = shop;
    const [listBook, setListBook] = useState(null);
    // const [aBook, setABook] = useState(null);
    const [books, {called, loading, data, error}] = useLazyQuery(
      GET_BOOKS_STORE,
      {
        onCompleted: async (data) => {
          setBookStore(data.books);
        },
        onError: (err) => {
          Toast.show(Notification(NOTIFI.error, err.message));
          console.log(err);
        },
      },
    );

    useEffect(() => {
      books({
        variables: {
          store: shop.info.id,
        },
      });
    }, []);

    useEffect(() => {
      if (bookStore) {
        setListBook(
          bookStore.map((ct, i) => ({
            id: ct.id,
            name: ct.name,
            categoryId: ct.category.id,
            categoryName: ct.category.name,
            price: ct.price,
            publisher: ct.publisher,
            numberOfReprint: ct.numberOfReprint,
            year: ct.year,
            amount: ct.amount,
            sold: ct.sold,
            description: ct.description,
            // images: ct.images? ct.img : [],
            // comment: ct.comment ? ct.comment : ''
          })),
        );
      }
    }, [bookStore]);

    const [deleteBook, {dd, aa, ss, xx}] = useMutation(DELETE_BOOK, {
      onCompleted: async (data) => {},
      onError: (err) => {
        Toast.show(Notification(NOTIFI.error, err.message));
        console.log(err);
      },
    });
    const onPress = (value) => {
      deleteBook({
        variables: {
          id: value,
        },
      });
    };

    const RenderItem = ({item}) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('BookDetail', {
            bookId: item.id,
            bookName: item.name,
            bookCategoryId: item.categoryId,
            bookCategoryName: item.categoryName,

            bookPublisher: item.publisher,
            bookYear: item.year,
            bookPrint: item.numberOfReprint,
            bookPrice: item.price,
            bookAmount: item.amount,
            bookSold: item.sold,
            bookDescription: item.description,
            bookImg: item.images,
          })
        }>
        <View style={stylesTable.tableRow}>
          <View style={stylesTable.id}>
            <Text>{item.id}</Text>
          </View>
          <View style={stylesTable.column}>
            <Text>{item.name}</Text>
          </View>
          <View style={stylesTable.column}>
            <Text>{item.category}</Text>
          </View>
          <View style={stylesTable.column}>
            <Text>{item.publisher}</Text>
          </View>
          <View style={stylesTable.column}>
            <Text>{item.year}</Text>
          </View>
          <View style={stylesTable.column}>
            <Text>{item.numberOfReprint}</Text>
          </View>
          <View style={stylesTable.column}>
            <Text>{item.description}</Text>
          </View>
          <View style={stylesTable.column}>
            <Text>{item.price}</Text>
          </View>
          <View style={stylesTable.column}>
            <Text>{item.amount}</Text>
          </View>
          <View style={stylesTable.column}>
            <Text>{item.sold}</Text>
          </View>
          <View style={stylesTable.column}>
            <TouchableOpacity onPress={() => onPress(item.id)}>
              <Text>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container_view}>
        <Text style={styles.header}>Tất cả sản phẩm</Text>
        <View style={styles.main}>
          <View style={styles.search}>
            <TextInput style={styles.input} placeholder="Nhập tên sản phẩm" />
            <Button
              primary
              style={{
                width: 100,
                height: 35,
                alignContent: 'center',
                padding: '5%',
                marginLeft: 5,
                borderRadius: 5,
              }}>
              <Text style={{textAlign: 'center'}}>Tìm</Text>
            </Button>
          </View>
          <View>
            <ScrollView>
              <ScrollView horizontal>
                <View style={stylesTable.tableGrid}>
                  <View style={stylesTable.tableRow}>
                    <View style={stylesTable.id}>
                      <Text numberOfLines={1}>ID</Text>
                    </View>
                    <View style={stylesTable.column}>
                      <Text>Tên sách</Text>
                    </View>
                    <View style={stylesTable.column}>
                      <Text>Danh mục</Text>
                    </View>
                    <View style={stylesTable.column}>
                      <Text>Nhà xuất bản</Text>
                    </View>
                    <View style={stylesTable.column}>
                      <Text>Năm xuất bản</Text>
                    </View>
                    <View style={stylesTable.column}>
                      <Text>Số lần tái bản</Text>
                    </View>
                    <View style={stylesTable.column} numberOfLines={1}>
                      <Text>Mô tả</Text>
                    </View>
                    <View style={stylesTable.column}>
                      <Text>Giá</Text>
                    </View>
                    <View style={stylesTable.column}>
                      <Text>Số lượng</Text>
                    </View>
                    <View style={stylesTable.column}>
                      <Text>Đã bán</Text>
                    </View>
                    <View style={stylesTable.column}>
                      <Text>Xóa</Text>
                    </View>
                  </View>
                  <View>
                    {listBook?.map((item, i) => (
                      <RenderItem key={i} item={item} />
                    ))}
                  </View>
                </View>
              </ScrollView>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  });
};

export default memo(ViewAll);
