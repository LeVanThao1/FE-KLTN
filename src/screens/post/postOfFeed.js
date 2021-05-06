import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
// import {Text} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
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
import {View} from 'react-native';
import styled from 'styled-components/native';
// import {Entypo, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {Icon} from 'native-base';

import Avatar from './posts/avatar';
import Toast from 'react-native-toast-message';
import {Notification} from '../../utils/notifications';
import {NOTIFI} from '../../constants';

const Container = styled.View`
  flex: 1;
  background: #ffffff;
  padding: 4px 12px;
  margin: 6px 0;
  border-radius: 5px;
`;
const PostHeader = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  padding: 0 11px;
`;
const Row = styled.View`
  align-items: center;
  flex-direction: row;
`;
const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #222121;
`;
const PostTime = styled.Text`
  font-size: 12px;
  color: #747476;
`;
const PostTitle = styled.Text`
  font-size: 16px;
  font-weightL bold;
  color: #000000;
  line-height: 24px;
  padding: 0 11px;
`;
const PostDescription = styled.Text`
  font-size: 14px;
  color: #222121;
  line-height: 21px;
  padding: 0 11px;
`;
const PhotoGroup = styled.View`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;
const PhotoContainer = styled.View`
  width: 50%;
  padding: 10px;
`;
const PostPhoto = styled.Image`
  width: 100%;
  height: 210px;
`;
const PostFooter = styled.View`
  padding: 10px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TextCount = styled.Text`
  font-size: 11px;
  color: #424040;
`;
const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Text = styled.Text`
  font-size: 12px;
  color: #424040;
`;
const BreakLine = styled.View`
  width: 100%;
  height: 0.5px;
  background: #000000;
`;
const OverlayGroup = styled.View`
  width: 100%;
  position: relative;
`;
const Overlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ViewImg = styled.View`
  width: 100%;
  height: 100%;
`;
//
const User = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-color: #1777f2;
  border-width: ${(props) => (props.story ? '3px' : 0)};
`;
//
const PostOfFeed = ({route, post, info, type}) => {
  return useObserver(() => {
    const {
      stores: {user, comment},
    } = useContext(MobXProviderContext);
    const [visible, setIsVisible] = useState(false);
    const navigation = useNavigation();
    const {posts} = user;
    const {postComment, setPostComment} = comment;
    const postId = post?.id;
    const [deletePost, {called, loading, data, error}] = useMutation(
      DELETE_POST,
      {
        onCompleted: async (data) => {
          const newData = [...posts].filter((p) => p.id + '' !== post.id + '');
          user.setPosts([...newData]);
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
          id: post.id,
        },
      });
    };
    useEffect(() => {}, [post]);
    return (
      <View style={{paddingHorizontal: 14, paddingVertical: 6}}>
        <Container>
          <PostHeader>
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
              <Row>
                <User source={{uri: post.author.avatar}} />
                <View style={{paddingLeft: 10}}>
                  <UserName>{post.author.name}</UserName>
                  <Row>
                    <PostTime>
                      {moment(moment(post.createdAt)._d).fromNow()}
                    </PostTime>
                  </Row>
                </View>
              </Row>
            </TouchableOpacity>            
          </PostHeader>
          <BreakLine />
          <TouchableOpacity
            onPress={() => {
              user.setPostCurrent(post);
              setPostComment(post.comment);
              navigation.navigate('PostDetail', {userId: post.author.id});
            }}>
            <View
              style={{
                paddingVertical: 8,
                borderBottomColor: '#000000',
                borderBottomWidth: 0.5,
              }}>
              <PostTitle>{post.title}</PostTitle>
              <PostDescription>{post.description}</PostDescription>

              {post.images.length < 5 ? (
                <PhotoGroup>
                  {post.images.map((img, i) => (
                    <PhotoContainer>
                      <PostPhoto source={{uri: img}} />
                    </PhotoContainer>
                  ))}
                </PhotoGroup>
              ) : (
                <PhotoGroup>
                  {post.images.slice(0, 3).map((img, i) => (
                    <PhotoContainer>
                      <PostPhoto source={{uri: img}} />
                    </PhotoContainer>
                  ))}
                  {
                    <PhotoContainer>
                      <OverlayGroup>
                        <PostPhoto source={{uri: post.images[4]}} />
                        <Overlay>
                          <Text style={{color: '#ffffff', fontSize: 22}}>
                            + {post.images.length - 3}
                          </Text>
                        </Overlay>
                      </OverlayGroup>
                    </PhotoContainer>
                  }
                </PhotoGroup>
              )}
            </View>
            <PostFooter>
              <TextCount>{post.comment.length} Bình luận</TextCount>
              <Button onPress={() => console.log('onPresssssssssssssssss')}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="comment-outline"
                  color="#ededed"
                  style={{color: '#333333', fontSize: 20, marginRight: 8}}
                />
                <Text>Bình luận</Text>
              </Button>
            </PostFooter>
          </TouchableOpacity>
        </Container>
      </View>
    );
  });
};

export default PostOfFeed;
