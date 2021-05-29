import {useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Spinner, Text, View, Icon} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {queryData} from '../../common';
import {GET_POSTS_USER} from '../../query/post';
import {button} from './style';
import PostOne from './post';
import {COLORS} from '../../constants';
const Post = ({route}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  return useObserver(() => {
    const {
      stores: {user, comment},
    } = useContext(MobXProviderContext);
    const navigation = useNavigation();
    const {posts, setPosts, info} = user;
    const {postComment} = comment;

    const userId = route?.params?.userId || info.id;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      queryData(GET_POSTS_USER, {userId})
        .then(({data}) => {
          setPosts(data.posts);
          setLoading(false);
          setRefreshing(false);
        })
        .catch((err) => console.log(err));
    }, [refreshing]);

    return (
      <View>
        <TouchableOpacity
          style={button.bgAdd}
          onPress={() => navigation.navigate('NewPost')}>
          <Icon name="plus" style={button.btnAdd} type="AntDesign" />
          <Text style={{fontSize: 14, color: '#fff'}}>Thêm bài viết</Text>
          {/* </TouchableOpacity> */}
        </TouchableOpacity>
        <ScrollView
          horizontal={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
              }}
            />
          }>
          {!loading ? (
            posts && posts.length > 0 ? (
              posts.map((pt) => (
                <PostOne key={pt.id} post={pt} info={info} type={true} />
              ))
            ) : (
              <Text style={{textAlign: 'center', marginTop: 20}}>
                Không có bài viết
              </Text>
            )
          ) : (
            <Spinner size="small" color={COLORS.primary} />
          )}
        </ScrollView>
      </View>
    );
  });
};

export default Post;
