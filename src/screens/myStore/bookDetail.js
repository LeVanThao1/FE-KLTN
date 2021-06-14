import {useMutation} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Icon, Text, View} from 'native-base';
import React, {memo, useContext, useState} from 'react';
import {Image, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Toast from 'react-native-toast-message';
import {NOTIFI} from '../../constants';
import {CREATE_COMMENT_BOOK} from '../../query/comment';
import ImageFooter from '../../screens/chatting/components/ImageFooter';
import formatMoney from '../../utils/format';
import {Notification} from '../../utils/notifications';
import Comment from '../post/comment';
import {stylesPost} from './styles';

const BookDetail = ({navigation, book}) => {
  return useObserver(() => {
    const {
      stores: {user, category, comment, shop},
    } = useContext(MobXProviderContext);
    const {info, bookCurrent, setBookCurrent} = user;
    const {bookComment, setBookComment} = comment;
    const {bookStore, setBookStore} = shop;
    const [cmts, setCmts] = useState('');
    const [addCmt, setAddCmt] = useState('');
    const [visible, setIsVisible] = useState(false);
    const [index, setIndex] = useState(0);
    // console.log(bookCurrent);
    console.log('this',bookStore[1]);
    const [createComment] = useMutation(CREATE_COMMENT_BOOK, {
      onCompleted: (data) => {
        setBookCurrent({
          ...bookCurrent,
          comment: [data.createCommentBook, ...bookCurrent.comment],
        });
        const findIndex = bookStore.findIndex((p) => p.id+ '' === bookCurrent.id + '');
        console.log('this',bookStore[findIndex]);
        const newComment = [...bookStore[findIndex].comment, data.createCommentBook];
        setBookStore([
          ...bookStore.slice(0, findIndex),
          {...bookCurrent.current, comment: [data.createCommentBook,...bookCurrent.comment]},
          // {...bookStore.comment, [data.createCommentBook,...bookCurrent.comment]},
          ...bookStore.slice(findIndex + 1)
        ])
        // rang m add cais current lam gi rua, rag ko trai cai comment ben do thoi
        //  dc chua, ddag test
        // roi hieu
        setBookComment([data.createCommentBook, ...bookComment]);
      },
      onError: (err) => {
        Toast.show(Notification(NOTIFI.error, err.message));
        console.log('gaga', err);
      },
    });
    // m thaays co chuyen gi k
    // chuyen  j tn ms been, kia qua ddau thay j dau,
    // luc nay t comment no hien la cacbonStore, la ten cua hang cua t, ma h no thanh ten t roi
    const onPress = () => {
      let dataComment = {
        content: cmts,
        type: 'TEXT',
      };
      createComment({
        variables: {
          dataComment,
          bookId: bookCurrent.id,
        },
      });
      setCmts('');
    };
    return (
      <ScrollView horizontal={false}>
        <View style={stylesPost.addpost}>
          <ScrollView showsVerticalScrollIndicator>
            <Text
              style={{fontWeight: 'bold', marginHorizontal: 12, marginTop: 10}}>
              Hình ảnh
            </Text>
            <View style={stylesPost.textImg}>
              <ImageView
                images={bookCurrent.images.map((t) => ({uri: t}))}
                imageIndex={index}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
                FooterComponent={({imageIndex}) => (
                  <ImageFooter
                    imageIndex={imageIndex}
                    imagesCount={bookCurrent.images.length}
                  />
                )}
              />

              {/* <View style={stylesPost.imgBookDetail}>
                <ScrollView horizontal={true}>
                  {bookCurrent.images.map((img, i) => (
                    <TouchableOpacity
                      onPress={() => {
                        setIndex(i);
                        setIsVisible(true);
                      }}>
                      <Image
                        // key={i}
                        source={{uri: img}}
                        style={stylesPost.imgBook}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View> */}
              {/*  */}
              {bookCurrent?.images.length > 2 ? (
                <View style={stylesPost.imgBookDetail}>
                  <ScrollView horizontal={true}>
                    {bookCurrent?.images.map((img, i) => (
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
                  {bookCurrent?.images.map((img, i) => (
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
              {/*  */}
            </View>
          </ScrollView>
          <View style={stylesPost.content}>
            <View style={stylesPost.text}>
              <View style={stylesPost.main}>
                <View style={stylesPost.titleCenter}>
                  <Text style={stylesPost.txtBold}>Tên sách</Text>
                  <Text style={stylesPost.titlePost}>{bookCurrent.name}</Text>
                </View>
                <View style={stylesPost.horizontal}>
                  <Text>Danh mục </Text>
                  <Text style={stylesPost.detail}>
                    {bookCurrent.categoryName}
                  </Text>
                </View>
                <View style={stylesPost.horizontal}>
                  <Text>Tác giả </Text>
                  <Text style={stylesPost.detail}>{bookCurrent.author}</Text>
                </View>
                <View style={stylesPost.horizontal}>
                  <Text>Nhà xuất bản </Text>
                  <Text style={stylesPost.detail}>{bookCurrent.publisher}</Text>
                </View>
                <View style={stylesPost.horizontal}>
                  <Text>Số lần xuất bản </Text>
                  <Text style={stylesPost.detail}>
                    {bookCurrent.numberOfReprint}
                  </Text>
                </View>
                <View style={stylesPost.horizontal}>
                  <Text>Năm xuất bản </Text>
                  <Text style={stylesPost.detail}>{bookCurrent.year}</Text>
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
                      {formatMoney(bookCurrent.price)} VNĐ
                    </Text>
                    {/* <Text style={{paddingLeft: 5, color: COLORS.primary}}>
                    VND
                  </Text> */}
                  </View>
                </View>
                {/* <View style={stylesPost.elment}>
                  <Text>Sách muốn đổi </Text>
                  <Text style={stylesPost.detail}>asdas</Text>
                </View> */}
                {/* doi t xi t hop cia da o k */}

                <Text style={stylesPost.textContent}>Mô tả</Text>
                <View style={stylesPost.textDes}>
                  <Text>{bookCurrent.description}</Text>
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
                {bookComment?.map((cmt, i) => (
                  <Comment key={i} cmt={cmt} />
                ))}
                <View style={stylesPost.addCmt}>
                  <View style={stylesPost.person}>
                    <Image
                      source={{uri: shop.info ? shop.info.avatar : info.avatar}}
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

              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                  // setBookCurrent(book);
                  navigation.navigate('UpdateBook');
                }}>
                <Text style={stylesPost.btn}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  });
};

export default memo(BookDetail);
