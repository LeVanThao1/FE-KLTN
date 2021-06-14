import {useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Icon} from 'native-base';
import React, {useContext, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {COLORS, NOTIFI} from '../constants';
import {SEARCH_BOOK} from '../query/book';
import {Notification} from '../utils/notifications';

const HeaderStack = () => {
  return useObserver(() => {
    const {
      stores: {book, category},
    } = useContext(MobXProviderContext);
    const {books, textSearch, setTextSearch, stop, setStop} = book;
    const {option, setOption, selectCategory} = category;
    const openMenu = () => {};
    const navigation = useNavigation();
    const ref = useRef(null);
    const [booksSearch, {called, loading, data, error}] = useLazyQuery(
      SEARCH_BOOK,
      {
        onCompleted: async (data) => {
          if (data.bookByName.length < 20) setStop(true);
          else setStop(false);
          book.setBooksSearch(data.bookByName);
        },
        onError: (err) => {
          console.log(err);
          Toast.show(Notification(NOTIFI.error, err.message));
        },
      },
    );
    const onChangeText = (value) => {
      if (ref.current) {
        clearTimeout(ref.current);
      }
      setTextSearch(value);
      if (value.length === 0) {
        book.setBooksSearch(undefined);
        return;
      }

      const variables = {
        name: value,
        ...option,
        category: selectCategory === 'all' ? null : selectCategory,
      };
      ref.current = setTimeout(() => {
        booksSearch({
          variables: {
            ...variables,
          },
        });
      }, 300);
    };
    return (
      <SafeAreaView>
        <View style={styles.container__header}>
          <View style={styles.header__menu}>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                name="arrowleft"
                type="AntDesign"
                style={{color: '#fff', fontSize: 26}}
              />
            </TouchableOpacity>
            <Icon name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.search}
              placeholder="Search book"
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

export const HeaderLogo = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.container__header}>
        <View style={styles.header__menu}>
          <Icon name="menu" style={styles.icon} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/images/dinosaurRevert.png')}
              style={{
                height: 40,
                resizeMode: 'contain',
                padding: 0,
                marginLeft: -8,
              }}
            />
            <Text
              style={{
                fontSize: 30,
                color: '#fff',
                fontWeight: 'bold',
                padding: 0,
                marginRight: -8,
                marginLeft: -8,
              }}>
              DINO{' '}
            </Text>
            <Image
              source={require('../assets/images/dinosaur.png')}
              style={{
                height: 40,
                resizeMode: 'contain',
                padding: 0,
                marginLeft: -8,
              }}
            />
          </View>
          <TouchableOpacity
            style={{marginRight: 6}}
            onPress={() => navigation.navigate('Chatting')}>
            <Icon name="message1" style={styles.message} type="AntDesign" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const HeaderMessage = () => {
  return (
    <SafeAreaView>
      <View style={styles.container__header}>
        <View style={styles.header__menu}>
          <Icon name="menu" style={styles.icon} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/images/dinosaurRevert.png')}
              style={{
                height: 40,
                resizeMode: 'contain',
                padding: 0,
                marginLeft: -8,
              }}
            />
            <Text
              style={{
                fontSize: 30,
                color: '#fff',
                fontWeight: 'bold',
                padding: 0,
                marginRight: -8,
                marginLeft: -8,
              }}>
              DINO{' '}
            </Text>
            <Image
              source={require('../assets/images/dinosaur.png')}
              style={{
                height: 40,
                resizeMode: 'contain',
                padding: 0,
                marginLeft: -8,
              }}
            />
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('')
              }}>
              <Icon
                type="Entypo"
                name="new-message"
                style={{color: '#fff', fontSize: 25}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container__header: {
    flexDirection: 'column',
  },

  header__text: {
    fontSize: 20,
  },
  header__menu: {
    // margin: -20,
    width: '100%',
    // height: 00,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    // margin: 15,
    fontSize: 35,
    color: '#fff',
    // paddingLeft: 20
    marginLeft: -8,
  },
  search: {
    height: 35,
    width: '70%',
    color: '#111',
    backgroundColor: '#fff',
    position: 'relative',
    paddingLeft: 10,
    fontSize: 17,
    padding: 0,
    borderRadius: 6,
  },
  searchIcon: {
    position: 'absolute',
    right: 55,
    zIndex: 1,
    opacity: 0.4,
    fontSize: 24,
  },
  message: {
    color: '#fff',
    left: 10,
    zIndex: 1,
  },
  container: {
    backgroundColor: COLORS.primary,
  },
});

export default HeaderStack;
