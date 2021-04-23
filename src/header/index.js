import React, {useContext, useRef, useState} from 'react';

import {Accordion, Icon, Row} from 'native-base';
import {TextInput, Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {SEARCH_BOOK} from '../query/book';
import {useLazyQuery} from '@apollo/client';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';

const HeaderStack = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {book},
    } = useContext(MobXProviderContext);
    const {books, textSearch, setTextSearch} = book;

    const openMenu = () => {};
    const [value, setValue] = useState('');
    const ref = useRef(null);
    console.log(book.booksSearch);
    const [booksSearch, {called, loading, data, error}] = useLazyQuery(
      SEARCH_BOOK,
      {
        onCompleted: async (data) => {
          book.setBooksSearch(data.bookByName);
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
    const onChangeText = (value) => {
      if (ref.current) {
        clearTimeout(ref.current);
      }
      setTextSearch(value);
      setTimeout(() => {
        booksSearch({
          variables: {
            name: value,
          },
        });
      }, 300);
    };
    return (
      <SafeAreaView>
        <View style={styles.container__header}>
          {/* <View style={styles.header__text}>
        <Text>PoobStore</Text>
      </View> */}
          <View style={styles.header__menu}>
            <Icon
              name="menu"
              onPress={() => navigation.openDrawer()}
              style={styles.icon}
            />
            <Icon name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.search}
              placeholder="search book"
              value={textSearch}
              onChangeText={(value) => onChangeText(value)}
            />
            <Icon name="message1" style={styles.message} type="AntDesign" />
          </View>
        </View>
      </SafeAreaView>
    );
  });
};

const styles = StyleSheet.create({
  container__header: {
    flexDirection: 'column',
  },

  header__text: {
    fontSize: 20,
  },
  header__menu: {
    margin: -20,
    width: '110%',
    // height: 00,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    margin: 15,
    fontSize: 35,
    color: '#fff',
    // paddingLeft: 20
  },
  search: {
    height: 35,
    width: '70%',
    color: '#111',
    backgroundColor: '#fff',
    position: 'relative',
    paddingLeft: 40,
    fontSize: 17,
    padding: 0,
    borderRadius: 6,
  },
  searchIcon: {
    position: 'absolute',
    left: 70,
    zIndex: 1,
    opacity: 0.4,
    fontSize: 24,
  },
  message: {
    color: '#fff',
    left: 10,
    zIndex: 1,
  },
});

export default HeaderStack;
