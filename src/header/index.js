import React from 'react';

import {Accordion, Icon, Row} from 'native-base';
import {TextInput, Text, View, StyleSheet} from 'react-native';

const HeaderStack = ({navigation}) => {
  const openMenu = () => {};

  return (
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
        <TextInput style={styles.search} placeholder="search book" />
        <Icon name="message1" style={styles.message} type="AntDesign" />
      </View>
    </View>
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
    borderWidth: 0.4,
    height: 35,
    width: '70%',
    color: '#111',
    backgroundColor: '#fff',
    position: 'relative',
    paddingLeft: 40,
    fontSize: 17,
    padding: 0,
    borderRadius: 50,
  },
  searchIcon: {
    position: 'absolute',
    left: 70,
    zIndex: 1,
    opacity: 0.4,
  },
  message: {
    color: '#fff',
    left: 10,
    zIndex: 1,
  },
});

export default HeaderStack;
