import React, {PureComponent, PropTypes} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import moment from 'moment';
import {stylesPost} from './stylePost';
import {CREATE_COMMENT_POST} from '../../query/comment';

const Comment = ({cmt, onPr}) => {
  console.log('cmt comment', cmt, 'onpr', onPr);
  const [cmts, setCmts] = useState('');

  const [createCommentPost] = useMutation(CREATE_COMMENT_POST, {
    onCompleted: (data) => {
      console.log('dataComment', data);
      // const newData = [...postComment].filter(cmt => cmt.id+'' !== )
      // const
    },
    onError: (err) => {
      console.log('gaga', err);
    },
  });
  const onPress = () => {
    let dataComment = {
      content: cmts,
      type: 'TEXT',
    };
    createCommentPost({
      variables: {
        dataComment,
        postId: postId,
      },
    });
  };

  return (
    <View>
      <View style={stylesPost.infocmt}>
        <Image source={{uri: cmt.author.avatar}} style={stylesPost.avtcmt} />
        <View style={stylesPost.userCmt}>
          <Text style={stylesPost.name}>{cmt.author.name}</Text>
          <Text style={stylesPost.time}>{cmt.content}</Text>
        </View>
      </View>
      <View style={stylesPost.addCmt}>
        <View style={stylesPost.person}>
          <View style={stylesPost.info}>
            <Image source={{uri: info.avatar}} style={stylesPost.avtcmt} />
            <View style={stylesPost.addComment}>
              <TextInput
                style={stylesPost.comment}
                placeholder="Thêm bình luận"
                value={cmt}
                // onFocus={() => {
                //   setCmt()
                // }}
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  text: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  },
});

export default Comment;
