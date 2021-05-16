import {useLazyQuery, useMutation} from '@apollo/client';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Text, Icon, View} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {ScrollView} from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import {Form, Item, Picker} from 'native-base';
import {CREATE_BOOK, UPDATE_BOOK} from '../../../query/book';
// import {button} from '../style';
import ImagePicker from 'react-native-image-crop-picker';

import Toast from 'react-native-toast-message';
import {Notification} from '../../../utils/notifications';
import {COLORS, NOTIFI} from '../../../constants';
import {UPLOAD_MULTI_FILE} from '../../../query/upload';
import {mutateData} from '../../../common';
import {ReactNativeFile} from 'extract-files';

const UpdateBook = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {category, user, shop},
    } = useContext(MobXProviderContext);
    const {bookCurrent, setBookCurrent} = user;
    const {bookStore} = shop;

    const [name, setName] = useState({
      value: bookCurrent.name,
      error: '',
    });

    const [author, setAuthor] = useState({
      value: bookCurrent.author,
      error: '',
    });
    const [year, setYear] = useState({
      value: bookCurrent.year ? bookCurrent.year : '',
      error: '',
    });
    const [publisher, setPublisher] = useState({
      value: bookCurrent.publisher ? bookCurrent.publisher : '',
      error: '',
    });
    const [numPrint, setNumPrint] = useState({
      value: bookCurrent.numberOfReprint
        ? bookCurrent.numberOfReprint.toString()
        : '0',
      error: '',
    });
    const [description, setDescription] = useState({
      value: bookCurrent.description ? bookCurrent.description : '',
      error: '',
    });

    const [price, setPrice] = useState({
      value: bookCurrent.price ? bookCurrent.price.toString() : '0',
      error: '',
    });

    const [amount, setAmount] = useState({
      value: bookCurrent.amount ? bookCurrent.amount.toString() : '0',
      error: '',
    });
    console.log('cateogori', bookCurrent);

    const [categori, setCategori] = useState({
      value: bookCurrent.categoryId,
    });
    const [images, setImages] = useState(
      bookCurrent.images ? bookCurrent.images : [],
    );
    const [imagesUpload, setImagesUpload] = useState(
      bookCurrent.images ? bookCurrent.images : [],
    );

    const onChange = (value) => {
      setCategori({
        value: value,
      });
    };
    const [updateBook, {called, loading, data, error}] = useMutation(
      UPDATE_BOOK,
      {
        onCompleted: async (data) => {
          console.log(bookStore.length);
          const newData = [...bookStore].filter(
            (bt) => bt.id + '' !== bookId + '',
          );
          const bookUpdate = {
            id: bookId,
            name: name.value,
            description: description.value,
            year: year.value,
            numberOfReprint: Number(numPrint.value),
            publisher: publisher.value,
            category: {
              id: bookCategoryId,
              name: bookCategoryName,
            },
            images: ['https://picsum.photos/200/300'],
            amount: Number(amount.value),
            price: Number(price.value),
          };
          shop.setBookStore([bookUpdate, ...newData]);
          navigation.goBack();
        },
        onError: (err) => {
          Toast.show(Notification(NOTIFI.error, err.message));
          console.log(err);
        },
      },
    );
    const onAlert = () => {
      Alert.alert('Đồng ý cập nhật ?', 'Lựa chọn', [
        {text: 'Đồng ý', onPress: () => onPress()},
        {text: 'Hủy'},
      ]);
    };
    const onPress = () => {
      let dataBook = {
        name: name.value,
        description: description.value,
        year: year.value,
        numberOfReprint: Number(numPrint.value),
        publisher: publisher.value,
        category: categori.value,
        // images: ['https://picsum.photos/200/300'],
        amount: Number(amount.value),
        price: Number(price.value),
      };
      updateBook({
        variables: {
          dataBook,
          id: bookCurrent.id,
        },
      });

      // navigation.goBack();
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
              // Toast.show(Notification(NOTIFI.error, err.message));
              console.log('update book', err);
            });
        })
        .catch((err) => console.log(err));
    };

    return (
      <ScrollView>
        <View style={styles.container_product}>
          <Text style={styles.header}>Thông tin sách</Text>
          <View style={styles.title}>
            <ScrollView
              style={{flexDirection: 'row', marginVertical: 10}}
              horizontal={true}>
              {bookCurrent.images.length > 0 &&
                bookCurrent.images.map((r, i) => (
                  <View key={i}>
                    <Image
                      style={{
                        width: 110,
                        height: 150,
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
                        backgroundColor: '#fff',
                        borderRadius: 50,
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
              {bookCurrent.images.length < 10 && (
                <TouchableOpacity
                  onPress={handleChoosePhoto}
                  style={{
                    // paddingHorizontal: 10,
                    // paddingVertical: 5,
                    // margin: 0,
                    marginTop: 20,
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
            <View style={styles.content}>
              <View style={styles.ct}>
                <Text>Tên sách</Text>
                <TextInput
                  style={styles.txtInput}
                  placeholder="Nhập tên sản phẩm"
                  autoFocus={true}
                  defaultValue={name.value}
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
              <View>
                <Text>Danh mục sách</Text>
                <Form>
                  <Item picker>
                    <Picker
                      style={styles.picker}
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

              {/* author */}
              <View style={styles.ct}>
                <Text>Tác giả</Text>
                <TextInput
                  style={styles.txtInput}
                  placeholder="Nhập tên tác giả"
                  value={author.value}
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
              </View>

              {/* pulisher */}
              <View style={styles.ct}>
                <Text>Nhà xuất bản</Text>
                <TextInput
                  style={styles.txtInput}
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
              {/* number of printed lines */}
              <View style={styles.horizontal}>
                <Text>Số lần xuất bản</Text>
                <TextInput
                  style={styles.txtPrice}
                  placeholder="Nhập số lần xuất bản"
                  value={numPrint.value}
                  onFocus={() => {
                    setNumPrint({
                      ...numPrint,
                      error: '',
                    });
                  }}
                  onChangeText={(value) => {
                    setNumPrint({
                      ...numPrint,
                      value: value,
                    });
                  }}
                />
              </View>
              <View style={styles.horizontal}>
                <Text>Năm phát hành</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    style={styles.txtVND}
                    placeholder="Nhập năm phát hành"
                    value={year.value}
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
              </View>
              {/* Image */}
              <View style={styles.horizontal}>
                <Text>Số lượng</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    style={styles.txtVND}
                    placeholder="Nhập số lượng sách"
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
                    Quyển
                  </Text>
                </View>
              </View>
              <View style={styles.horizontal}>
                <Text>Giá sách</Text>
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
              <View style={styles.container}></View>
              <View style={styles.des}>
                <Text style={styles.textContent}>Mô tả</Text>
                <Textarea
                  containerStyle={styles.textareacont}
                  style={styles.textarea}
                  maxLength={200}
                  placeholder={'Nhập mô tả sách'}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                  value={description.value}
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
              {/* price */}

              <TouchableOpacity
                style={{
                  width: '100%',
                }}
                onPress={onAlert}>
                <Text style={styles.button}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
            {/* des */}
          </View>
        </View>
      </ScrollView>
    );
  });
};

const styles = StyleSheet.create({
  container_product: {
    margin: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: rgba(68, 108, 179, 1),
  },
  title: {
    margin: 15,
  },
  input: {
    height: 40,
    // borderWidth: 0.2,
    // borderRadius: 2,
  },
  image: {
    marginVertical: 10,
  },
  picker: {
    padding: 0,
    width: '50%',
    borderWidth: 0.5,
    borderColor: '#111',
  },
  des: {
    marginTop: 10,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textareaContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    padding: 10,
    textAlignVertical: 'top', // hack android
    height: 130,
    fontSize: 14,
    borderWidth: 0.1,
    borderRadius: 3,
    color: '#333',
    backgroundColor: '#fff',
  },

  textContent: {
    marginLeft: 10,
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  txtInput: {
    borderWidth: 0.3,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 0.2,
    backgroundColor: '#fff',
  },

  txtPrice: {
    width: '40%',
    borderWidth: 0.3,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 0.2,
    backgroundColor: '#fff',
  },

  txtVND: {
    width: '80%',
    borderWidth: 0.3,
    height: 30,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 0.2,
    backgroundColor: '#fff',
  },

  ct: {
    paddingVertical: 6,
  },
  button: {
    paddingHorizontal: 10,
    padding: 10,
    marginHorizontal: 85,
    width: '50%',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
});

export default memo(UpdateBook);
