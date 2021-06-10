import {ReactNativeFile} from 'extract-files';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Icon, Text, View, Form, Item, Picker} from 'native-base';
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
import {mutateData} from '../../common';
import {COLORS, NOTIFI} from '../../constants';
import {UPDATE_POST} from '../../query/post';
import {UPLOAD_MULTI_FILE} from '../../query/upload';
import {Notification} from '../../utils/notifications';
import {stylesPost} from './stylePost';

const UpdatePost = ({route, navigation}) => {
  return useObserver(() => {
    const {
      stores: {user, category},
    } = useContext(MobXProviderContext);
    const {posts, postCurrent, setPostCurrent} = user;
    const {postId} = route.params;
    const [title, setTitle] = useState({
      value: postCurrent.title ? postCurrent.title : '',
      error: '',
    });
    const [name, setName] = useState({
      value: postCurrent.name ? postCurrent.name : '',
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
      value: postCurrent?.category ? postCurrent.category?.id : '',
      error: '',
    });
    const [numberOfReprint, setNumberOfReprint] = useState({
      value: postCurrent.numberOfReprint
        ? postCurrent.numberOfReprint.toString()
        : '0',
      error: '',
    });
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState(
      postCurrent.images ? postCurrent.images : [],
    );
    const [imagesUpload, setImagesUpload] = useState(
      postCurrent.images ? postCurrent.images : [],
    );

    const onChange = (value) => {
      setCategori({
        value: value,
      });
    };

    const onAlert = () => {
      Alert.alert('Đồng ý cập nhật', 'Lựa chọn', [
        {text: 'Đồng ý', onPress: () => onUpdate()},
        {text: 'Hủy'},
      ]);
    };
    const removeImages = (index) => {
      setImages(images.filter((ig, i) => index !== i));
      setImagesUpload(imagesUpload.filter((ig, i) => index !== i));
    };
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
          mutateData(UPLOAD_MULTI_FILE, {
            files,
          })
            .then(({data}) => {
              const tamp = data.uploadMultiFile.map((dt) => dt.url);
              setImagesUpload((cur) => [...cur, ...tamp]);
            })
            .catch((err) => {
              console.log('update book', err);
            });
        })
        .catch((err) => console.log(err));
    };

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
      if (publisher.value.length < 3) {
        setPublisher({
          ...publisher,
          error: 'Nhà xuất bản phải dài hơn 3 ký tự',
        });
        return 'Nhà xuất bản phải dài hơn 3 ký tự';
      }
      if (year.value.length !== 4) {
        setYear({
          ...year,
          error: 'Nhập năm xuất bản',
        });
        return 'Vui lòng nhập đúng năm xuất bản';
      }

      if (description.value.length < 10) {
        setDescription({
          ...description,
          error: 'Mô tả phải dài hơn 10 ký tự',
        });
        return 'Mô tả phải dài hơn 10 ký tự';
      }
      if (price.value === 0) {
        setPrice({
          ...price,
          error: 'Vui lòng nhập giá sách',
        });
        return 'Vui lòng nhập giá sách';
      }
      return true;
    };

    const onUpdate = () => {
      if (validateCreate() === true) {
        let dataPost = {
          title: title.value,
          description: description.value,
          bookWanna: [bookWanna.value],
          name: name.value,
          images: imagesUpload,
          publisher: publisher.value,
          numberOfReprint: Number(numberOfReprint.value),
          category: categori.value,
          year: year.value,
          price: Number(price.value),
        };
        mutateData(UPDATE_POST, {
          dataPost,
          id: postId,
        })
          .then(({data}) => {
            const findIndex = [...posts].findIndex(
              (dt) => dt.id + '' == postId + '',
            );
            user.setPosts([
              ...[...posts].slice(0, findIndex),
              {...posts[findIndex], ...dataPost},
              ...[...posts].slice(findIndex + 1),
            ]);
            setPostCurrent({
              ...posts[findIndex],
              ...dataPost,
              category: category.categories.find(
                (p) => p.id + '' === categori.value + '',
              ),
            });
            Toast.show(Notification(NOTIFI.success, 'Cập nhật thành công'));
            navigation.goBack();
          })
          .catch((err) => {
            Toast.show(Notification(NOTIFI.error, 'Cập nhật không thành công'));
            console.log(err);
          });
      } else {
        Toast.show(Notification(NOTIFI.error, validateCreate()));
      }
    };

    return (
      <ScrollView horizontal={false}>
        <View style={stylesPost.addpost}>
          <ScrollView showsVerticalScrollIndicator>
            <View style={stylesPost.textImg}>
              <Text>Hình ảnh</Text>

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

              {/* <View style={stylesPost.imgBookDetail}>
                {postCurrent.images?.map((img, i) => (
                  <Image
                    key={i}
                    source={{uri: img}}
                    style={stylesPost.imgBook}
                  />
                ))}
              </View> */}
            </View>
            {/*  */}

            {/*  */}
          </ScrollView>
          <View style={stylesPost.content}>
            <View style={stylesPost.ct}>
              <Text>Tiêu đề </Text>
              <TextInput
                style={stylesPost.txtInput}
                placeholder="Nhập tiêu đề"
                autoFocus={true}
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
                <Text>Tên sách </Text>
                <TextInput
                  style={stylesPost.txtInput}
                  placeholder="Nhập tên sách"
                  autoFocus={true}
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
                      selectedValue={categori.value}
                      onValueChange={onChange}>
                      {category.categories.map((ct, i) => (
                        <Picker.Item label={ct.name} value={ct.id} />
                      ))}
                    </Picker>
                  </Item>
                </Form>
              </View>
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
                <Text>Năm phát hành</Text>
                <TextInput
                  style={stylesPost.txtPrice}
                  placeholder="Nhập năm phát hành"
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
                      top: 13,
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
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.primary,
                    paddingVertical: 10,
                    borderRadius: 10,
                    width: 130,
                  }}
                  onPress={onAlert}>
                  <Text style={stylesPost.btn}>Cập nhật</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  });
};

export default memo(UpdatePost);
