import {MobXProviderContext, useObserver} from 'mobx-react';
import {Spinner, Text} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {queryData} from '../../common';
import {GET_POSTS} from '../../query/post';
import PostOne from '../post/post';
import PostOfFeed from '../post/postOfFeed';

const Feed = () => {
  return useObserver(() => {
    const {
      stores: {user},
    } = useContext(MobXProviderContext);
    const [refreshing, setRefreshing] = React.useState(false);
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      queryData(GET_POSTS, {id: null})
        .then(({data}) => {
          setPosts(data.posts);
          setLoading(false);
          setRefreshing(false);
        })
        .catch((err) => console.log(err));
    }, [refreshing]);

    return (
      <ScrollView
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
              <PostOfFeed key={pt.id} post={pt} info={user.info} type={false} />
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

export default memo(Feed);
