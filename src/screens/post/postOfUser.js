import {useLazyQuery} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Spinner, Text, View, Icon} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {queryData} from '../../common';
import {GET_POSTS_USER} from '../../query/post';
import {button} from './style';
import PostOne from './post';

const PostOfUser = ({navigation, posts}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  return (
    <View>
      <ScrollView horizontal={false}>
        {posts && posts.length > 0 ? (
          posts.map((pt) => <PostOne key={pt.id} postUser={pt} type={true} />)
        ) : (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            Không có bài viết
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default PostOfUser;
