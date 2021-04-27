import React, {PureComponent, PropTypes} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

const Comment = ({cmt}) => (
  // Pull comment object out of props

  <View style={stylesPost.comment}>
    <View style={stylesPost.infocmt}>
      <Image
        source={{
          uri: type ? info.avatar : post.comment[0].author.avatar,
        }}
        style={stylesPost.avtcmt}
      />
      <View style={stylesPost.userCmt}>
        <Text style={stylesPost.name}>
          {type ? info.name : post.comment[0].author.name}
        </Text>
        <Text style={stylesPost.time}>{post.comment[0].content}</Text>
      </View>
    </View>
    <View style={stylesPost.addCmt}>
      <View style={stylesPost.person}>
        <View style={stylesPost.info}>
          <Image source={{uri: info.avatar}} style={stylesPost.avtcmt} />
          <TextInput style={stylesPost.comment} placeholder="Thêm bình luận" />
        </View>
      </View>
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
