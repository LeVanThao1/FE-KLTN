import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import moment from 'moment';
// import {Entypo, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {Icon, Text} from 'native-base';
// import {Text} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Toast from 'react-native-toast-message';
// import styled from 'styled-components/native';
import {NOTIFI} from '../../constants';
import {DELETE_POST} from '../../query/post';
import ImageFooter from '../../screens/chatting/components/ImageFooter';
import {Notification} from '../../utils/notifications';


//
const PostOne = ({route, postUser, type}) => {
  return useObserver(() => {
    const {
      stores: {user, comment, post},
    } = useContext(MobXProviderContext);
    const navigation = useNavigation();
    const {info, posts} = user;
    const {postComment, setPostComment} = comment;
    const [visible, setIsVisible] = useState(false);
    const [index, setIndex] = useState(0);
    const postId = postUser?.id;
    const [deletePost, {called, loading, data, error}] = useMutation(
      DELETE_POST,
      {
        onCompleted: async (data) => {
          const newData = [...posts].filter((p) => p.id + '' !== postUser.id + '');
          user.setPosts([...newData]);
          post.setGeneral([...newData]);
          Toast.show(Notification(NOTIFI.success, 'Xóa thành công'));
        },
        onError: (err) => {
          Toast.show(Notification(NOTIFI.error, err.message));
          console.log(err);
        },
      },
    );
    const onAlert = () => {
      Alert.alert('Đồng ý xóa', 'Lựa chọn', [
        {text: 'Đồng ý', onPress: () => onPress()},
        {text: 'Hủy'},
      ]);
    };
    const onPress = () => {
      deletePost({
        variables: {
          id: postUser.id,
        },
      });
    };

    return (
      <View style={{paddingHorizontal: 14, paddingVertical: 0}}>
        {/* <Container> */}
        <View style={stylesPOST.container}>
          <View style={stylesPOST.postHeader}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserInfo', {
                  userAvatar: postUser.author.avatar ? postUser.author.avatar : [],
                  userName: postUser.author.name ? postUser.author.name : '',
                  userPhone: postUser.author.phone ? postUser.author.phone : '',
                  userMail: postUser.author.email ? postUser.author.email : '',
                  userAddress: postUser.author.address ? postUser.author.address : '',
                })
              }>
              <View style={stylesPOST.row}>
                <Image
                  style={stylesPOST.User}
                  source={{
                    uri:
                    postUser.author.id === user.info.id
                        ? user.info.avatar
                        : postUser.author.avatar,
                  }}
                />
                <View style={{paddingLeft: 10}}>
                  <Text style={stylesPOST.UserName}>{postUser.author.name}</Text>
                  <View style={stylesPOST.row}>
                    <Text style={stylesPOST.PostTime}>
                      {moment(moment(postUser.createdAt)._d).fromNow()}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {postUser.author.id === user.info.id ? (
              <TouchableOpacity onPress={onAlert}>
                <Icon name="dots-horizontal" type="MaterialCommunityIcons" />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <View style={stylesPOST.BreakLine} />
          <TouchableOpacity
            onPress={() => {
              user.setPostCurrent(postUser);
              setPostComment(postUser.comment);
              navigation.navigate('PostDetail', {postID: postUser.id});
            }}>
            <View
              style={{
                paddingVertical: 8,
                borderBottomColor: '#000000',
                borderBottomWidth: 0.5,
              }}>
              <Text style={stylesPOST.PostTitle}>{postUser.title}</Text>
              <Text style={stylesPOST.PostDescription}>{postUser.description}</Text>
              <ImageView
                images={postUser.images.map((t) => ({uri: t}))}
                imageIndex={index}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
                FooterComponent={({imageIndex}) => (
                  <ImageFooter
                    imageIndex={imageIndex}
                    imagesCount={postUser.images.length}
                  />
                )}
              />
              {postUser.images.length < 3 ? (
                // <View style={stylesPOST.PhotoGroup}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  {postUser.images.map((img, i) => (
                    <View style={stylesPOST.PhotoContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          setIndex(i);
                          setIsVisible(true);
                        }}>
                        {/* <PostPhoto source={{uri: img}} /> */}
                        <Image
                          style={stylesPOST.PostPhoto}
                          // style={{opacity: !loading ? 1 : 0.5}}
                          source={{
                            uri: img,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    // cai cong 3 ak ha u h ma lam cai + do la sao bam, neu h bam la no hien thi 1 list luon
                    // cai onPress ảnh thêm vào chỗ nào cùng dc à thấy chưa, vaixz lz roiof ko click dc anhr dods
                  ))}
                </View>
              ) : (
                //
                <View style={stylesPOST.PhotoGroup}>
                  {postUser.images.slice(0, 1).map((img, i) => (
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
                              source={{uri: postUser.images[1]}}
                            />
                            <View style={stylesPOST.Overlay}>
                              <Text style={{color: '#ffffff', fontSize: 22}}>
                                + {postUser.images.length - 1}
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
            <TouchableOpacity
              onPress={() => {
                user.setPostCurrent(post);
                setPostComment(postUser.comment);
                navigation.navigate('PostDetail', {postID: postUser.id});
              }}>
              <View style={stylesPOST.PostFooter}>
                <Text style={stylesPOST.TextCount}>
                  {postUser.comment.length} Bình luận
                </Text>
                {/* <TouchableOpacity
                style={stylesPOST.Button}
                onPress={() => console.log('onPresssssssssssssssss')}> */}
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
                    style={{color: '#333333', fontSize: 20, marginRight: 8}}
                  />
                  <Text style={{fontSize: 14}}>Bình luận</Text>
                </View>
                {/* </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* </Container> */}
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
    flexWrap: 'wrap',
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
    fontSize: 12,
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

export default PostOne;
