import {useLazyQuery, useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext, useObserver} from 'mobx-react';
import React, {useContext, useState, useEffect} from 'react';
import {Icon} from 'native-base';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {DELETE_BOOK, GET_BOOKS_STORE} from '../../../query/book';

import Book from './book';

const ManageOrder = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {shop},
    } = useContext(MobXProviderContext);
    const [selectedStatus, setSelectedStatus] = useState('WAITING');
    const [subOrders, setSubOrders] = useState([]);

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
        console.log(err);
      },
    });
    const onPress = (value) => {
      console.log('value', value);
      deleteBook({
        variables: {
          id: value,
        },
      });
    };

    const renderBook = () => (
      // return Book.filter((so) => so.status === selectedStatus).map((so) => (
      <Book />
    );
    // ));
    function Tab({name, status}) {
      return (
        <TouchableOpacity onPress={() => setSelectedStatus(status)}>
          <Text
            style={status == selectedStatus ? styles.tabSelected : styles.tab}>
            {name}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.searchGroup}>
            <Icon name="search" style={styles.searchIcon} />
            <TextInput style={styles.searchInput} placeholder="Nhập tên sách" />
          </View>
        </View>
        <View style={{height: 46}}>
          <ScrollView horizontal>
            <Tab name="Tất cả" status="All" />
            <Tab name="Truyện - tiểu thuyết" status="NOVEL" />
            <Tab name="Truyện tranh" status="COMIC" />
            <Tab name="Tôn giáo - tâm linh" status="RELIGION" />
            <Tab name="Chính trị - Pháp luật" status="LAW" />
            <Tab name="Khoa học - Công nghệ" status="TECHNOLOGY" />
            <Tab name="Văn học - nghệ thuật" status="literary" />
            <Tab name="Xã hội - lịch sử" status="HISTORY" />
            <Tab name="Giáo trình" status="CURRICULUM" />
          </ScrollView>
        </View>
        <View style={styles.orderContainer}>
          <ScrollView>
            <Book />
          </ScrollView>
        </View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  row: {
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(68, 108, 179, 1)',
  },
  searchGroup: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  searchInput: {
    height: 35,
    width: '100%',
    color: '#111',
    backgroundColor: '#fff',
    paddingLeft: 40,
    fontSize: 16,
    padding: 0,
    borderRadius: 6,
  },
  searchIcon: {
    position: 'absolute',
    left: 8,
    zIndex: 1,
    opacity: 0.4,
    fontSize: 24,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2,
  },
  tabSelected: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: 'rgba(68, 108, 179, 1)',
    borderBottomColor: 'rgba(68, 108, 179, 1)',
    borderBottomWidth: 2,
  },
  orderContainer: {
    flex: 1,
  },
});

export default ManageOrder;
