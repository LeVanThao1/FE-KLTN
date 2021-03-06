import {useMutation} from '@apollo/client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Button, Form, Icon, Item, Picker, Text, View} from 'native-base';
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
import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
import Images from '../../assets/images/images';
import {COLORS, NOTIFI} from '../../constants';
import {UPDATE_POST} from '../../query/post';
import {Notification} from '../../utils/notifications';
import {stylesPost} from './stylePost';
import {UPLOAD_MULTI_FILE} from '../../query/upload';
import {mutateData} from '../../common';
import {ReactNativeFile} from 'extract-files';

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
      Alert.alert('?????ng ?? c???p nh???t', 'L???a ch???n', [
        {text: '?????ng ??', onPress: () => onUpdate()},
        {text: 'H???y'},
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
          error: 'Ti??u ????? ph???i d??i h??n 3 k?? t???',
        });
        return 'Ti??u ????? ph???i d??i h??n 3 k?? t???';
      }
      if (description.value.length < 10) {
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

    const onUpdate = () => {
      if(validateCreate() === true) {
      let dataPost = {
        title: title.value,
        description: description.value,
        bookWanna: [bookWanna.value],
        images: imagesUpload,
        publisher: publisher.value,
        numberOfReprint: Number(numberOfReprint.value),
        // category: categori.value,
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
          console.log(findIndex);
          user.setPosts([
            ...[...posts].slice(0, findIndex),
            {...posts[findIndex], ...dataPost},
            ...[...posts].slice(findIndex + 1),
          ]);
          setPostCurrent({...posts[findIndex], ...dataPost});
          Toast.show(Notification(NOTIFI.success, 'C???p nh???t th??nh c??ng'));
          navigation.goBack();
        })
        .catch((err) => {
          Toast.show(Notification(NOTIFI.error, 'C???p nh???t kh??ng th??nh c??ng'));
          console.log(err);
        });
      }
      else {
        Toast.show(Notification(NOTIFI.error, validateCreate()));
      }
    };

    return (
      <ScrollView horizontal={false}>
        <View style={stylesPost.addpost}>
          <ScrollView showsVerticalScrollIndicator>
            <View style={stylesPost.textImg}>
              <Text>H??nh ???nh</Text>

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
                            color: 'red',
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
              <Text>Ti??u ????? </Text>
              <TextInput
                style={stylesPost.txtInput}
                placeholder="Nh???p ti??u ?????"
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
                  placeholder="Nh???p s??? l???n xu???t b???n"
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
                <Text>N??m ph??t h??nh</Text>
                <TextInput
                  style={stylesPost.txtPrice}
                  placeholder="Nh???p n??m ph??t h??nh"
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
                <Text>Gi?? s??ch</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    style={stylesPost.txtVND}
                    // style={stylesPost.input}
                    placeholder="Nh???p gi?? s??ch"
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
                <Text>S??ch mu???n ?????i: </Text>
                <TextInput
                  style={stylesPost.txtInput}
                  // style={{fontWeight: 'bold'}}
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
                  setDescription((cur) => ({...cur, value: value}));
                }}
                value={description.value}
                maxLength={200}
                placeholder={'Nh???p m?? t??? s??ch'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                placeholder="Nh???p m?? t???"
              />
              <View style={{ flexDirection: 'row',
                  justifyContent:'center',}}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  paddingVertical: 10,
                  borderRadius: 10,
                  width: 130,
                 
                }}
                onPress={onAlert}>
                <Text style={stylesPost.btn}>C???p nh???t</Text>
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
