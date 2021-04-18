import {Icon, Text, View} from 'native-base';
import React, {useState} from 'react';
import {Image, TextInput, TouchableHighlight} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {stylesPost} from './stylePost';
const PostOne = ({navigation, route, post, info, type}) => {
  const [visible, setIsVisible] = useState(false);

  return (
    <View>
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
        <Icon name="dots-horizontal" type="MaterialCommunityIcons" />
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
  );
};

export default PostOne;
