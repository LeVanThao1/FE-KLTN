import {MobXProviderContext, useObserver} from 'mobx-react';
import {Icon, Spinner, Text} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {queryData} from '../../common';
import {COLORS} from '../../constants';
import {GET_POSTS} from '../../query/post';
import PostOfFeed from '../post/postOfFeed';
import {useNavigation} from '@react-navigation/native';

const Feed = () => {
  return useObserver(() => {
    const {
      stores: {user, post},
    } = useContext(MobXProviderContext);
    const navigation = useNavigation();
    const {general, setGeneral} = post;
    const [refreshing, setRefreshing] = React.useState(false);
    // const [posts, setPosts] = useState(null);
    const [option, setOption] = useState({
      limit: 10,
      page: 1,
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      queryData(GET_POSTS, option)
        .then(({data}) => {
          setGeneral(data.posts);
          if (data.posts.length < 10) {
            setStop(true);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
      if (refreshing) {
        setOption({limit: 10, page: 1});
        setStop(false);
        queryData(GET_POSTS, {limit: 10, page: 1})
          .then(({data}) => {
            setGeneral(data.posts);
            // setLoading(false);
            if (data.posts.length < 10) {
              setStop(true);
            }
            setRefreshing(false);
          })
          .catch((err) => {
            console.log(err);
            setRefreshing(false);
          });
      }
    }, [refreshing]);

    const [stop, setStop] = useState(false);
    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
      if (option.page != 1 && !stop) {
        setLoadMore(true);
        queryData(GET_POSTS, option)
          .then(({data}) => {
            if (data.posts.length > 0) {
              setGeneral([...general, ...data.posts]);
              if (data.posts.length < 10) {
                setStop(true);
              }
            } else {
              setOption((cur) => ({...cur, page: cur.page - 1}));
              setStop(true);
            }
            setLoadMore(false);
          })
          .catch((err) => {
            setLoadMore(false);
            console.log(err.message);
            Toast.show(Notification(NOTIFI.error, err.message));
          });
      }
    }, [option]);
    return (
      <View style={{position: 'relative'}}>
        {/* <TouchableOpacity> */}
        {!loading && (
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
        )}

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
            general && general.length > 0 ? (
              <FlatList
                data={general}
                renderItem={({item}) => (
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
                      key={item.id + ''}
                      postFeed={item}
                      info={user.info}
                      type={false}
                    />
                  </>
                )}
                onEndReached={() => {
                  !stop && setOption((cur) => ({...cur, page: cur.page + 1}));
                }}
                onEndReachedThreshold={0.1}
                inverted={false}
                ListFooterComponent={() =>
                  loadMore && <Spinner color={COLORS.primary} size="small" />
                }></FlatList>
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
