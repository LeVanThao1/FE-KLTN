import {useMutation} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Button, Form, Icon, Item, Picker, Text, View} from 'native-base';
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
import {COLORS} from '../../constants/themes';
import Images from '../../assets/images/images';
import {UPDATE_POST} from '../../query/post';
import {CREATE_COMMENT_BOOK, CREATE_COMMENT_POST} from '../../query/comment';
import Comment from '../post/comment';
import {stylesPost} from './styles';
import {Notification} from '../../utils/notifications';
import Toast from 'react-native-toast-message';
import {NOTIFI} from '../../constants';

const BookDetail = ({navigation, book}) => {
  return useObserver(() => {
    const {
      stores: {user, category, comment},
    } = useContext(MobXProviderContext);
    const {info, bookCurrent, setBookCurrent} = user;
    const {bookComment, setBookComment} = comment;
    const [cmts, setCmts] = useState('');
    const [addCmt, setAddCmt] = useState('');

    const [createComment] = useMutation(CREATE_COMMENT_BOOK, {
      onCompleted: (data) => {
        console.log('datapost', data.createCommentBook);
        setBookCurrent({
          ...bookCurrent,
          comment: [data.createCommentBook, ...bookCurrent.comment],
        });
        setBookComment([data.createCommentBook, ...bookComment]);
      },
      onError: (err) => {
        Toast.show(Notification(NOTIFI.error, err.message));
        console.log('gaga', err);
      },
    });

    // console.log('adadadsadsadasdsd ', postCurrent.comment[0]);
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
    console.log('images book detail', book)
    return (
      <ScrollView horizontal={false}>
        <View style={stylesPost.addpost}>
          <ScrollView showsVerticalScrollIndicator>
            <View style={stylesPost.textImg}>
              <Text style={{fontWeight: 'bold', paddingHorizontal: 10}}>
                Hình ảnh
              </Text>
              {/* <ScrollView>
                {bookCurrent.images?.map((img, i) => (
                  <Image
                    key={i}
                    source={{uri: img}}
                    style={stylesPost.imgBook}
                  />
                ))}
              </ScrollView> */}
              {(bookCurrent.images.length > 3) ?  
              <View style={stylesPost.imgBookDetail}>
                <ScrollView horizontal={true}>
                  {bookCurrent.images.map((img, i) => (
                    <Image
                      // key={i}
                      source={{uri: img}}
                      style={stylesPost.imgBook}
                    />
                  ))}
                </ScrollView>
              </View> : 
              <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                  {bookCurrent.images.map((img, i) => (
                    <Image
                      key={i}
                      source={{uri: img}}
                      style={stylesPost.imgBook}
                    />
                  ))}
                </View>} 
           
            </View>
          </ScrollView>
          <View style={stylesPost.content}>
            <View style={stylesPost.text}>
              <View style={stylesPost.titleCenter}>
                <Text style={stylesPost.txtBold}>Tên sách</Text>
                <Text style={stylesPost.titlePost}>{bookCurrent.name}</Text>
              </View>
              {/* <View style={stylesPost.titleCenter}>
                <Text style={stylesPost.txtBold}>Thông tin sách</Text>
              </View> */}
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
                  <Text style={stylesPost.detail}>{bookCurrent.price}</Text>
                  <Text
                    style={{paddingLeft: 5, color: COLORS.primary}}>
                    VND
                  </Text>
                </View>
              </View>
              <View style={stylesPost.elment}>
                <Text>Sách muốn đổi </Text>
                <Text style={stylesPost.detail}>asdas</Text>
              </View>

              <Text style={stylesPost.textContent}>Mô tả</Text>
              <View style={stylesPost.textDes}>
                <Text>{bookCurrent.description}</Text>
              </View>
              {bookComment?.map((cmt, i) => (
                <Comment key={i} cmt={cmt} />
              ))}
              <View style={stylesPost.addCmt}>
                <View style={stylesPost.person}>
                  <View style={stylesPost.info}>
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
                    </View>
                  </View>
                </View>
                <Icon
                  name="ios-arrow-forward-circle-outline"
                  type="Ionicons"
                  style={stylesPost.iconEnter}
                  onPress={onPress}
                />
              </View>

              <TouchableOpacity
                style={{width: '100%'}}
                onPress={
                  () => navigation.navigate('UpdatePost')
                  // setBookCurrent(book)
                }>
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
