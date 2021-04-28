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
import {CREATE_POST} from '../../query/post';
import {stylesPost} from './stylePost';

const NewPost = () => {
  return useObserver(() => {
    const {
      stores: {user, category},
    } = useContext(MobXProviderContext);

    const [name, setName] = useState({
      value: '',
      error: '',
    });

    const [title, setTitle] = useState({
      value: '',
      error: '',
    });
    const [description, setDescription] = useState({
      value: '',
      error: '',
    });

    const [bookWanna, setBookWanna] = useState({
      value: [],
      error: '',
    });

    const [price, setPrice] = useState({
      value: 0,
      error: '',
    });
    const [year, setYear] = useState({
      value: '',
      error: '',
    });
    const [publisher, setPublisher] = useState({
      value: '',
      error: '',
    });
    const [categori, setCategori] = useState({
      value: '',
      error: '',
    });
    const [numberOfReprint, setNumberOfReprint] = useState({
      value: 0,
      error: '',
    });

    const onChange = (value) => {
      setCategori({
        value: value,
      });
    };

    const [createPost, {called, loading, data, error}] = useMutation(
      CREATE_POST,
      {
        onCompleted: async (data) => {},
        onError: (err) => {
          console.log(err);
        },
      },
    );

    const onPress = () => {
      let dataPost = {
        title: title.value,
        name: name.value,
        description: description.value,
        bookWanna: [bookWanna.value],
        images: ['https://picsum.photos/200/300'],
        publisher: publisher.value,
        numberOfReprint: numberOfReprint.value,
        category: categori.value,
        year: year.value,
        price: price.value,
      };
      createPost({
        variables: {
          dataPost,
        },
      });
    };

    return (
      <ScrollView horizontal={false}>
        <View style={stylesPost.addpost}>
          <View style={stylesPost.content}>
            <View style={stylesPost.text}>
              <View style={stylesPost.vertical}>
                <Text>Tiêu đề: </Text>
                <TextInput
                  style={stylesPost.inp}
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
              </View>
              <View>
                <Text>Tên sách: </Text>
                <TextInput
                  style={stylesPost.inp}
                  placeholder="Nhập tên sách"
                  value={name.value}
                  onFocus={() => {
                    setName({
                      ...name,
                      error: '',
                    });
                  }}
                  onChangeText={(value) => {
                    setName({
                      ...name,
                      value: value,
                    });
                  }}
                />
              </View>
              <View style={stylesPost.vertical}>
                <Text>Danh mục sách</Text>
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
                </Form>
              </View>
              <View>
                <Text>Nhà xuất bản </Text>
                <TextInput
                  style={stylesPost.inp}
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
              <View style={stylesPost.vertical}>
                <Text>Số lần xuất bản </Text>
                <TextInput
                  style={stylesPost.inp}
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
              <View style={stylesPost.vertical}>
                <Text>Năm xuất bản </Text>
                <TextInput
                  style={stylesPost.inp}
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
              <View style={stylesPost.price}>
                <Text>Giá sách *</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    style={stylesPost.inpPrice}
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
                        value: Number(value),
                      });
                    }}
                  />
                  <Text>VND</Text>
                </View>
              </View>
              <View style={stylesPost.vertical}>
                <Text>Sách muốn đổi: </Text>
                <TextInput
                  style={stylesPost.inp}
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
              <View style={stylesPost.vertical}>
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
                    setDescription({
                      ...description,
                      value: value,
                    });
                  }}
                  // defaultValue={this.state.text}
                  maxLength={120}
                  placeholder={'Nhập mô tả sách'}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                  value={description.value}
                  placeholder="Nhập mô tả"
                />
              </View>
              <TouchableOpacity style={{width: '100%'}} onPress={onPress}>
                <Text style={stylesPost.btn}>Đăng bài</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  });
};

export default memo(NewPost);
