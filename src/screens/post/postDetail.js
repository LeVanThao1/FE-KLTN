import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {
  Button,
  Form,
  Icon,
  Item,
  Picker,
  Spinner,
  Text,
  View,
} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {Image} from 'react-native';
import {
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Textarea from 'react-native-textarea';
import ImageView from 'react-native-image-viewing';
import Images from '../../assets/images/images';
import {GET_POST, UPDATE_POST} from '../../query/post';
import {CREATE_COMMENT_POST} from '../../query/comment';
import Comment from './comment';
import {stylesPost} from './stylePost';
import Toast from 'react-native-toast-message';
import {Notification} from '../../utils/notifications';
import {COLORS, NOTIFI} from '../../constants';
import formatMoney from '../../utils/format';
import {queryData} from '../../common';

const PostDetail = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {user, category, comment},
    } = useContext(MobXProviderContext);
    const {info, postCurrent, setPostCurrent} = user;
    const {postComment, setPostComment} = comment;
    const [cmts, setCmts] = useState('');
    const [addCmt, setAddCmt] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    const postID = route?.params?.postID;
    const [loading, setLoading] = useState(true);

    const [post, {aa, s, c, d}] = useLazyQuery(GET_POST, {
      onCompleted: async (data) => {
        setLoading(false);
        setPostCurrent(data.post);
        setRefreshing(true);
      },
      onError: (err) => {
        console.log(err);
      },
    });
    useEffect(() => {
      post({
        variables: {
          id: postID,
        },
      });
    }, [refreshing]);
    useEffect(() => {}, [loading]);
    useEffect(() => {}, [postCurrent]);
    const [createComment] = useMutation(CREATE_COMMENT_POST, {
      onCompleted: (data) => {
        setPostCurrent({
          ...postCurrent,
          comment: [data.createCommentPost, ...postCurrent.comment],
        });
        setPostComment([data.createCommentPost, ...postComment]);
      },
      onError: (err) => {
        Toast.show(Notification(NOTIFI.error, err.message));
        console.log('gaga', err);
      },
    });

    const onPress = () => {
      let dataComment = {
        content: cmts,
        type: 'TEXT',
      };
      createComment({
        variables: {
          dataComment,
          postId: postCurrent.id,
        },
      });
    };

    // const [images, setImages] = useState([postCurrent.images])
    return (
      <ScrollView horizontal={false}>
        {!loading ? (
          <View style={stylesPost.addpost}>
            <ScrollView showsVerticalScrollIndicator>
              <View style={stylesPost.textImg}>
                <Text style={{fontWeight: 'bold', paddingHorizontal: 10}}>
                  Hình ảnh
                </Text>
                {/* <View style={{wi}}> */}
                {postCurrent?.images.length > 3 ? (
                  <View style={stylesPost.imgBookDetail}>
                    <ScrollView horizontal={true}>
                      {/* <Text>{postCurrent.images[0]}</Text> */}
                      {/* <Image source={{uri: postCurrent.images[0]}} style={{width: 100, height: 150}}/> */}
                      {postCurrent?.images.map((img, i) => (
                        <Image
                          key={i}
                          source={{uri: img}}
                          style={stylesPost.imgBook}
                        />
                      ))}
                    </ScrollView>
                  </View>
                ) : (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    {postCurrent?.images.map((img, i) => (
                      <Image
                        key={i}
                        source={{uri: img}}
                        style={stylesPost.imgBook}
                      />
                    ))}
                  </View>
                )}
                {/* </View> */}
                {/* <FlatList 
                horizontal={true}
                data={images}
                renderItem={({item, index}) => (
                     <Image key={index} source={{uri: item}} style={stylesPost.imgBook}/> 
                  </View>
                )}r
                keyExtractor={item => item}
              /> */}
              </View>
            </ScrollView>
            <View style={stylesPost.content}>
              <View style={stylesPost.text}>
                <View style={stylesPost.titleCenter}>
                  <Text style={stylesPost.txtBold}>Tiêu đề </Text>
                  <Text style={stylesPost.titlePost}>{postCurrent?.title}</Text>
                </View>
                <View style={stylesPost.titleCenter}>
                  <Text style={stylesPost.txtBold}>Thông tin sách</Text>
                </View>
                <View style={stylesPost.horizontal}>
                  <Text>Nhà xuất bản </Text>
                  <Text style={stylesPost.detail}>
                    {postCurrent?.publisher}
                  </Text>
                </View>

                <View style={stylesPost.horizontal}>
                  <Text>Số lần xuất bản </Text>
                  <Text style={stylesPost.detail}>
                    {postCurrent?.numberOfReprint}
                  </Text>
                </View>
                <View style={stylesPost.horizontal}>
                  <Text>Năm xuất bản </Text>
                  <Text style={stylesPost.detail}>{postCurrent?.year}</Text>
                </View>
                <View style={stylesPost.horizontal}>
                  <Text>Giá sách</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#f00',
                    }}>
                    <Text style={stylesPost.detail}>
                      {formatMoney(postCurrent?.price)}
                    </Text>
                    <Text style={{paddingLeft: 5, color: COLORS.primary}}>
                      VND
                    </Text>
                  </View>
                </View>
                <View style={stylesPost.elment}>
                  <Text>Sách muốn đổi </Text>
                  <Text style={stylesPost.detail}>
                    {postCurrent?.bookWanna}
                  </Text>
                </View>

                <Text style={stylesPost.textContent}>Mô tả</Text>
                <View style={stylesPost.textDes}>
                  <Text>{postCurrent?.description}</Text>
                </View>
                {postCurrent.comment?.map((cmt, i) => (
                  <Comment key={i} cmt={cmt} />
                ))}
                <View style={stylesPost.addCmt}>
                  <View style={stylesPost.cmtInfo}>
                    <Image
                      source={{uri: info.avatar}}
                      style={stylesPost.avtcmt}
                    />
                    <View style={stylesPost.addComment}>
                      <TextInput
                        style={stylesPost.comment}
                        placeholder="Thêm bình luận"
                        value={cmts}
                        onFocus={() => {}}
                        onChangeText={(value) => {
                          setCmts(value);
                        }}
                      />
                      <Icon
                        name="ios-arrow-forward-circle-outline"
                        type="Ionicons"
                        style={stylesPost.iconEnter}
                        onPress={onPress}
                      />
                    </View>
                  </View>
                </View>
                {info.id !== postCurrent?.author.id ? (
                  <></>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primary,
                      paddingVertical: 10,
                      borderRadius: 10,
                    }}
                    onPress={() =>
                      navigation.navigate('UpdatePost', {
                        postId: postCurrent?.id,
                      })
                    }>
                    <Text style={stylesPost.btn}>Cập nhật</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ) : (
          <Spinner color={COLORS.primary} />
        )}
      </ScrollView>
    );
  });
};

export default memo(PostDetail);
