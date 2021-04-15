import {useLazyQuery} from '@apollo/client';
import {Button, Icon, Text, View} from 'native-base';
import React, {useState, memo, useEffect} from 'react';
import {Image} from 'react-native';
import {TextInput, FlatList, ScrollView, TouchableOpacity} from 'react-native';

import Images from '../../assets/images/images';
import {GET_POSTS} from '../../query/post';
import {stylesPost} from './stylePost';

const Feed = () => {
  const [post, setPost] = useState(null);
  const [listPost, setListPost] = useState(null);
  const [posts, {called, loading, data, error}] = useLazyQuery(GET_POSTS, {
    onCompleted: async (data) => {
      setPost(data?.posts);
      setListPost(
        data.posts.map((ct, i) => ({
          id: ct.id,
          image: ct.images[0],
          title: ct.title,
          description: ct.description,
          name: ct.name ? ct.name : ct.author.name,
          avatar: ct.author.avatar,
        })),
      );
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    posts({
      variables: {
        id: null,
      },
    });
  }, []);

  console.log('post.......', listPost);

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        {/* <View style={stylesPost.post}>
        <View style={stylesPost.info}>
          <Image source={Images.onepiece1} style={stylesPost.avt} />
          <Text style={stylesPost.name}>Monkey D Luffy dd</Text>
        </View>
      </View> */}
        <View style={stylesPost.person}>
          <View style={stylesPost.info}>
            <Image source={Images.onepiece1} style={stylesPost.avt} />
            <Text style={stylesPost.name}>{listPost.name}</Text>
          </View>
          <Icon name="dots-horizontal" type="MaterialCommunityIcons" />
        </View>
        {/* <Image source={{uri: listPost.image}} style={stylesPost.post} /> */}
        <Image source={Images.onepiece2} style={stylesPost.post} />

        <Text>Vài giây trước</Text>
        <View style={stylesPost.content}>
          <View style={stylesPost.action}>
            <View style={stylesPost.heart_cmt}>
              <Icon name="heart-o" type="FontAwesome" />
              <Text style={stylesPost.textCount}>10</Text>
              <Icon
                name="comment-o"
                type="FontAwesome"
                style={{paddingLeft: 15}}
              />
              <Text style={stylesPost.textCount}>20</Text>
            </View>
            <Icon
              name="share"
              type="FontAwesome"
              // style={{color: '#fff', borderColor: '#111'}}
            />
          </View>
          <View style={stylesPost.text}>
            <Text style={{fontWeight: 'bold'}}>{listPost.name}</Text>
            <Text style={stylesPost.textContent}>
              {listPost.description + 'ádasd'}
            </Text>
          </View>
          <View style={stylesPost.addCmt}>
            <View style={stylesPost.person}>
              <View style={stylesPost.info}>
                <Image source={Images.onepiece1} style={stylesPost.avtcmt} />
                <TextInput
                  style={stylesPost.name}
                  placeholder="Thêm bình luận"
                />
              </View>
            </View>
          </View>
          <View style={stylesPost.cmt}></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default memo(Feed);
