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
import book from './book';
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
            name: ct.book ? ct.book.name : ct.name,
            categoryId: ct.book ? ct.book.category?.id : ct.category?.id,
            categoryName: ct.book ? ct.book.category?.name : ct.category?.name,
            author: ct.book ? ct.book.author : ct.author,
            price: ct.price ? ct.price : '',
            publisher: ct.book ? ct.book.publisher : ct.publisher,
            numberOfReprint: ct.book
              ? ct.book.numberOfReprint
              : ct.numberOfReprint,
            year: ct.book ? ct.book.year : ct.year,
            amount: ct.amount ? ct.amount : '',
            sold: ct.sold ? ct.sold : '',
            description: ct.book ? ct.book.description : ct.description,
            images: ct.book ? ct.book.images : ct.images,
            comment: ct.comment ? ct.comment : '',
            book: ct.book ? ct.book.id : null,
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
      setCategoryName(name);
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
              <Text style={{textAlign: 'center', color: COLORS.primary, fontWeight: 'bold'}}>Không có dữ liệu</Text>
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

    const [categoryName, setCategoryName] = useState([]);
    const [booksSearch, setBooksSearch] = useState([]);

    const convertText = (text) => {
      return text.replace(/[àáâãăạảấầẩẫậắằẳẵặ]/g, 'a')
        .replace(/[ÀÁÂÃĂẠẢẤẦẨẪẬẮẰẲẴẶ]/g, 'A')
        .replace(/[òóôõơọỏốồổỗộớờởỡợ]/g, 'o')
        .replace(/[ÒÓÔÕƠỌỎỐỒỔỖỘỚỜỞỠỢ]/g, 'O')
        .replace(/[èéêẹẻẽếềểễệ]/g, 'e')
        .replace(/[ÈÉÊẸẺẼẾỀỂỄỆ]/g, 'E')
        .replace(/[ùúũưụủứừửữự]/g, 'u')
        .replace(/[ÙÚŨƯỤỦỨỪỬỮỰ]/g, 'U')
        .replace(/[ìíĩỉị]/g, 'i')
        .replace(/[ÌÍĨỈỊ]/g, 'I')
        .replace(/[ýỳỵỷỹ]/g, 'y')
        .replace(/[ÝỲỴỶỸ]/g, 'Y')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
        .replace(/\u02C6|\u0306|\u031B/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
    }

    const onChangeSearch = (e) => {
      const books = listBook?.filter(b => convertText(b.name).toLowerCase().includes(convertText(e).toLowerCase()));
      categoryName === 'Tất cả' ? setCategori(books) : 
      setCategori(books.filter(b => b.categoryName === categoryName));
    };

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.searchGroup}>
            <Icon name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={booksSearch}
              placeholder="Nhập tên sách"
              onChangeText={(e) => onChangeSearch(e)}
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
