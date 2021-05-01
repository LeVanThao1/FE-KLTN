import {useMutation} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Button, Form, Icon, Item, Picker, Text, View, Toast} from 'native-base';
import React, {memo, useContext, useState} from 'react';
import {Image, Alert} from 'react-native';
import {
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Textarea from 'react-native-textarea';

import Images from '../../assets/images/images';
import {UPDATE_POST} from '../../query/post';
import {stylesPost} from './stylePost';

const UpdatePost = ({route}) => {
  return useObserver(() => {
    const {
      stores: {user, category},
    } = useContext(MobXProviderContext);
    const {posts, postCurrent} = user;
    const {postId} = route.params;
    console.log('post-current', postCurrent);
    const [title, setTitle] = useState({
      value: postCurrent.title ? postCurrent.title : '',
      error: '',
    });
    const [description, setDescription] = useState({
      value: postCurrent.description ? postCurrent.description : '',
      error: '',
    });

    const [bookWanna, setBookWanna] = useState({
      value: postCurrent.bookWanna[0] ? postCurrent.bookWanna[0] : '',
      error: '',
    });

    const [price, setPrice] = useState({
      value: postCurrent.price ? postCurrent.price.toString() : '0',
      error: '',
    });
    const [year, setYear] = useState({
      value: postCurrent.year ? postCurrent.year : '',
      error: '',
    });
    const [publisher, setPublisher] = useState({
      value: postCurrent.publisher ? postCurrent.publisher : '',
      error: '',
    });
    const [categori, setCategori] = useState({
      value: '',
      error: '',
    });
    const [numberOfReprint, setNumberOfReprint] = useState({
      value: postCurrent.numberOfReprint
        ? postCurrent.numberOfReprint.toString()
        : '0',
      error: '',
    });

    const [image, setImage] = useState({
      value: postCurrent.images ? postCurrent.images : '',
      error: '',
    });

    console.log('imgs', image.value);
    const onChange = (value) => {
      setCategori({
        value: value,
      });
    };

    const [updatePost, {called, loading, data, error}] = useMutation(
      UPDATE_POST,
      {
        onCompleted: async (data) => {
          const newData = [...posts].filter((p) => p.id + '' !== postId + '');

          let dataPost = {
            title: title.value,
            description: description.value,
            bookWanna: [bookWanna.value],
            images: ['https://picsum.photos/200/300'],
            publisher: publisher.value,
            numberOfReprint: Number(numberOfReprint.value),
            // category: categori.value,
            year: year.value,
            price: Number(price.value),
          };
          user.setPosts([dataPost, ...newData]);
          NavigationPreloadManager.goBack();
          Toast.show({
            text: 'Cập nhật thành công',
            type: 'success',
            position: 'top',
            style: {backgroundColor: 'rgba(68, 108, 179, 1)', color: '#ffffff'},
          });
        },
        onError: (err) => {
          console.log(err);
          Toast.show({
            text: 'Cập nhật không thành công',
            type: 'danger',
            position: 'top',
            style: {backgroundColor: 'rgba(68, 108, 179, 1)', color: '#ffffff'},
          });
        },
      },
    );

    const onAlert = () => {
      Alert.alert('Đồng ý cập nhật', 'Lựa chọn', [
        {text: 'Đồng ý', onPress: () => onUpdate()},
        {text: 'Hủy'},
      ]);
    };

    const onUpdate = () => {
      let dataPost = {
        title: title.value,
        description: description.value,
        bookWanna: [bookWanna.value],
        images: ['https://picsum.photos/200/300'],
        publisher: publisher.value,
        numberOfReprint: Number(numberOfReprint.value),
        // category: categori.value,
        year: year.value,
        price: Number(price.value),
      };
      updatePost({
        variables: {
          dataPost,
          id: postId,
        },
      });
    };
    return (
      <ScrollView horizontal={false}>
        <View style={stylesPost.addpost}>
          <ScrollView showsVerticalScrollIndicator>
            <View style={stylesPost.textImg}>
              <Text>Hình ảnh</Text>
              <View style={stylesPost.imgBookDetail}>
                {postCurrent.images?.map((img, i) => (
                  <Image
                    key={i}
                    source={{uri: img}}
                    style={stylesPost.imgBook}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={stylesPost.content}>
            <View style={stylesPost.ct}>
              <Text>Tiêu đề: </Text>
              <TextInput
                style={stylesPost.txtInput}
                placeholder="Nhập tiêu đề"
                value={title.value}
                onFocus={() => {
                  setTitle({
                    ...title,
                    error: '',
                  });
                }}
                onChangeText={(value) => {
                  setTitle({
                    ...title,
                    value: value,
                  });
                }}
              />
              <View style={stylesPost.ct}>
                <Text>Nhà xuất bản </Text>
                <TextInput
                  style={stylesPost.txtInput}
                  placeholder="Nhập tên nhà xuất bản"
                  value={publisher.value}
                  onFocus={() => {
                    setPublisher({
                      ...publisher,
                      error: '',
                    });
                  }}
                  onChangeText={(value) => {
                    setPublisher({
                      ...publisher,
                      value: value,
                    });
                  }}
                />
              </View>
              <View style={stylesPost.horizontal}>
                <Text>Số lần xuất bản </Text>
                <TextInput
                  style={stylesPost.txtPrice}
                  placeholder="Nhập số lần xuất bản"
                  value={numberOfReprint.value}
                  onFocus={() => {
                    setNumberOfReprint({
                      ...numberOfReprint,
                      error: '',
                    });
                  }}
                  onChangeText={(value) => {
                    setNumberOfReprint({
                      ...numberOfReprint,
                      value: Number(value),
                    });
                  }}
                />
              </View>
              <View style={stylesPost.horizontal}>
                <Text>Năm xuất bản </Text>
                <TextInput
                  style={stylesPost.txtPrice}
                  placeholder="Nhập năm xuất bản"
                  onFocus={() => {
                    setYear({
                      ...year,
                      error: '',
                    });
                  }}
                  onChangeText={(value) => {
                    setYear({
                      ...year,
                      value: value,
                    });
                  }}
                  value={year.value}
                />
              </View>
              <View style={stylesPost.horizontal}>
                <Text>Giá sách</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    style={stylesPost.txtVND}
                    // style={stylesPost.input}
                    placeholder="Nhập giá sách"
                    value={price.value}
                    onFocus={() => {
                      setPrice({
                        ...price,
                        error: '',
                      });
                    }}
                    onChangeText={(value) => {
                      setPrice({
                        ...price,
                        value: value,
                      });
                    }}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 8,
                      fontSize: 14,
                    }}>
                    VND
                  </Text>
                </View>
              </View>
              <View style={stylesPost.ct}>
                <Text>Sách muốn đổi: </Text>
                <TextInput
                  style={stylesPost.txtInput}
                  // style={{fontWeight: 'bold'}}
                  placeholder="Nhập sách muốn đổi"
                  onFocus={() => {
                    setBookWanna({
                      ...bookWanna,
                      error: '',
                    });
                  }}
                  onChangeText={(value) => {
                    setBookWanna({
                      ...bookWanna,
                      value: value,
                    });
                  }}
                  value={bookWanna.value}
                />
              </View>
              <Text style={stylesPost.textContent}>Mô tả</Text>
              <Textarea
                containerStyle={stylesPost.textareacont}
                style={stylesPost.textarea}
                onFocus={() => {
                  setDescription({
                    ...description,
                    error: '',
                  });
                }}
                onChangeText={(value) => {
                  setDescription((cur) => ({...cur, value: value}));
                }}
                value={description.value}
                maxLength={200}
                placeholder={'Nhập mô tả sách'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                placeholder="Nhập mô tả"
              />
              <TouchableOpacity style={{width: '100%'}} onPress={onAlert}>
                <Text style={stylesPost.btn}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  });
};

export default memo(UpdatePost);
