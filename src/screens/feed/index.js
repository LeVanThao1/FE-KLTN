import {Button, Icon, Text, View} from 'native-base';
import React, {useState, memo} from 'react';
import {Image} from 'react-native';
import {
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import {styles, stylesTable} from './styles';

import Images from '../../../assets/images/images';
import {stylesPost} from './stylePost';

const All = () => {
  return (
    <ScrollView horizontal={false}>
      <View>
        <View style={stylesPost.post}>
          <View style={stylesPost.info}>
            <Image source={Images.onepiece1} style={stylesPost.avt} />
            <Text style={stylesPost.name}>Monkey D Luffy</Text>
          </View>
        </View>
        <View style={stylesPost.person}>
          <View style={stylesPost.info}>
            <Image source={Images.onepiece1} style={stylesPost.avt} />
            <Text style={stylesPost.name}>Monkey D Luffy</Text>
          </View>
          <Icon name="dots-horizontal" type="MaterialCommunityIcons" />
        </View>
        <Image source={Images.onepiece1} style={stylesPost.post} />
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
            <Text style={{fontWeight: 'bold'}}>MonkeLuffy</Text>
            <Text style={stylesPost.textContent}>
              chào em anh đưunsg đây từ chiều chào em anh đưunsg đây từ chiều
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

export default memo(All);
