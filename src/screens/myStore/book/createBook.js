import {useLazyQuery, useMutation} from '@apollo/client';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Icon, Input, Text, View} from 'native-base';
import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {ScrollView} from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import {Form, Item, Picker, Button} from 'native-base';
import {CREATE_BOOK, GET_RECOMMENT_BY_NAME} from '../../../query/book';
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {UPLOAD_MULTI_FILE} from '../../../query/upload';
import {ReactNativeFile} from 'extract-files';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {queryData} from '../../../common';
import Menu, {MenuItem} from 'react-native-material-menu';
import {styles} from './styles';
import Toast from 'react-native-toast-message';
import {Notification} from '../../../utils/notifications';
import {NOTIFI} from '../../../constants';
import Voice from '@react-native-community/voice';
import InputName from './inputName';
import InpurAuthor from './inputAuthor';
import InputAuthor from './inputAuthor';
const CreateBook = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {category, shop},
    } = useContext(MobXProviderContext);
    const {setBookStore, bookStore} = shop;
    const [product, setProduct] = useState({
      value: '',
      error: '',
    });
    const [name, setName] = useState({
      value: '',
      error: '',
    });

    const [author, setAuthor] = useState({
      value: '',
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
    const [book, setBook] = useState(undefined);
    const [booksRecomment, setBooksRecomment] = useState(undefined);
    const [numPrint, setNumPrint] = useState({
      value: 0,
      error: '',
    });
    const [description, setDescription] = useState({
      value: '',
      error: '',
    });

    const [price, setPrice] = useState({
      value: 0,
      error: '',
    });

    const [amount, setAmount] = useState({
      value: 0,
      error: '',
    });
    const [isModalVisible, setIsModalVisible] = useState(true);

    const [categori, setCategori] = useState({
      value: category.categories[0].id,
    });

    const refName = useRef(null);
    const [imagesUpload, setImageUpload] = useState([]);
    const [images, setImages] = useState([]);
    const onChange = (value) => {
      setCategori({
        value: value,
      });
    };

    const [visibleToast, setvisibleToast] = useState(false);

    useEffect(() => setvisibleToast(false), [visibleToast]);
    const [type, setType] = useState(false);
    const handleButtonPress = () => {
      setvisibleToast(true);
    };
    // const [photo, setPhoto] = useState(null);
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

    const [createBook, {called, loading, data, error}] = useMutation(
      CREATE_BOOK,
      {
        onCompleted: async (data) => {
          console.log(data);
          setBookStore([data.createBook, ...bookStore]);
          Toast.show(Notification(NOTIFI.success, 'Thêm sách mới thành công'));
          // navigation.navigate('BooksStore');
        },
        onError: (err) => {
          console.log(err);
          Toast.show(
            Notification(NOTIFI.error, 'Có lỗi xảy ra khi thêm sách mới'),
          );
        },
      },
    );
    const onChangeTextName = (value, type) => {
      if (refName.current) {
        clearTimeout(refName.current);
      }
      if (type === 'unsignedName') {
        setName({
          error: '',
          value: value,
        });
      } else {
        setAuthor({
          error: '',
          value: value,
        });
      }
      if (value.length === 0) {
        setBooksRecomment(undefined);
        return;
      }

      refName.current = setTimeout(() => {
        queryData(GET_RECOMMENT_BY_NAME, {name: value, type})
          .then(({data}) => {
            setBooksRecomment(data.getRecommentByName);
            setType(type);
          })
          .catch((err) => console.log(err));
      }, 300);
    };
    const onAlert = () => {
      Alert.alert('Đồng ý tạo sách ?', 'Lựa chọn', [
        {text: 'Đồng ý', onPress: () => onPress()},
        {text: 'Hủy'},
      ]);
    };
    const onPress = () => {
      let dataBook = {
        name: name.value,

        amount: amount.value,
        price: price.value,
      };
      if (book) {
        dataBook.book = book.id;
      } else {
        dataBook.description = description.value;
        dataBook.year = year.value;
        dataBook.numberOfReprint = numPrint.value;
        dataBook.publisher = publisher.value;
        dataBook.category = categori.value;
        dataBook.images = imagesUpload;
        dataBook.author = author.value;
      }
      createBook({
        variables: {
          dataBook,
        },
      });
    };

    const removeImages = (index) => {
      setImages(images.filter((ig, i) => index !== i));
      setImageUpload(imagesUpload.filter((ig, i) => index !== i));
    };
    const [field, setField] = useState(false);
    const filterNumber = (data) => {
      if (!isNaN(data[0].replace('.', ''))) return +data.replace('.', '');
      return data.filter((dt, i) => {
        const tamp = dt.replace('.', '');
        if (!isNaN(tamp)) return +tamp;
      })[0];
    };
    // function onSpeechStart(e) {}
    // function onSpeechResults(e) {
    //   console.log('onSpeechResults: ', e);
    //   if (field === 'name') {
    //     console.log(1);
    //     setName({...name, value: e.value[0]});
    //     queryData(GET_RECOMMENT_BY_NAME, {
    //       name: e.value[0],
    //       type: 'unsignedName',
    //     })
    //       .then(({data}) => {
    //         setBooksRecomment(data.getRecommentByName);
    //         setType('unsignedName');
    //       })
    //       .catch((err) => console.log(err));
    //   }
    //   if (field === 'author') {
    //     setAuthor({...author, value: e.value[0]});
    //     queryData(GET_RECOMMENT_BY_NAME, {name: e.value[0], type: 'author'})
    //       .then(({data}) => {
    //         setBooksRecomment(data.getRecommentByName);
    //         setType('unsignedName');
    //       })
    //       .catch((err) => console.log(err));
    //   }
    //   if (field === 'year') {
    //     setYear({...year, value: e.value[0].replace('.', '')});
    //   }
    //   if (field === 'publisher') {
    //     setPublisher({...publisher, value: e.value[0]});
    //   }
    //   if (field === 'numPrint') {
    //     setNumPrint({...numPrint, value: filterNumber(e.value)});
    //   }
    //   if (field === 'description') {
    //     setDescription({...description, value: e.value[0]});
    //   }
    //   if (field === 'price') {
    //     setPrice({...price, value: filterNumber(e.value)});
    //   }
    //   if (field === 'amount') {
    //     setAmount({...amount, value: filterNumber(e.value)});
    //   }
    // }
    // function onSpeechPartialResults(e) {}
    // function onSpeechVolumeChanged(e) {}
    // function onSpeechEnd(e) {
    //   console.log('end', e);
    //   // setField(false);
    // }
    // function onSpeechError(e) {
    //   console.log('error', e);
    //   setField(false);
    // }
    // useEffect(() => {
    //   Voice.onSpeechStart = onSpeechStart;
    //   Voice.onSpeechEnd = onSpeechEnd;
    //   Voice.onSpeechError = onSpeechError;
    //   Voice.onSpeechResults = onSpeechResults;
    //   Voice.onSpeechPartialResults = onSpeechPartialResults;
    //   Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    //   return () => {
    //     Voice.destroy().then(Voice.removeAllListeners);
    //   };
    // }, [field]);
    // const voice = async () => {
    //   await Voice.start('vi-VN');
    // };
    // const stop = async () => {
    //   setField(false);
    //   await Voice.stop();
    // };
    return (
      <ScrollView>
        <View style={styles.container_product}>
          {/*  */}
          <Text style={styles.header}>Thêm 1 sản phẩm mới</Text>
          <View style={styles.title}>
            {/* name */}
            <View style={styles.name}>
              <Text>Tên sản phẩm *</Text>
              <InputName />
              {/* <View>
                <TextInput
                  style={styles.txtMaxWidth}
                  placeholder="Nhập tên sản phẩm"
                  value={name.value}
                  onFocus={() => {
                    setIsModalVisible(true);
                    onChangeTextName(name.value, 'unsignedName');
                    setName({...name, error: ''});
                    setType('unsignedName');
                    setBook(undefined);
                  }}
                  onChangeText={(value) => {
                    onChangeTextName(value, 'unsignedName');
                  }}
                  onEndEditing={() => {}}
                />
                {field === 'name' ? (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 0,
                      height: '100%',
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setField(false);
                      stop();
                    }}>
                    <Icon
                      type="FontAwesome"
                      name="stop"
                      style={{
                        fontSize: 30,
                        color: 'red',
                      }}></Icon>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 0,
                      height: '100%',
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setField('name');
                      voice();
                    }}>
                    <Icon
                      type="FontAwesome"
                      name="microphone"
                      style={{
                        fontSize: 30,
                      }}></Icon>
                  </TouchableOpacity>
                )}
              </View>
              {type === 'unsignedName' &&
                isModalVisible &&
                booksRecomment &&
                booksRecomment.length > 0 && (
                  <ScrollView style={styles.listRecomment}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: 'grey',
                      }}>
                      <Text>Gợi ý</Text>
                      <TouchableOpacity
                        style={{paddingVertical: 3}}
                        onPress={() => {
                          setAuthor({...author, value: ''});
                          setIsModalVisible(false);
                        }}>
                        <Icon
                          type="AntDesign"
                          name="close"
                          style={{
                            fontSize: 22,
                            // color: 'red',
                          }}></Icon>
                      </TouchableOpacity>
                    </View>
                    {booksRecomment.map((bk) => (
                      <TouchableOpacity
                        style={styles.recomment}
                        onPress={() => {
                          setBook(bk);
                          setName({...name, value: bk.name});
                          setType(false);
                        }}>
                        <Image
                          source={require('../../../assets/images/dinosaurRevert.png')}
                          style={{
                            width: 70,
                            height: 70,
                            resizeMode: 'stretch',
                          }}></Image>
                        <View style={styles.content}>
                          <View style={styles.content_main}>
                            <Text style={styles.content_name} numberOfLines={1}>
                              {bk.name}
                            </Text>
                            <Text style={styles.content_author}>
                              Tác giả: {bk.author}
                            </Text>
                            <Text
                              style={styles.content_description}
                              numberOfLines={2}>
                              Mô tả: {bk.description}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )} */}
            </View>
            <View>
              <Text>Danh mục sách *</Text>
              <Form>
                <Item picker>
                  <Picker
                    style={styles.picker}
                    mode="dropdown"
                    enabled={book ? false : true}
                    // iosIcon={<Icon name="arrow-down" />}
                    style={{width: undefined}}
                    placeholder="Chọn danh mục"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={book ? book.category.id : categori}
                    onValueChange={onChange}>
                    {category.categories.map((ct, i) => (
                      <Picker.Item label={ct.name} value={ct.id} />
                    ))}
                    {/* <Picker.Item label="Wallet" value="key0" /> */}
                  </Picker>
                </Item>
              </Form>
            </View>

            {/* author */}
            <View style={styles.horizontal}>
              <Text>Tác giả *</Text>
              <InputAuthor />
              {/* <TextInput
                style={styles.txtInput}
                placeholder="Nhập tên tác giả"
                value={author.value}
                onFocus={() => {
                  setIsModalVisible(true);
                  onChangeTextName(author.value, 'author');
                  setAuthor({
                    ...author,
                    error: '',
                  });
                  setType('author');
                  setBook(undefined);
                }}
                onChangeText={(value) => {
                  onChangeTextName(value, 'author');
                }}
                onEndEditing={() => {
                  // setIsModalVisible(false);
                }}
              />
              {type === 'author' &&
                isModalVisible &&
                booksRecomment &&
                booksRecomment.length > 0 && (
                  <ScrollView style={styles.listRecomment}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: 'grey',
                      }}>
                      <Text>Gợi ý</Text>
                      <TouchableOpacity
                        style={{paddingVertical: 3}}
                        onPress={() => {
                          setName({...name, value: ''});
                          setIsModalVisible(false);
                        }}>
                        <Icon
                          type="AntDesign"
                          name="close"
                          style={{
                            fontSize: 22,
                            // color: 'red',
                          }}></Icon>
                      </TouchableOpacity>
                    </View>
                    {booksRecomment.map((bk) => (
                      <TouchableOpacity
                        style={styles.recomment}
                        onPress={() => {
                          console.log('click click');
                          setBook(bk);
                          setAuthor({...name, value: bk.author});
                          setName({...name, value: bk.name});
                          setType(false);
                        }}>
                        <Image
                          source={require('../../../assets/images/dinosaurRevert.png')}
                          style={{
                            width: 70,
                            height: 70,
                            resizeMode: 'stretch',
                          }}></Image>
                        <View style={styles.content}>
                          <View style={styles.content_main}>
                            <Text style={styles.content_name} numberOfLines={1}>
                              {bk.name}
                            </Text>
                            <Text style={styles.content_author}>
                              Tác giả: {bk.author}
                            </Text>
                            <Text
                              style={styles.content_description}
                              numberOfLines={2}>
                              Mô tả: {bk.description}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )} */}
            </View>
            {/* year */}
            <View style={styles.horizontal}>
              <Text>Năm phát hành *</Text>
              <TextInput
                editable={book ? false : true}
                style={styles.txtInput}
                placeholder="Nhập năm phát hành"
                value={book ? book.year : year.value}
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
              />
            </View>
            {/* pulisher */}
            <View style={styles.horizontal}>
              <Text>Nhà xuất bản *</Text>
              <TextInput
                editable={book ? false : true}
                style={styles.txtInput}
                placeholder="Nhập tên nhà xuất bản"
                value={book ? book.publisher : publisher.value}
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
            {/* number of printed lines */}
            <View style={styles.horizontal}>
              <Text>Số lần xuất bản *</Text>
              <TextInput
                editable={book ? false : true}
                style={styles.txtInput}
                placeholder="Nhập số lần xuất bản"
                value={book ? book.numberOfReprint + '' : numPrint.value}
                onFocus={() => {
                  setNumPrint({
                    ...numPrint,
                    error: '',
                  });
                }}
                onChangeText={(value) => {
                  setNumPrint({
                    ...numPrint,
                    value: Number(value),
                  });
                }}
              />
            </View>
            {/* Image */}
            <View style={styles.name}>
              <Text>Hình ảnh *</Text>
              <ScrollView
                style={{flexDirection: 'row', marginVertical: 10}}
                horizontal={true}>
                {book
                  ? book.images.map((r, i) => (
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
                      </View>
                    ))
                  : images.length > 0 &&
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
                {!book
                  ? images.length < 10 && (
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
                            color: 'rgba(68, 108, 179, 1)',
                          }}></Icon>
                      </TouchableOpacity>
                    )
                  : null}
              </ScrollView>
            </View>
            <View style={styles.name}>
              <Text>Mô tả sản phẩm *</Text>
              <Textarea
                editable={book ? false : true}
                containerStyle={styles.textareacont}
                style={styles.textarea}
                // onChangeText={this.onChange}
                // defaultValue={this.state.text}
                maxLength={200}
                placeholder={'Nhập mô tả sách'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                value={book ? book.description : description.value}
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
              />
            </View>

            <View style={styles.horizontal}>
              <Text>Số lượng *</Text>
              <View
                style={{
                  position: 'relative',
                  width: '50%',
                }}>
                <TextInput
                  style={styles.txtVND}
                  placeholder="Nhập số lượng"
                  value={amount.value}
                  onFocus={() => {
                    setAmount({
                      ...amount,
                      error: '',
                    });
                  }}
                  onChangeText={(value) => {
                    setAmount({
                      ...amount,
                      value: Number(value),
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
                  Quyển
                </Text>
              </View>
            </View>
            {/*  */}
            <View style={styles.horizontal}>
              <Text>Giá sách *</Text>
              <View
                style={{
                  position: 'relative',
                  width: '50%',
                }}>
                <TextInput
                  style={styles.txtVND}
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
            <View
              style={{
                marginTop: 10,
                paddingTop: 10,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Button
                style={{color: 'rgba(68, 108, 179, 1)', padding: 0}}
                onPress={onAlert}>
                <Text>Xác nhận</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  });
};

// const styles = StyleSheet.create({

// });

export default memo(CreateBook);
