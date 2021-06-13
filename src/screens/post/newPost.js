import {useMutation} from '@apollo/client';
import {ReactNativeFile} from 'extract-files';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Form, Icon, Item, Picker, Text, View} from 'native-base';
import React, {memo, useContext, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Textarea from 'react-native-textarea';
import Toast from 'react-native-toast-message';
import {COLORS, NOTIFI, SIZES} from '../../constants';
import {CREATE_POST} from '../../query/post';
import {UPLOAD_MULTI_FILE} from '../../query/upload';
import {Notification} from '../../utils/notifications';
import {stylesPost} from './stylePost';
const NewPost = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {user, category, post},
    } = useContext(MobXProviderContext);
    const {posts, setPosts} = user;
    const {general, setGeneral} = post;
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
      value: '',
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
      value: category.categories[0].id,
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
              'Vượt quá giới hạn cho phép. Giới hạn cho phép 10 hình ảnh',
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
      setCategori({
        value: value,
        error: '',
      });
    };

    const [createPost, {called, loading, data, error}] = useMutation(
      CREATE_POST,
      {
        onCompleted: async (data) => {
          if (posts) {
            setPosts([data.createPost, ...posts]);
          }
          post.setGeneral([data.createPost, ...general]);
          Toast.show(Notification(NOTIFI.success, 'Tạo bài viết thành công'));
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
          setImageUpload([]);
          setImages([]);
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
          navigation.goBack();
        },
        onError: (err) => {
          console.log(err);
          Toast.show(
            Notification(NOTIFI.error, 'Có lỗi xảy ra khi tạo bài viết'),
          );
        },
      },
    );
    const [errImg, setErrImg] = useState('');
    const validateCreate = () => {
      if (title.value.length < 3) {
        setTitle({
          ...title,
          error: 'Tiêu đề phải dài hơn 3 ký tự',
        });
        return 'Tiêu đề phải dài hơn 3 ký tự';
      }
      if (name.value.length < 3) {
        setName({
          ...name,
          error: 'Tên sách phải dài hơn 3 ký tự',
        });
        return 'Tên sách phải dài hơn 3 ký tự';
      }
      if (imagesUpload.length === 0) {
        setErrImg('Vui lòng upload ít nhất 1 ảnh');
        return 'Vui lòng upload ít nhất 1 ảnh';
      }
      if (publisher.value.length < 3) {
        setPublisher({
          ...publisher,
          error: 'Nhà xuất bản phải dài hơn 3 ký tự',
        });
        return 'Nhà xuất bản phải dài hơn 3 ký tự';
      }
      if (numberOfReprint.value <= 0) {
        setNumberOfReprint({
          ...numberOfReprint,
          error: 'Vui lòng nhập đúng số lần xuất bản',
        });
        return 'Vui lòng nhập đúng số lần xuất bản';
      }
      if (year.value.length !== 4 || Number(year.value) <= 0) {
        setYear({
          ...year,
          error: 'Vui lòng nhập đúng năm xuất bản',
        });
        return 'Vui lòng nhập đúng năm xuất bản';
      }

      if (price.value <= 0) {
        setPrice({
          ...price,
          error: 'Vui lòng nhập đúng giá sách',
        });
        return 'Vui lòng nhập đúng giá sách';
      }

      if (description.value.length < 10) {
        setDescription({
          ...description,
          error: 'Mô tả phải dài hơn 10 ký tự',
        });
        return 'Mô tả phải dài hơn 10 ký tự';
      }
      return true;
    };

    const onAlert = () => {
      Alert.alert('Tạo bài viết mới ?', 'Lựa chọn', [
        {text: 'Đồng ý', onPress: () => onCreate()},
        {text: 'Hủy'},
      ]);
    };
    const onCreate = () => {
      if (validateCreate() === true) {
        let dataPost = {
          title: title.value,
          name: name.value,
          // author: author.value,
          description: description.value,
          bookWanna: [bookWanna.value],
          images: imagesUpload,
          // images: [
          //   'https://picsum.photos/300/200',
          //   'https://picsum.photos/300/200',
          //   'https://picsum.photos/300/200',
          //   'https://picsum.photos/300/200',
          // ],
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
      } else {
        Toast.show(Notification(NOTIFI.error, validateCreate()));
      }
    };

    return (
      <ScrollView horizontal={false}>
        <View style={stylesPost.addpost}>
          <View style={stylesPost.content}>
            <View style={stylesPost.text}>
              <Text
                style={{fontSize: 12, marginBottom: 20, fontWeight: 'bold'}}>
                (Nội dung có dấu '*' : bắt buộc)
              </Text>

              <View style={stylesPost.vertical}>
                <Text>Tiêu đề *</Text>
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
                <Text style={stylesPost.err}>{title.error}</Text>
              </View>
              <View>
                <Text>Tên sách * </Text>
                <TextInput
                  style={stylesPost.txtInput}
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
                <Text style={stylesPost.err}>{name.error}</Text>
              </View>
              <View style={stylesPost.vertical}>
                <Text>Danh mục sách *</Text>
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
                      selectedValue={categori.value}
                      onValueChange={onChange}>
                      {category.categories.map((ct, i) => (
                        <Picker.Item label={ct.name} value={ct.id} />
                      ))}
                    </Picker>
                  </Item>
                </Form>
              </View>
              <View style={stylesPost.vertical}>
                <Text>Hình ảnh *</Text>
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
                          color: COLORS.primary,
                        }}></Icon>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </View>
              <Text style={stylesPost.err}>{errImg}</Text>

              {/* <View>
                <Text>Tác giả *</Text>
                <TextInput
                  style={stylesPost.txtInput}
                  placeholder="Nhập tên nhà xuất bản"
                  value={publisher.value}
                  onFocus={() => {
                    setAuthor({
                      ...author,
                      error: '',
                    });
                  }}
                  onChangeText={(value) => {
                    setAuthor({
                      ...author,
                      value: value,
                    });
                  }}
                />
              </View> */}
              <View>
                <Text>Nhà xuất bản * </Text>
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
                <Text style={stylesPost.err}>{publisher.error}</Text>
              </View>
              <View style={stylesPost.horizontal}>
                <Text>Số lần xuất bản *</Text>
                <TextInput
                  style={stylesPost.txtPrice}
                  placeholder="Số lần xuất bản"
                  value={numberOfReprint.value}
                  keyboardType="numeric"
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
              <Text style={stylesPost.err}>{numberOfReprint.error}</Text>
              <View style={stylesPost.horizontal}>
                <Text>Năm xuất bản *</Text>
                <TextInput
                  style={stylesPost.txtPrice}
                  placeholder="Năm xuất bản"
                  keyboardType="numeric"
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
              <Text style={stylesPost.err}>{year.error}</Text>
              <View style={stylesPost.horizontal}>
                <Text>Giá sách *</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    style={stylesPost.txtVND}
                    placeholder="Giá sách"
                    value={price.value}
                    keyboardType="numeric"
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
              <Text style={stylesPost.err}>{price.error}</Text>

              <View style={stylesPost.vertical}>
                <Text>Sách muốn đổi : </Text>
                <TextInput
                  style={stylesPost.txtInput}
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
                <Text style={stylesPost.textContent}>Mô tả *</Text>
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
                  placeholder={'Nhập mô tả sách'}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                  value={description.value}
                  placeholder="Nhập mô tả"
                />
                <Text style={stylesPost.err}>{description.error}</Text>
              </View>
              <TouchableOpacity
                style={{
                  // marginTop: 10,
                  // paddingTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={onAlert}>
                <Text
                  style={{
                    // marginTop: 10,
                    alignItems: 'center',
                    borderRadius: 6,
                    width: SIZES.acceptBtn,
                    padding: 10,
                    textAlign: 'center',
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                  }}>
                  Đăng bài
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
