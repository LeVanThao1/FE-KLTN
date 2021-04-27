import React, {PureComponent, PropTypes} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

const Comment = () => (
  // Pull comment object out of props
  <View style={styles.container}>
    <View style={styles.avatarContainer}>
      {
        <Image
          resizeMode="contain"
          style={styles.avatar}
          source={{uri: 'picsum.photos/200/300'}}
        />
      }
    </View>
    <View style={styles.contentContainer}>
      <Text>
        <Text style={[styles.text, styles.name]}>sdasádasd</Text>
        <Text style={styles.text}>ádasdascontent</Text>
      </Text>
      <Text style={[styles.text, styles.created]}>xãasxasxas</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  text: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  },
});

export default Comment;
