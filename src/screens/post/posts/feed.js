import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
// import {Entypo, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {Icon} from 'native-base';

import PostAvatar from './avatar';

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

const PostCard = () => {
  return (
    <Container>
      <PostHeader>
        <Row>
          <PostAvatar source={require('../../../assets/images/user1.jpg')} />
          <View style={{paddingLeft: 10}}>
            <UserName>User Name</UserName>
            <Row>
              <PostTime>Post time</PostTime>
            </Row>
          </View>
        </Row>
      </PostHeader>
      <BreakLine />
      <View
        style={{
          paddingVertical: 8,
          borderBottomColor: '#000000',
          borderBottomWidth: 0.5,
        }}>
        <PostTitle>Đây là title</PostTitle>
        <PostDescription>Đây là chi tiết</PostDescription>
        <PostPhoto source={require('../../../assets/images/post1.jpg')} />
      </View>
      <PostFooter>
        <TextCount>2k Bình luận</TextCount>
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
  );
};

const Feed = () => {
  return (
    <>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </>
  );
};
export default Feed;
