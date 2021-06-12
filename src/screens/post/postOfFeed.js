import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import moment from 'moment';
// import {Entypo, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {Icon, Text} from 'native-base';
// import {Text} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import {COLORS, NOTIFI} from '../../constants';
import {DELETE_POST} from '../../query/post';
import ImageFooter from '../../screens/chatting/components/ImageFooter';
import {Notification} from '../../utils/notifications';
import {stylesPost} from './stylePost';

const PostOfFeed = ({route, postFeed, info, type}) => {
  return useObserver(() => {
    const {
      stores: {user, comment, post},
    } = useContext(MobXProviderContext);
    const navigation = useNavigation();
    const {posts} = user;
    const {general, setGeneral} = post;
    const {postComment, setPostComment} = comment;
    const [visible, setIsVisible] = useState(false);
    const [index, setIndex] = useState(0);

    const postId = postFeed?.id;
    const [deletePost, {called, loading, data, error}] = useMutation(
      DELETE_POST,
      {
        onCompleted: async (data) => {
          const newData = [...posts].filter((p) => p.id + '' !== postFeed.id + '');
          user.setPosts([...newData]);
          setGeneral([...newData]);
          Toast.show(Notification(NOTIFI.success, 'Xóa thành công'));
        },
        onError: (err) => {
          Toast.show(Notification(NOTIFI.error, err.message));
          console.log(err);
        },
      },
    );
    const onDelete = () => {
      Alert.alert('Đồng ý xóa', 'Lựa chọn', [
        {text: 'Đồng ý', onPress: () => onPress()},
        {text: 'Hủy'},
      ]);
    };
    const onPress = () => {
      deletePost({
        variables: {
          id: postFeed.id,
        },
      });
    };
    // bua co roi thi h xem lai code cu ma lam thẽ
    return (
      <View style={{paddingHorizontal: 14, paddingVertical: 0}}>
        <ImageView
          images={postFeed.images.map((t) => ({uri: t}))}
          imageIndex={index}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
        <View style={stylesPOST.container}>
          <View style={stylesPOST.postHeader}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserInfo', {
                  id: postFeed.author.id ? postFeed.author.id : '',
                })
              }>
              <View style={stylesPOST.row}>
                <Image
                  style={stylesPOST.User}
                  source={{uri: postFeed.author.avatar}}
                />
                <View style={{paddingLeft: 10}}>
                  <Text style={stylesPOST.UserName}>{postFeed.author.name}</Text>
                  <View style={stylesPOST.row}>
                    <Text style={stylesPOST.PostTime}>
                      {moment(moment(postFeed.createdAt)._d).fromNow()}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {user.info.id === postFeed.author.id ? (
              <TouchableOpacity onPress={() => onDelete()}>
                <Icon name="dots-horizontal" type="MaterialCommunityIcons" />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <View style={stylesPOST.BreakLine} />

          <TouchableOpacity
            onPress={() => {
              user.setPostCurrent(post);
              setPostComment(postFeed.comment);
              navigation.navigate('PostDetail', {postID: postFeed.id});
            }}>
            <View
              style={{
                paddingVertical: 8,
              }}>
              <Text style={stylesPOST.PostTitle}>{postFeed.title}</Text>
              <Text style={stylesPOST.PostDescription} numberOfLines={4}>
                {postFeed.description}
              </Text>
            </View>
          </TouchableOpacity>

          <View>
            <View>
              <ImageView
                images={postFeed.images.map((t) => ({uri: t}))}
                imageIndex={index}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
                FooterComponent={({imageIndex}) => (
                  <ImageFooter
                    imageIndex={imageIndex}
                    imagesCount={postFeed.images.length}
                  />
                )}
              />
            </View>
            {postFeed.images.length < 3 ? (
              // <View style={stylesPOST.PhotoGroup}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {postFeed.images.map((img, i) => (
                  <View style={stylesPOST.PhotoContainer} key={i.toString()}>
                    <TouchableOpacity
                      onPress={() => {
                        setIndex(i);
                        setIsVisible(true);
                      }}>
                      <Image
                        style={stylesPOST.PostPhoto}
                        source={{
                          uri: img,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              //
              <View style={stylesPOST.PhotoGroup}>
                {postFeed.images.slice(0, 1).map((img, i) => (
                  <>
                    <View style={stylesPOST.PhotoContainer}>
                      {/* <PostPhoto source={{uri: img}} /> */}
                      <TouchableOpacity
                      
                        onPress={() => {
                          setIndex(i);
                          setIsVisible(true);
                        }}>
                        <Image
                          style={stylesPOST.PostPhoto}
                          key={i}
                          source={{uri: img}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={stylesPOST.PhotoContainer}>
                      <View style={stylesPOST.OverlayGroup}>
                        <TouchableOpacity
                          onPress={() => {
                            setIndex(1);
                            setIsVisible(true);
                          }}>
                          <Image
                            style={stylesPOST.PostPhoto}
                            source={{uri: postFeed.images[1]}}
                          />
                          <View style={stylesPOST.Overlay}>
                            <Text style={{color: '#ffffff', fontSize: 30}}>
                              + {postFeed.images.length - 1}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ))}
              </View>
            )}
          </View>
          <View style={stylesPOST.BreakLine} />

          <TouchableOpacity
            onPress={() => {
              user.setPostCurrent(post);
              setPostComment(postFeed.comment);
              navigation.navigate('PostDetail', {postID: postFeed.id});
            }}>
            <View style={stylesPOST.PostFooter}>
              <Text style={stylesPOST.TextCount}>
                {postFeed.comment.length} Bình luận
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="Fontisto"
                  name="comment"
                  color="#ededed"
                  style={{color: '#333333', fontSize: 18, marginRight: 8}}
                />
                <Text style={{fontSize: 14}}>Bình luận</Text>
              </View>
              {/* </Button> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  });
};

const stylesPOST = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginVertical: 6,
    borderRadius: 5,
  },
  postHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingVertical: 0,
    paddingHorizontal: 11,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  UserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222121',
  },
  PostTime: {
    fontSize: 12,
    color: '#747476',
  },
  PostTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 11,
    paddingVertical: 0,
  },
  PostDescription: {
    fontSize: 14,
    color: '#222121',
    paddingHorizontal: 11,
    paddingVertical: 0,
  },
  PhotoGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexWrap: 'wrap',
  },
  PhotoContainer: {
    width: '50%',
    padding: 10,
  },
  PostPhoto: {
    width: '100%',
    height: 210,
  },
  PostFooter: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TextCount: {
    fontSize: 11,
    color: '#424040',
  },
  Button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  txt: {
    fontSize: 12,
    color: '#424040',
  },
  BreakLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#000',
  },
  OverlayGroup: {
    width: '100%',
    position: 'relative',
    backgroundColor: '#111',
  },
  Overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // top: 0,
    // left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    opacity: 0.6
  },
  User: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#1777f2',
    borderWidth: 3,
    // borderWidth: ${(props) => (props.story ? '3px' : 0)};
  },
});

export default PostOfFeed;
