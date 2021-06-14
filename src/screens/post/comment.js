import {useNavigation} from '@react-navigation/native';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import React from 'react';
import {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {stylesPost} from './stylePost';

const Comment = ({cmt}) => {
  return useObserver(() => {
    const {
      stores: {user, shop},
    } = useContext(MobXProviderContext);
    const navigation = useNavigation();
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(cmt.author.store ? 'StoreDetail' : 'UserInfo', {
              id: cmt.author.store ? cmt.author.store.id : cmt.author.id,
              // userAvatar: cmt.author.avatar ? cmt.author.avatar : [],
              // userName: cmt.author.name ? cmt.author.name : '',
              // userPhone: cmt.author.phone ? cmt.author.phone : '',
              // userMail: cmt.author.email ? cmt.author.email : '',
              // userAddress: cmt.author.address ? cmt.author.address : '',
            })
          }>
          <View style={stylesPost.infocmt}>
            <Image
              source={{
                uri: cmt.author.store
                  ? cmt.author.store.avatar
                  : cmt.author.avatar,
              }}
              style={stylesPost.avtcmt}
            />
            <View style={stylesPost.userCmt}>
              <Text style={stylesPost.name}>
                {cmt.author.store ? cmt.author.store.name : cmt.author.name}
              </Text>
              <Text style={stylesPost.time}>{cmt.content}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  });
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
