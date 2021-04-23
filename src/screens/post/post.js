import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import {Icon, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Image, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import ImageView from 'react-native-image-viewing';
import { DELETE_POST } from '../../query/post';
import {stylesPost} from './stylePost';
const PostOne = ({route, post, info, type}) => {
  const [visible, setIsVisible] = useState(false);
  const navigation = useNavigation();

  const [deletePost, {called, loading, data, error}] = useMutation(DELETE_POST, {
    onCompleted: async(data) => {
      
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const onPress = () => {
    deletePost({
      variables: ({
        id: post.id,
      })
    })
  }

  useEffect(() => {
    
  }, [post])
  console.log('post...', post);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("PostDetail", {
      postId: post.id,
      postTitle: post.title,
      // postBookName: post.uniqueBook.name,
      postDescription: post.description,
      postImg: post.images,
      postYear: post.year,
      postNumPrint: post.numberOfReprint,
      postCategory: post.category,
      postPrice: post.price,
      postPublisher: post.publisher,
      postWanna: post.bookWanna.reduce((a,b) => a+' - '+b, ''),
      postComment: post.comment
    })}>
    <View >      
      <View style={stylesPost.person}>
        <View style={stylesPost.info}>
          <Image
            source={{uri: type ? info.avatar : post.author.avatar}}
            style={stylesPost.avt}
          />
          <Text style={stylesPost.name}>
            {type ? info.name : post.author.name}
          </Text>
        </View>
        <TouchableOpacity>
          <Icon name="dots-horizontal" type="MaterialCommunityIcons" onPress={onPress}/>
        </TouchableOpacity>
      </View>
      <View style={stylesPost.text}>
        <Text style={{fontWeight: 'bold'}}>#{post.title}</Text>
        <Text style={stylesPost.textContent}>{post.description}</Text>
      </View>
      <View style={stylesPost.containerImage}>
        {post.images.map((img, i) => (
          <TouchableHighlight
            key={i}
            style={stylesPost.post}
            onPress={() => setIsVisible(true)}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: img}}
            />
          </TouchableHighlight>
        ))}
      </View>
      <ImageView
        images={post.images.map((im) => ({uri: im}))}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
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
          <Icon name="share" type="FontAwesome" />
        </View>

        <View style={stylesPost.addCmt}>
          <View style={stylesPost.person}>
            <View style={stylesPost.info}>
              <Image source={{uri: info.avatar}} style={stylesPost.avtcmt} />
              <TextInput style={stylesPost.name} placeholder="Thêm bình luận" />
            </View>
          </View>
        </View>
        <View style={stylesPost.cmt}></View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default PostOne;
