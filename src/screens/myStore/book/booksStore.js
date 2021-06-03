import {MobXProviderContext, useObserver} from 'mobx-react';
import {Icon, Spinner} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {queryData} from '../../../common';
import {COLORS, NOTIFI} from '../../../constants';
import {GET_BOOKS_STORE} from '../../../query/book';
import {Notification} from '../../../utils/notifications';
import Book from './book';

const BooksStore = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {shop, category},
    } = useContext(MobXProviderContext);
    const [selectedStatus, setSelectedStatus] = useState('ALL');

    const {bookStore, setBookStore} = shop;
    const [listBook, setListBook] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      queryData(GET_BOOKS_STORE, {store: shop.info.id})
        .then(({data}) => {
          setBookStore(data.books);
        })
        .catch((err) => {
          console.log('err book', err);
          Toast.show(
            Notification(NOTIFI.error, 'Có lỗi xảy ra khi tạo bài viết'),
          );
        });
    }, []);
    useEffect(() => {
      if (bookStore) {
        setListBook(
          bookStore.map((ct, i) => ({
            id: ct.id ? ct.id : '',
            name: ct.name ? ct.name : '',
            categoryId: ct.category ? ct.category.id : '',
            categoryName: ct.category ? ct.category.name : '',
            author: ct.author ? ct.author : '',
            price: ct.price ? ct.price : '',
            publisher: ct.publisher ? ct.publisher : '',
            numberOfReprint: ct.numberOfReprint ? ct.numberOfReprint : '',
            year: ct.year ? ct.year : '',
            amount: ct.amount ? ct.amount : '',
            sold: ct.sold ? ct.sold : '',
            description: ct.description ? ct.description : '',
            images: ct.images ? ct.images : [],
            comment: ct.comment ? ct.comment : '',
          })),
        );
      }
      // setLoading(false);
    }, [bookStore]);

    const [categori, setCategori] = useState(undefined);

    useEffect(() => {
      if (listBook !== undefined) setCategori(listBook);
    }, [listBook]);

    useEffect(() => {
      if (categori !== undefined) setLoading(false);
    }, [categori]);

    const onPressTab = (name, status) => {
      setSelectedStatus(status);
      setCategori(
        status === 'ALL'
          ? listBook
          : listBook.filter((b) => b.categoryName === name),
      );
    };
    const renderBook = () => (
      <>
        {!loading ? (
          categori?.length > 0 ? (
            categori?.map((book, i) => <Book key={i} book={book} />)
          ) : (
            <View style={{padding: 20}}>
              <Text style={{textAlign: 'center'}}>Không có dữ liệu</Text>
            </View>
          )
        ) : (
          <Spinner color={COLORS.primary} />
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

    const [search, setSearch] = useState('');

    const onChangeSearch = (value) => {
      console.log('target');
    };

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.searchGroup}>
            <Icon name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={search}
              placeholder="Nhập tên sách"
              onChange={(value) => onChangeSearch(value)}
            />
          </View>
        </View>
        <View style={{height: 46}}>
          <ScrollView horizontal>
            <Tab name="Tất cả" status="ALL" />
            <Tab name="Văn học - Tiểu thuyết" status="LITERARY" />
            <Tab name="Tâm lý - Tình cảm" status="EMOTIONAL" />
            <Tab name="Truyện tranh" status="COMIC" />
            <Tab name="Tôn giáo - Tâm linh" status="RELIGION" />
            <Tab name="Lịch sử" status="HISTORY" />
            <Tab name="Chính trị – Pháp luật" status="LAW" />
            <Tab name="Khoa học - Công nghệ" status="TECHNOLOGY" />
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
    backgroundColor: COLORS.primary,
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
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
  },
  orderContainer: {
    flex: 1,
  },
});

export default memo(BooksStore);
