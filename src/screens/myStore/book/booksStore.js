import {useLazyQuery, useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext, useObserver} from 'mobx-react';
import React, {useContext, useState, useEffect, memo} from 'react';
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
import {queryData} from '../../../common';

const BooksStore = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {shop, category},
    } = useContext(MobXProviderContext);
    const [selectedStatus, setSelectedStatus] = useState('ALL');

    const {bookStore, setBookStore} = shop;
    const [listBook, setListBook] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      queryData(GET_BOOKS_STORE, {store: shop.info.id})
        .then(({data}) => {
          setBookStore(data.books);
        })
        .catch((err) => console.log('err book', err));
    }, []);

    useEffect(() => {
      if (bookStore) {
        setListBook(
          bookStore.map((ct, i) => ({
            id: ct.id ? ct.id : '',
            name: ct.name ? ct.name : '',
            categoryId: ct.category.id ? ct.category.id : '',
            categoryName: ct.category.name ? ct.category.name : '',
            author: ct.author,
            price: ct.price ? ct.price : '',
            publisher: ct.publisher ? ct.publisher : '',
            numberOfReprint: ct.numberOfReprint ? ct.numberOfReprint : '',
            year: ct.year ? ct.year : '',
            amount: ct.amount ? ct.amount : '',
            sold: ct.sold ? ct.sold : '',
            description: ct.description ? ct.description : '',
            images: ct.images[0] ? ct.images[0] : [],
            comment: ct.comment ? ct.comment : '',
          })),
        );
      }
    }, [bookStore]);

    const [categori, setCategori] = useState([]);

    useEffect(() => {
      setCategori(listBook);
      setLoading(false);
    }, [listBook]);

    const onPressTab = (name, status) => {
      setSelectedStatus(status);
      setCategori(
        status === 'ALL'
          ? listBook
          : listBook.filter((b) => b.categoryName === name),
      );
    };
    //
    const renderBook = () => (
      <>
        {loading == true ? (
          <View style={{width: '100%', margin: 'auto', marginTop: 20}}>
            <Text style={{textAlign: 'center'}}>Đang tải dữ liệu</Text>
          </View>
        ) : categori.length > 0 ? (
          categori?.map((book, i) => (
            <Book key={i} book={book} />
            // delete={onPress(book.id)}
          ))
        ) : (
          <View style={{padding: 20}}>
            <Text style={{textAlign: 'center'}}>Không có dữ liệu</Text>
          </View>
        )}
      </>
    );

    function Tab({name, status}) {
      return (
        <TouchableOpacity onPress={() => onPressTab(name, status)}>
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
            <Tab name="Tất cả" status="ALL" />
            <Tab name="Truyện - Tiểu thuyết" status="NOVEL" />
            <Tab name="Truyện tranh" status="COMIC" />
            <Tab name="Tôn giáo - Tâm linh" status="RELIGION" />
            <Tab name="Lịch sử" status="HISTORY" />
            <Tab name="Chính trị – Pháp luật" status="LAW" />
            <Tab name="Khoa học - Công nghệ" status="TECHNOLOGY" />
            <Tab name="Văn học nghệ thuật" status="LITERARY" />
            <Tab name="Văn hóa - Xã hội" status="SOCIOTY" />
            <Tab name="Giáo trình" status="CURRICULUM" />
          </ScrollView>
        </View>
        <View style={styles.orderContainer}>
          <ScrollView>{renderBook()}</ScrollView>
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

export default memo(BooksStore);
