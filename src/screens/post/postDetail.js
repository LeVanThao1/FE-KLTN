import {useMutation} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Button, Form, Icon, Item, Picker, Text, View} from 'native-base';
import React, {memo, useContext, useState} from 'react';
import {Image} from 'react-native';
import {
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Textarea from 'react-native-textarea';

import Images from '../../assets/images/images';
import {UPDATE_POST} from '../../query/post';
import {stylesPost} from './stylePost';

const PostDetail = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {user, category},
    } = useContext(MobXProviderContext);
    const {
      postId,
      postTitle,
      postDescription,
      postImg,
      postYear,
      postNumPrint,
      postCategory,
      postPrice,
      postPublisher,
      postWanna,
      postComment,
      postTime,
    } = route.params;
    return (
      <ScrollView horizontal={false}>
        <View style={stylesPost.addpost}>
          <ScrollView showsVerticalScrollIndicator>
            <View style={stylesPost.textImg}>
              <Text style={{fontWeight: 'bold', paddingHorizontal: 10}}>
                Hình ảnh
              </Text>
              <View style={stylesPost.img}>
                {postImg.map((img, i) => (
                  <Image key={i} source={{uri: img}} style={stylesPost.post} />
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={stylesPost.content}>
            <View style={stylesPost.text}>
              <View style={stylesPost.titleCenter}>
                <Text style={stylesPost.txtBold}>Tiêu đề </Text>
                <Text style={stylesPost.titlePost}>{postTitle}</Text>
              </View>
              <View style={stylesPost.titleCenter}>
                <Text style={stylesPost.txtBold}>Thông tin sách</Text>
              </View>
              <View style={stylesPost.horizontal}>
                <Text>Nhà xuất bản </Text>
                <Text style={stylesPost.detail}>{postPublisher}</Text>
              </View>

              <View style={stylesPost.horizontal}>
                <Text>Số lần xuất bản </Text>
                <Text style={stylesPost.detail}>{postNumPrint}</Text>
              </View>
              <View style={stylesPost.horizontal}>
                <Text>Năm xuất bản </Text>
                <Text style={stylesPost.detail}>{postYear}</Text>
              </View>
              <View style={stylesPost.horizontal}>
                <Text>Giá sách</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#f00',
                  }}>
                  <Text style={stylesPost.detail}>{postPrice}</Text>
                  <Text
                    style={{paddingLeft: 5, color: 'rgba(68, 108, 179, 1)'}}>
                    VND
                  </Text>
                </View>
              </View>
              <View style={stylesPost.elment}>
                <Text>Sách muốn đổi </Text>
                <Text style={stylesPost.detail}>{postWanna}</Text>
              </View>

              <Text style={stylesPost.textContent}>Mô tả</Text>
              <View style={stylesPost.textDes}>
                <Text>{postDescription}</Text>
              </View>

              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() =>
                  navigation.navigate('UpdatePost', {
                    postId: postId,
                    postTitle: postTitle,
                    // postBookName: post.uniqueBook.name,
                    postDescription: postDescription,
                    postImg: postImg,
                    postYear: postYear,
                    postNumPrint: postNumPrint,
                    postCategory: postCategory,
                    postPrice: postPrice,
                    postPublisher: postPublisher,
                    postWanna: postWanna,
                    postComment: postComment,
                    postTime: postTime,
                  })
                }>
                <Text style={stylesPost.btn}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  });
};

export default memo(PostDetail);
