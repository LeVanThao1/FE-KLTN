import {useLazyQuery, useMutation} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Icon, Spinner, Text, View} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {Image, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Toast from 'react-native-toast-message';
import {COLORS, NOTIFI} from '../../constants';
import {CREATE_COMMENT_POST} from '../../query/comment';
import {GET_POST} from '../../query/post';
import ImageFooter from '../../screens/chatting/components/ImageFooter';
import formatMoney from '../../utils/format';
import {Notification} from '../../utils/notifications';
import Comment from './comment';
import {stylesPost} from './stylePost';

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
                  Hình ảnh
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
                    <Text>Người đăng </Text>
                    <Text style={stylesPost.detail}>
                      {postCurrent?.author.name}
                    </Text>
                  </TouchableOpacity>
                  {/* </View> */}
                  <View style={stylesPost.titleCenter}>
                    <Text style={stylesPost.txtBold}>Tiêu đề </Text>
                    <Text style={stylesPost.titlePost}>
                      {postCurrent?.title}
                    </Text>
                  </View>
                  <View style={stylesPost.titleCenter}>
                    <Text style={stylesPost.txtBold}>Thông tin sách</Text>
                  </View>
                  <View style={stylesPost.horizontal}>
                    <Text>Tên sách </Text>
                    <Text style={stylesPost.detail}>
                      {postCurrent?.name}
                    </Text>
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
                </View>
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
                    Bình luận
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
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: COLORS.primary,
                        paddingVertical: 10,
                        borderRadius: 10,
                        width: 130,
                      }}
                      onPress={() =>
                        navigation.navigate('UpdatePost', {
                          postId: postCurrent?.id,
                        })
                      }>
                      <Text style={stylesPost.btn}>Cập nhật</Text>
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
