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
import {Icon, Toast} from 'native-base';

import Avatar from './posts/avatar';

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
const PostPhoto = styled.Image`
  margin: 9px auto 0;
  width: 40%;
  height: 110px;
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
const PostOne = ({route, post, info, type}) => {
  return useObserver(() => {
    const {
      stores: {user, comment},
    } = useContext(MobXProviderContext);
    const [visible, setIsVisible] = useState(false);
    const navigation = useNavigation();

    const {postComment, setPostComment} = comment;

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
      Toast.show({
        text: 'Xóa thành công',
        type: 'success',
        position: 'top',
        style: {backgroundColor: 'rgba(68, 108, 179, 1)', color: '#ffffff'},
      });
    };

    useEffect(() => {}, [post]);
    console.log('avatar', post.author.avatar);
    return (
      <View style={{paddingHorizontal: 14, paddingVertical: 6}}>
        {/* <View style={stylesPost.person}> */}
        {/* --------------------------------------- */}
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
              navigation.navigate('PostDetail');
            }}>
            <View
              style={{
                paddingVertical: 8,
                borderBottomColor: '#000000',
                borderBottomWidth: 0.5,
              }}>
              <PostTitle>{post.title}</PostTitle>
              <PostDescription>{post.description}</PostDescription>
              {/* <ImageView> */}
              <ViewImg>
                {post.images.map((img, i) => (
                  <PostPhoto source={{uri: img}} />
                ))}
              </ViewImg>
              {/* </ImageView> */}
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

export default PostOne;
