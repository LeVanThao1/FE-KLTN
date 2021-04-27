import {useMutation} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Button, Form, Icon, Item, Picker, Text, View} from 'native-base';
import React, {memo, useContext, useState} from 'react';
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
import {UPDATE_POST} from '../../query/post';
import {stylesPost} from './stylePost';

const UpdatePost = ({route}) => {
  return useObserver(() => {
    const {
      stores: {user, category},
    } = useContext(MobXProviderContext);
    const {posts} = user;
    const {
      postId,
      postTitle,
      postDescription,
      postImg,
      postYear,
      postNumPrint,
      postCategory,
      postPrice,
      postPublisher,
      postWanna,
      postCmt,
    } = route.params;

    const [title, setTitle] = useState({
      value: postTitle ? postTitle : '',
      error: '',
    });
    const [description, setDescription] = useState({
      value: postDescription ? postDescription : '',
      error: '',
    });

    const [bookWanna, setBookWanna] = useState({
      value: postWanna ? postWanna : '',
      error: '',
    });

    const [price, setPrice] = useState({
      value: postPrice ? postPrice.toString() : '0',
      error: '',
    });
    const [year, setYear] = useState({
      value: postYear ? postYear : '',
      error: '',
    });
    const [publisher, setPublisher] = useState({
      value: postPublisher ? postPublisher : '',
      error: '',
    });
    const [categori, setCategori] = useState({
      value: '',
      error: '',
    });
    const [numberOfReprint, setNumberOfReprint] = useState({
      value: postNumPrint ? postNumPrint.toString() : '0',
      error: '',
    });

    const onChange = (value) => {
      setCategori({
        value: value,
      });
    };

    const [updatePost, {called, loading, data, error}] = useMutation(
      UPDATE_POST,
      {
        onCompleted: async (data) => {
          const newData = [...posts].filter((p) => p.id + '' !== postId);

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
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );

    const renderItem = ({item}) => (
      <View style={stylesPost.content}>
        <Text>Hình ảnh</Text>
        {item.map((img, i) => (
          <Image key={i} source={{uri: img}} style={stylesPost.post} />
        ))}
      </View>
    );

    const onPress = () => {
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
              <View style={stylesPost.img}>
                {postImg.map((img, i) => (
                  <Image key={i} source={{uri: img}} style={stylesPost.post} />
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
              {/* <Text>Danh mục sách</Text>
              <Form>
                <Item picker>
                  <Picker
                    style={stylesPost.picker}
                    mode="dropdown"
                    // iosIcon={<Icon name="arrow-down" />}
                    style={{width: undefined}}
                    placeholder="Chọn danh mục"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={categori}
                    onValueChange={onChange}>
                    {category.categories.map((ct, i) => (
                      <Picker.Item label={ct.name} value={ct.id} />
                    ))}
                  </Picker>
                </Item>
              </Form> */}
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
              <View style={stylesPost.ct}>
                <Text>Số lần xuất bản </Text>
                <TextInput
                  style={stylesPost.txtInput}
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
              <View style={stylesPost.ct}>
                <Text>Năm xuất bản </Text>
                <TextInput
                  style={stylesPost.txtInput}
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
              <View style={stylesPost.ct}>
                <Text>Giá sách</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    style={stylesPost.txtPrice}
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
                  <Text>VND</Text>
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
                maxLength={120}
                placeholder={'Nhập mô tả sách'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                placeholder="Nhập mô tả"
              />
              <TouchableOpacity style={{width: '100%'}} onPress={onPress}>
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
