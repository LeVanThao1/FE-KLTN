import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Icon, Text, View, Button} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {DELETE_POST} from '../../query/post';
import {GET_COMMENT_POST} from '../../query/post';
import {stylesPost} from './stylePost';
import moment from 'moment';
import {queryData} from '../../common';
import {Comment} from './comment';

const PostOne = ({route, post, info, type}) => {
  return useObserver(() => {
    const {
      stores: {user, comment},
    } = useContext(MobXProviderContext);
    const [visible, setIsVisible] = useState(false);
    const navigation = useNavigation();

    const {postComment, setPostComment} = comment;
    console.log('post...', post);

    const postId = post?.id;
    const [deletePost, {called, loading, data, error}] = useMutation(
      DELETE_POST,
      {
        onCompleted: async (data) => {
          const newData = [...posts].filter((p) => p.id + '' !== post.id + '');
          user.setPosts([...newData]);
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );

    const onPress = () => {
      deletePost({
        variables: {
          id: post.id,
        },
      });
    };

    useEffect(() => {}, [post]);

    return (
      <View style={{paddingHorizontal: 14, paddingVertical: 6}}>
        <View style={stylesPost.person}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserInfo', {
                userAvatar: post.author.avatar ? post.author.avatar : [],
                userName: post.author.name ? post.author.name : '',
                userPhone: post.author.phone ? post.author.phone : '',
                userMail: post.author.email ? post.author.email : '',
                userAddress: post.author.address ? post.author.address : '',
              })
            }>
            <View style={stylesPost.info}>
              <Image
                source={{uri: type ? info.avatar : post.author.avatar}}
                style={stylesPost.avt}
              />
              <View style={stylesPost.day}>
                <Text style={stylesPost.name}>
                  {type ? info.name : post.author.name}
                </Text>
                <Text style={stylesPost.time}>
                  {moment(moment(post.createdAt)._d).fromNow()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPress} style={{backgroundColor: 'red'}}>
            <Icon
              name="delete-outline"
              type="MaterialIcons"
              style={{color: '#fff'}}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            user.setPostCurrent(post);
            setPostComment(post.comment);
            navigation.navigate('PostDetail');
          }}>
          <View>
            <View style={stylesPost.text}>
              <Text style={stylesPost.title}>#{post.title}</Text>
              <View style={{paddingHorizontal: 10, marginBottom: 10}}>
                <Text>Sách muốn đổi</Text>
                <Text style={stylesPost.textContent} numberOfLines={3}>
                  {post.bookWanna}
                </Text>
              </View>
              <Text style={stylesPost.textContent} numberOfLines={3}>
                {post.description}
              </Text>
            </View>
            <View style={stylesPost.containerImage}>
              {post.images.map((img, i) => (
                <TouchableHighlight
                  key={i}
                  style={stylesPost.post}
                  onPress={() => setIsVisible(true)}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: img}}
                  />
                </TouchableHighlight>
              ))}
            </View>
            <ImageView
              images={post.images.map((im) => ({uri: im}))}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
          </View>
        </TouchableOpacity>
        <View style={stylesPost.content}>
          <View style={stylesPost.action}>
            <View style={stylesPost.heart_cmt}>
              <View style={stylesPost.action}>
                <Text>Comment</Text>
                <Icon
                  name="comment-o"
                  type="FontAwesome"
                  style={{paddingLeft: 15, marginRight: 10}}
                />
                <Text style={stylesPost.textCount}>20</Text>
              </View>
            </View>
          </View>
          <View style={stylesPost.infocmt}>
            <Image
              source={{uri: type ? info.avatar : post.comment[0].author.avatar}}
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
                <TextInput
                  style={stylesPost.comment}
                  placeholder="Thêm bình luận"
                />
              </View>
            </View>
          </View>
          <View style={stylesPost.cmt}></View>
        </View>
        {}
        <View
          style={{
            flex: 1,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            height: 8,
            backgroundColor: '#d8d8d8',
            marginHorizontal: -15,
          }}></View>
      </View>
    );
  });
};

export default PostOne;
