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

import ImageView from 'react-native-image-viewing';
import ImageFooter from '../../screens/chatting/components/ImageFooter';

const PostDetail = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {user, category, comment},
    } = useContext(MobXProviderContext);
    const {info, postCurrent, setPostCurrent} = user;
    const {postComment, setPostComment} = comment;
    const [cmts, setCmts] = useState('');
    const [addCmt, setAddCmt] = useState('');
    const [visible, setIsVisible] = useState(false);
    const [index, setIndex] = useState(0);
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

    return (
      <ScrollView horizontal={false}>
        {!loading ? (
          <View style={stylesPost.addpost}>
            <ScrollView showsVerticalScrollIndicator>
              <View style={stylesPost.textImg}>
                <Text style={{fontWeight: 'bold', paddingHorizontal: 10}}>
                  H??nh ???nh
                </Text>
                {/* <View style={{wi}}> */}
                <ImageView
                  images={postCurrent?.images.map((t) => ({uri: t}))}
                  imageIndex={index}
                  visible={visible}
                  onRequestClose={() => setIsVisible(false)}
                  FooterComponent={({imageIndex}) => (
                    <ImageFooter
                      imageIndex={imageIndex}
                      imagesCount={postCurrent?.images.length}
                    />
                  )}
                />
                {postCurrent?.images.length > 3 ? (
                  <View style={stylesPost.imgBookDetail}>
                    <ScrollView horizontal={true}>
                      {postCurrent?.images.map((img, i) => (
                        <TouchableOpacity
                          onPress={() => {
                            setIndex(i);
                            setIsVisible(true);
                          }}>
                          <Image
                            key={i}
                            source={{uri: img}}
                            style={stylesPost.imgBook}
                          />
                        </TouchableOpacity>
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
                      <TouchableOpacity
                        onPress={() => {
                          setIndex(i);
                          setIsVisible(true);
                        }}>
                        <Image
                          key={i}
                          source={{uri: img}}
                          style={stylesPost.imgBook}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
            <View style={stylesPost.content}>
              <View style={stylesPost.text}>
                <View style={stylesPost.main}>
                  {/* <View style={stylesPost.horizontalName}> */}
                  <TouchableOpacity
                    style={stylesPost.horizontalName}
                    onPress={() =>
                      navigation.navigate('UserInfo', {
                        id: postCurrent?.author.id,
                      })
                    }>
                    <Text>Ng?????i ????ng </Text>
                    <Text style={stylesPost.detail}>
                      {postCurrent?.author.name}
                    </Text>
                  </TouchableOpacity>
                  {/* </View> */}
                  <View style={stylesPost.titleCenter}>
                    <Text style={stylesPost.txtBold}>Ti??u ????? </Text>
                    <Text style={stylesPost.titlePost}>
                      {postCurrent?.title}
                    </Text>
                  </View>
                  <View style={stylesPost.titleCenter}>
                    <Text style={stylesPost.txtBold}>Th??ng tin s??ch</Text>
                  </View>
                  <View style={stylesPost.horizontal}>
                    <Text>Nh?? xu???t b???n </Text>
                    <Text style={stylesPost.detail}>
                      {postCurrent?.publisher}
                    </Text>
                  </View>

                  <View style={stylesPost.horizontal}>
                    <Text>S??? l???n xu???t b???n </Text>
                    <Text style={stylesPost.detail}>
                      {postCurrent?.numberOfReprint}
                    </Text>
                  </View>
                  <View style={stylesPost.horizontal}>
                    <Text>N??m xu???t b???n </Text>
                    <Text style={stylesPost.detail}>{postCurrent?.year}</Text>
                  </View>
                  <View style={stylesPost.horizontal}>
                    <Text>Gi?? s??ch</Text>
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
                    <Text>S??ch mu???n ?????i </Text>
                    <Text style={stylesPost.detail}>
                      {postCurrent?.bookWanna}
                    </Text>
                  </View>

                  <Text style={stylesPost.textContent}>M?? t???</Text>
                  <View style={stylesPost.textDes}>
                    <Text>{postCurrent?.description}</Text>
                  </View>
                </View>
                {/* {postCurrent.comment?.map((cmt, i) => (
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
                        placeholder="Th??m b??nh lu???n"
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
                </View> */}
                <View
                  style={{
                    backgroundColor: '#fff',
                    marginVertical: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      marginTop: 10,
                      marginBottom: 5,
                      borderBottomColor: '#888',
                      borderBottomWidth: 1,
                      marginHorizontal: 10,
                      fontSize: 16,
                      fontWeight: 'bold',
                      paddingBottom: 5,
                    }}>
                    B??nh lu???n
                  </Text>
                  {postCurrent.comment?.map((cmt, i) => (
                    <Comment key={i} cmt={cmt} />
                  ))}
                  <View style={stylesPost.addCmt}>
                    <View style={stylesPost.person}>
                      <Image
                        source={{uri: info.avatar}}
                        style={stylesPost.avtcmt}
                      />
                      <TextInput
                        style={stylesPost.comment}
                        placeholder="Th??m b??nh lu???n"
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
                  <View style={{flexDirection: 'row',
                  justifyContent:'center'}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primary,
                      paddingVertical: 10,
                      borderRadius: 10,
                      width: 130
                    }}
                    onPress={() =>
                      navigation.navigate('UpdatePost', {
                        postId: postCurrent?.id,
                      })
                    }>
                    <Text style={stylesPost.btn}>C???p nh???t</Text>
                  </TouchableOpacity>
                  </View>
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
