import {useMutation} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Button, Form, Icon, Item, Picker, Text, View} from 'native-base';
import React, {memo, useContext, useState} from 'react';
import {Image, Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {UPLOAD_MULTI_FILE} from '../../query/upload';
import {ReactNativeFile} from 'extract-files';
import {
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Textarea from 'react-native-textarea';
import {Notification} from '../../utils/notifications';
import Images from '../../assets/images/images';
import {CREATE_POST} from '../../query/post';
import {stylesPost} from './stylePost';
import Toast from 'react-native-toast-message';
import {COLORS, NOTIFI, SIZES} from '../../constants';
const NewPost = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {user, category},
    } = useContext(MobXProviderContext);
    const {setPosts, posts} = user;
    const [name, setName] = useState({
      value: '',
      error: '',
    });

    const [title, setTitle] = useState({
      value: '',
      error: '',
    });
    const [author, setAuthor] = useState({
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
    const [imagesUpload, setImageUpload] = useState([]);
    const [images, setImages] = useState([]);
    const [upload] = useMutation(UPLOAD_MULTI_FILE, {
      onCompleted: (data) => {
        const tamp = data.uploadMultiFile.map((dt) => dt.url);
        setImageUpload([...imagesUpload, ...tamp]);
      },
      onError: (err) => {
        Toast.show(Notification(NOTIFI.error, err.message));
        console.log('manage', err);
      },
    });

    const handleChoosePhoto = () => {
      ImagePicker.openPicker({
        multiple: true,
        maxFiles: 10,
        mediaType: 'photo',
      })
        .then((res) => {
          if (res.length > 10 || res.length + images.length > 10) {
            console.log(
              'V?????t qu?? gi???i h???n cho ph??p. Gi???i h???n cho ph??p 10 h??nh ???nh',
            );
            return;
          }
          const tamp = res.map((r) => r.path);
          setImages([...images, ...tamp]);
          const files = res.map(
            (r) =>
              new ReactNativeFile({
                uri: r.path,
                name: 'product',
                type: r.mime,
              }),
          );
          upload({
            variables: {
              files,
            },
          });
        })
        .catch((err) => console.log(err));
    };

    const removeImages = (index) => {
      setImages(images.filter((ig, i) => index !== i));
      setImageUpload(imagesUpload.filter((ig, i) => index !== i));
    };
    const onChange = (value) => {
      console.log(value);
      setCategori({
        value: value,
      });
    };

    const [createPost, {called, loading, data, error}] = useMutation(
      CREATE_POST,
      {
        onCompleted: async (data) => {
          setPosts([data.createPost, ...posts]);
          Toast.show(Notification(NOTIFI.success, 'T???o b??i vi???t th??nh c??ng'));
          setName({
            ...name,
            value: '',
          });
          setTitle({
            ...author,
            value: '',
          });
          setNumberOfReprint({
            ...numberOfReprint,
            value: '0',
          });
          setDescription({
            ...description,
            value: '',
          });
          setPublisher({
            ...publisher,
            value: '',
          });
          setBookWanna({
            ...bookWanna,
            value: [],
          });
          setYear({
            ...year,
            value: '',
          });
          setPrice({
            ...price,
            value: '0',
          });
        },
        onError: (err) => {
          console.log(err);
          Toast.show(
            Notification(NOTIFI.error, 'C?? l???i x???y ra khi t???o b??i vi???t'),
          );
        },
      },
    );
    const validateCreate = () => {
      if (title.value.length < 3) {
        setTitle({
          ...title,
          error: 'Ti??u ????? ph???i d??i h??n 3 k?? t???',
        });
        return 'Ti??u ????? ph???i d??i h??n 3 k?? t???';
      }
      if (name.value.length < 3) {
        setName({
          ...name,
          error: 'T??n s??ch ph???i d??i h??n 3 k?? t???',
        });
        return 'T??n s??ch ph???i d??i h??n 3 k?? t???';
      }
      if (price.value === 0) {
        setPrice({
          ...price,
          error: 'Vui l??ng nh???p gi?? s??ch',
        });
        return 'Vui l??ng nh???p gi?? s??ch';
      }
      return true;
    };

    const onAlert = () => {
      Alert.alert('T???o b??i vi???t m???i ?', 'L???a ch???n', [
        {text: '?????ng ??', onPress: () => onCreate()},
        {text: 'H???y'},
      ]);
    };
    const onCreate = () => {
      if (validateCreate() === true) {
      let dataPost = {
        title: title.value,
        name: name.value,
        // author: author.value,
        description: description.value,
        bookWanna: bookWanna.value,
        images: imagesUpload,
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
    }
    else {
      Toast.show(Notification(NOTIFI.error, validateCreate()));
    }
    };

    return (
      <ScrollView horizontal={false}>
        <View style={stylesPost.addpost}>
          <View style={stylesPost.content}>
            <View style={stylesPost.text}>
              <View style={stylesPost.vertical}>
                <Text>Ti??u ????? *</Text>
                <TextInput
                  style={stylesPost.txtInput}
                  placeholder="Nh???p ti??u ?????"
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
                <Text>T??n s??ch * </Text>
                <TextInput
                  style={stylesPost.txtInput}
                  placeholder="Nh???p t??n s??ch"
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
                <Text>Danh m???c s??ch</Text>
                <Form>
                  <Item picker>
                    <Picker
                      style={stylesPost.picker}
                      mode="dropdown"
                      // iosIcon={<Icon name="arrow-down" />}
                      style={{width: undefined}}
                      placeholder="Ch???n danh m???c"
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
              <View style={stylesPost.vertical}>
                <Text>H??nh ???nh *</Text>
                <ScrollView
                  style={{flexDirection: 'row', marginVertical: 10}}
                  horizontal={true}>
                  {images.length > 0 &&
                    images.map((r, i) => (
                      <View key={i}>
                        <Image
                          style={{
                            width: 100,
                            height: 100,
                            marginRight: 10,
                            position: 'relative',
                          }}
                          source={{uri: r}}
                        />
                        <TouchableOpacity
                          onPress={() => removeImages(i)}
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 10,
                          }}>
                          <Icon
                            type="AntDesign"
                            name="closecircleo"
                            style={{
                              fontSize: 22,
                              color: COLORS.primary,
                            }}></Icon>
                        </TouchableOpacity>
                      </View>
                    ))}
                  {images.length < 10 && (
                    <TouchableOpacity
                      onPress={handleChoosePhoto}
                      style={{
                        // paddingHorizontal: 10,
                        // paddingVertical: 5,
                        margin: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.18,
                        shadowRadius: 1.0,

                        elevation: 1,
                      }}>
                      <Icon
                        type="FontAwesome5"
                        name="plus"
                        style={{
                          fontSize: 50,
                          color: '#f44f4f',
                        }}></Icon>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </View>
              <View>
                <Text>Nh?? xu???t b???n </Text>
                <TextInput
                  style={stylesPost.txtInput}
                  placeholder="Nh???p t??n nh?? xu???t b???n"
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
                <Text>S??? l???n xu???t b???n </Text>
                <TextInput
                  style={stylesPost.txtPrice}
                  placeholder="S??? l???n xu???t b???n"
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
                <Text>N??m xu???t b???n </Text>
                <TextInput
                  style={stylesPost.txtPrice}
                  placeholder="N??m xu???t b???n"
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
                <Text>Gi?? s??ch *</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    style={stylesPost.txtVND}
                    placeholder="Gi?? s??ch"
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
                  <Text
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 12,
                      fontSize: 16,
                    }}>
                    VND
                  </Text>
                </View>
              </View>
              <View style={stylesPost.vertical}>
                <Text>S??ch mu???n ?????i: </Text>
                <TextInput
                  style={stylesPost.txtInput}
                  placeholder="Nh???p s??ch mu???n ?????i"
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
                <Text style={stylesPost.textContent}>M?? t???</Text>
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
                  maxLength={400}
                  placeholder={'Nh???p m?? t??? s??ch'}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                  value={description.value}
                  placeholder="Nh???p m?? t???"
                />
              </View>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={onAlert}>
                <Text
                  style={{
                    marginTop: 10,
                    alignItems: 'center',
                    borderRadius: 6,
                    width: SIZES.acceptBtn,
                    padding: 10,
                    textAlign: 'center',
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                  }}>
                  ????ng b??i
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  });
};

export default memo(NewPost);
