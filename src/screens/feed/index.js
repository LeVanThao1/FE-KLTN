import {MobXProviderContext, useObserver} from 'mobx-react';
import {Icon, Spinner, Text} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import {queryData} from '../../common';
import {COLORS} from '../../constants';
import {GET_POSTS} from '../../query/post';
import PostOfFeed from '../post/postOfFeed';
import {useNavigation} from '@react-navigation/native';

const Feed = () => {
  return useObserver(() => {
    const {
      stores: {user},
    } = useContext(MobXProviderContext);
    const navigation = useNavigation();

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
      <View style={{position: 'relative'}}>
        {/* <TouchableOpacity> */}
        <Icon
          name="pluscircleo"
          type="AntDesign"
          style={{
            position: 'absolute',
            color: COLORS.primary,
            backgroundColor: '#fff',
            borderRadius: 50,
            // width: '100%',
            zIndex: 10,
            fontSize: 36,
            marginRight: 8,
            top: 70,
            right: 15,
          }}
          onPress={() => navigation.navigate('NewPost')}
        />
        {/* </TouchableOpacity> */}
        {/* </View> */}
        <ScrollView
          // contentContainerStyle={{
          //   position: 'relative',
          // }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
              }}
            />
          }>
          {/* bỏ cái này trong loading chứ  dang check thu dc h*/}
          {/* <Icon
          name="pluscircleo"
          type="AntDesign"
          style={{
            position: 'absolute',
            color: COLORS.primary,
            zIndex: 10,
            fontSize: 30,
            marginRight: 8,
          }}
        /> */}
          {!loading ? (
            posts && posts.length > 0 ? (
              posts.map((pt) => (
                <>
                  <View style={{borderRadius: 5, backgroundColor: '#111'}}>
                    <Icon
                      name="pluscircleo"
                      type="AntDesign"
                      style={{
                        position: 'absolute',
                        color: COLORS.primary,
                        // backgroundColor: '#fff',
                        // width: '100%',
                        zIndex: 10,
                        fontSize: 36,
                        marginRight: 8,
                        // right: 0,
                        top: 70,
                        right: 15,
                        // bottom: 0,
                      }}
                    />
                  </View>
                  <PostOfFeed
                    key={pt.id + ''}
                    post={pt}
                    info={user.info}
                    type={false}
                  />
                </>
              ))
            ) : (
              <Text style={{textAlign: 'center', marginTop: 20}}>
                Không có bài viết
              </Text>
            )
          ) : (
            <Spinner color={COLORS.primary} />
          )}
        </ScrollView>
      </View>
    );
  });
};

export default memo(Feed);
