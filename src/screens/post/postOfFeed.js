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
import {COLORS, NOTIFI} from '../../constants';

import ImageView from 'react-native-image-viewing';
import ImageFooter from '../../screens/chatting/components/ImageFooter';

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
  border-color: #e6e6e6;
  border-top-width: 1px;
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
  height: 210px;
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
    const navigation = useNavigation();
    const {posts} = user;
    const {postComment, setPostComment} = comment;
    const [visible, setIsVisible] = useState(false);
    const [index, setIndex] = useState(0);

    const postId = post?.id;
    const [deletePost, {called, loading, data, error}] = useMutation(
      DELETE_POST,
      {
        onCompleted: async (data) => {
          const newData = [...posts].filter((p) => p.id + '' !== post.id + '');
          user.setPosts([...newData]);
          Toast.show(Notification(NOTIFI.success, 'X??a th??nh c??ng'));
        },
        onError: (err) => {
          Toast.show(Notification(NOTIFI.error, err.message));
          console.log(err);
        },
      },
    );
    const onAlert = () => {
      Alert.alert('?????ng ?? x??a', 'L???a ch???n', [
        {text: '?????ng ??', onPress: () => onPress()},
        {text: 'H???y'},
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
      <View style={{paddingHorizontal: 14, paddingVertical: 0}}>
        <ImageView
          images={post.images.map((t) => ({uri: t}))}
          imageIndex={index}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
          // FooterComponent={({imageIndex}) => (
          //   <ImageFooter
          //     imageIndex={imageIndex}
          //     imagesCount={post.images.length}
          //   />
          // )}
        />
        <Container>
          <PostHeader>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserInfo', {
                  id: post.author.id ? post.author.id : '',
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
              navigation.navigate('PostDetail', {postID: post.id});
            }}>
            <View
              style={{
                paddingVertical: 8,
              }}>
              <PostTitle>{post.title}</PostTitle>
              <PostDescription numberOfLines={4}>
                {post.description}
              </PostDescription>
            </View>
          </TouchableOpacity>

          <View>
            <View>
              <ImageView
                images={post.images.map((t) => ({uri: t}))}
                imageIndex={index}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
                FooterComponent={({imageIndex}) => (
                  <ImageFooter
                    imageIndex={imageIndex}
                    imagesCount={post.images.length}
                  />
                )}
              />
            </View>
            {post.images.length < 3 ? (
              <PhotoGroup>
                {post.images.map((img, i) => (
                  <PhotoContainer key={i.toString()}>
                    <TouchableOpacity
                      onPress={() => {
                        setIndex(i);
                        setIsVisible(true);
                      }}>
                      <PostPhoto
                        source={{
                          uri: img,
                        }}
                      />
                    </TouchableOpacity>
                  </PhotoContainer>
                ))}
              </PhotoGroup>
            ) : (
              //
              <PhotoGroup>
                {post.images.slice(0, 1).map((img, i) => (
                  <>
                    <PhotoContainer>
                      {/* <PostPhoto source={{uri: img}} /> */}
                      <TouchableOpacity
                        onPress={() => {
                          setIndex(i);
                          setIsVisible(true);
                        }}>
                        <PostPhoto key={i} source={{uri: img}} />
                      </TouchableOpacity>
                    </PhotoContainer>
                    <PhotoContainer>
                      <OverlayGroup>
                        <TouchableOpacity
                          onPress={() => {
                            setIndex(1);
                            setIsVisible(true);
                          }}>
                          <PostPhoto source={{uri: post.images[1]}} />
                          <Overlay>
                            <Text style={{color: '#ffffff', fontSize: 22}}>
                              + {post.images.length - 1}
                            </Text>
                          </Overlay>
                        </TouchableOpacity>
                      </OverlayGroup>
                    </PhotoContainer>
                  </>
                ))}
              </PhotoGroup>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              user.setPostCurrent(post);
              setPostComment(post.comment);
              navigation.navigate('PostDetail', {postID: post.id});
            }}>
            <PostFooter>
              <TextCount>{post.comment.length} B??nh lu???n</TextCount>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="comment-outline"
                  color="#ededed"
                  style={{color: '#333333', fontSize: 20, marginRight: 8}}
                />
                <Text>B??nh lu???n</Text>
              </View>
              {/* </Button> */}
            </PostFooter>
          </TouchableOpacity>
        </Container>
      </View>
    );
  });
};

export default PostOfFeed;
