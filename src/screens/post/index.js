import {useLazyQuery} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Spinner, Text, View, Icon} from 'native-base';
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
      stores: {user, comment},
    } = useContext(MobXProviderContext);

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
        <View style={button.bgAdd}>
          <Icon
            name="add-circle-outline"
            style={button.btnAdd}
            type="Ionicons"
            onPress={() => navigation.navigate('NewPost')}
          />
          {/* </TouchableOpacity> */}
        </View>
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
            <Spinner />
          )}
        </ScrollView>
      </View>
    );
  });
};

export default Post;
