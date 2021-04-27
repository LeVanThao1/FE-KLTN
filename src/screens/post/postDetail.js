import {useMutation} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Button, Form, Icon, Item, Picker, Text, View} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
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
import {CREATE_COMMENT_POST} from '../../query/comment';
import Comment from './comment';
import {stylesPost} from './stylePost';

const PostDetail = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {user, category, comment},
    } = useContext(MobXProviderContext);
    const {info, postCurrent, setPostCurrent} = user;
    const {postComment, setPostComment} = comment;
    const [cmts, setCmts] = useState('');
    const [addCmt, setAddCmt] = useState('');
    console.log('postComen111t', postComment);
    console.log('info', info);

    const [createComment] = useMutation(CREATE_COMMENT_POST, {
      onCompleted: (data) => {
        console.log('datapost', data.createCommentPost);
        setPostCurrent({
          ...postCurrent,
          comment: [data.createCommentPost, ...postCurrent.comment],
        });
        setPostComment([data.createCommentPost, ...postComment]);
      },
      onError: (err) => {
        console.log('gaga', err);
      },
    });

    console.log('adadadsadsadasdsd ', postCurrent.comment[0]);
    const onPress = () => {
      let dataComment = {
        content: cmts,
        type: 'TEXT',
      };
      createComment({
        variables: {
          dataComment,
          postId: postCurrent.id,
        },
      });
    };
    return (
      <ScrollView horizontal={false}>
        <View style={stylesPost.addpost}>
          <ScrollView showsVerticalScrollIndicator>
            <View style={stylesPost.textImg}>
              <Text style={{fontWeight: 'bold', paddingHorizontal: 10}}>
                Hình ảnh
              </Text>
              <View style={stylesPost.img}>
                {postCurrent.images.map((img, i) => (
                  <Image key={i} source={{uri: img}} style={stylesPost.post} />
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={stylesPost.content}>
            <View style={stylesPost.text}>
              <View style={stylesPost.titleCenter}>
                <Text style={stylesPost.txtBold}>Tiêu đề </Text>
                <Text style={stylesPost.titlePost}>{postCurrent.title}</Text>
              </View>
              <View style={stylesPost.titleCenter}>
                <Text style={stylesPost.txtBold}>Thông tin sách</Text>
              </View>
              <View style={stylesPost.horizontal}>
                <Text>Nhà xuất bản </Text>
                <Text style={stylesPost.detail}>{postCurrent.publisher}</Text>
              </View>

              <View style={stylesPost.horizontal}>
                <Text>Số lần xuất bản </Text>
                <Text style={stylesPost.detail}>
                  {postCurrent.numberOfReprint}
                </Text>
              </View>
              <View style={stylesPost.horizontal}>
                <Text>Năm xuất bản </Text>
                <Text style={stylesPost.detail}>{postCurrent.year}</Text>
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
                  <Text style={stylesPost.detail}>{postCurrent.price}</Text>
                  <Text
                    style={{paddingLeft: 5, color: 'rgba(68, 108, 179, 1)'}}>
                    VND
                  </Text>
                </View>
              </View>
              <View style={stylesPost.elment}>
                <Text>Sách muốn đổi </Text>
                <Text style={stylesPost.detail}>asdas</Text>
              </View>

              <Text style={stylesPost.textContent}>Mô tả</Text>
              <View style={stylesPost.textDes}>
                <Text>{postCurrent.description}</Text>
              </View>
              {postComment?.map((cmt, i) => (
                <Comment key={i} cmt={cmt} />
              ))}
              <View style={stylesPost.addCmt}>
                <View style={stylesPost.person}>
                  <View style={stylesPost.info}>
                    <Image
                      source={{uri: info.avatar}}
                      style={stylesPost.avtcmt}
                    />
                    <View style={stylesPost.addComment}>
                      <TextInput
                        style={stylesPost.comment}
                        placeholder="Thêm bình luận"
                        value={cmts}
                        onFocus={() => {}}
                        onChangeText={(value) => {
                          setCmts(value);
                        }}
                      />
                    </View>
                  </View>
                </View>
                <Icon
                  name="ios-arrow-forward-circle-outline"
                  type="Ionicons"
                  style={stylesPost.iconEnter}
                  onPress={onPress}
                />
              </View>
              {/* <View>
                {postCmt?.map((cmt, i) => (
                  <View style={stylesPost.infocmt}>
                    <Image
                      source={{uri: cmt.author.avatar}}
                      style={stylesPost.avtcmt}
                    />
                    <View style={stylesPost.userCmt}>
                      <Text style={stylesPost.name}>{cmt.author.name}</Text>
                      <Text style={stylesPost.time}>{cmt.content}</Text>
                    </View>
                  </View>
                ))}
                <View style={stylesPost.addCmt}>
                  <View style={stylesPost.person}>
                    <View style={stylesPost.info}>
                      <Image
                        source={{uri: info.avatar}}
                        style={stylesPost.avtcmt}
                      />
                      <View style={stylesPost.addComment}>
                        <TextInput
                          style={stylesPost.comment}
                          placeholder="Thêm bình luận"
                          value={cmt}
                          // onFocus={() => {
                          //   setCmt()
                          // }}
                          onChangeText={(value) => {
                            setCmt(value);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <Icon
                    name="ios-arrow-forward-circle-outline"
                    type="Ionicons"
                    style={stylesPost.iconEnter}
                    onPress={onPress}
                  />
                </View>
              </View> */}
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
                    postCmt: postCmt,
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
