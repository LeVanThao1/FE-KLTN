import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {stylesPost} from './stylePost';

const Comment = ({cmt}) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('UserInfo', {
            userId: cmt.author.id ? cmt.author.id : '',
            userAvatar: cmt.author.avatar ? cmt.author.avatar : [],
            userName: cmt.author.name ? cmt.author.name : '',
            userPhone: cmt.author.phone ? cmt.author.phone : '',
            userMail: cmt.author.email ? cmt.author.email : '',
            userAddress: cmt.author.address ? cmt.author.address : '',
          })
        }>
        <View style={stylesPost.infocmt}>
          <Image source={{uri: cmt.author.avatar}} style={stylesPost.avtcmt} />
          <View style={stylesPost.userCmt}>
            <Text style={stylesPost.name}>{cmt.author.name}</Text>
            <Text style={stylesPost.time}>{cmt.content}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
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
