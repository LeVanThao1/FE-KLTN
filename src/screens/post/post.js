import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
// import {Text} from 'native-base';
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
import {View} from 'react-native';
import styled from 'styled-components/native';
// import {Entypo, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {Icon} from 'native-base';

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
  width: 180px;
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
          <View
            style={{
              paddingVertical: 8,
              borderBottomColor: '#000000',
              borderBottomWidth: 0.5,
            }}>
            <PostTitle>{post.title}</PostTitle>
            <PostDescription>{post.description}</PostDescription>
            <PostPhoto source={require('../../assets/images/post1.jpg')} />
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
        </Container>
        {/* ------------------------------------ */}
        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate('UserInfo', {
              userAvatar: post.author.avatar ? post.author.avatar : [],
              userName: post.author.name ? post.author.name : '',
              userPhone: post.author.phone ? post.author.phone : '',
              userMail: post.author.email ? post.author.email : '',
              userAddress: post.author.address ? post.author.address : '',
            })
          }> */}
        {/* <View style={stylesPost.info}>
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
            </View> */}
        {/* </TouchableOpacity>

        <TouchableOpacity onPress={onPress} style={{backgroundColor: 'red'}}>
          <Icon
            name="delete-outline"
            type="MaterialIcons"
            style={{color: '#fff'}}
          />
        </TouchableOpacity> */}

        {/* </View> */}

        {/* <TouchableOpacity
          onPress={() => {
            user.setPostCurrent(post);
            setPostComment(post.comment);
            navigation.navigate('PostDetail');
          }}> */}
        {/* <View> */}

        {/* <View style={stylesPost.text}>
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
          /> */}

        {/* </View> */}
        {/* </TouchableOpacity> */}
        {/* <View style={stylesPost.content}>
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
        </View> */}
        {}
        {/* <View
          style={{
            flex: 1,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            height: 8,
            backgroundColor: '#d8d8d8',
            marginHorizontal: -15,
          }}></View> */}
      </View>
    );
  });
};

export default PostOne;
