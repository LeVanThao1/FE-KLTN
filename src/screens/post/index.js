import {useLazyQuery} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Spinner, Text, View} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {queryData} from '../../common';
import {GET_POSTS_USER} from '../../query/post';
import {button} from '../style';
import PostOne from './post';
const Post = ({navigation, route}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  return useObserver(() => {
    const {
      stores: {user},
    } = useContext(MobXProviderContext);

    const {posts, setPosts, info} = user;
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
        <View style={{position: 'relative'}}>
          <TouchableOpacity
            style={button.addPost}
            onPress={() => navigation.navigate('AddPost')}>
            <Text style={button.addPost}>Thêm post</Text>
          </TouchableOpacity>
        </View>
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
          <Spinner />
        )}
      </ScrollView>
    );
  });
};

export default Post;
