import {ReactNativeFile} from 'extract-files';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Form, Icon, Item, Picker, Text, View} from 'native-base';
import React, {memo, useContext, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import Textarea from 'react-native-textarea';
import Toast from 'react-native-toast-message';
import {mutateData} from '../../../common';
import {COLORS, NOTIFI} from '../../../constants';
import {UPDATE_BOOK} from '../../../query/book';
import {UPLOAD_MULTI_FILE} from '../../../query/upload';
import {Notification} from '../../../utils/notifications';

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

    const onAlert = () => {
      Alert.alert('Đồng ý cập nhật ?', 'Lựa chọn', [
        {text: 'Đồng ý', onPress: () => onPress()},
        {text: 'Hủy'},
      ]);
    };

    const validateCreate = () => {
      if (bookCurrent.book) {
        if (!amount.value || amount.value === 0) {
          setAmount({
            ...amount,
            error: 'Vui lòng nhập số lượng sách',
          });
          return 'Vui lòng nhập số lượng sách';
        }
        if (!price.value || price.value === 0) {
          setPrice({
            ...price,
            error: 'Vui lòng nhập giá sách',
          });
          return 'Vui lòng nhập giá sách';
        }
      } else {
        if (name.value === '' || name.value.length < 3) {
          setName({
            ...name,
            error: 'Tên sách phải dài hơn 3 ký tự',
          });
          return 'Tên sách phải dài hơn 3 ký tự';
        }
        if (!author.value || author.value.length < 3) {
          setAuthor({
            ...author,
            error: 'Tên tác giả phải dài hơn 3 ký tự',
          });
          return 'Tên tác giả phải dài hơn 3 ký tự';
        }
        if (numPrint.value.length === 0) {
          setNumPrint({
            ...numPrint,
            error: 'Vui lòng nhập số lần xuất bản',
          });
          return 'Vui lòng nhập số lần xuất bản';
        }
        if (year.value.length === 0) {
          setYear({
            ...year,
            error: 'Vui lòng nhập năm xuất bản',
          });
          return 'Vui lòng nhập năm xuất bản';
        }
        if (publisher.value.length === 0) {
          setPublisher({
            ...publisher,
            error: 'Vui lòng nhập nhà xuất bản',
          });
          return 'Vui lòng nhập nhà xuất bản';
        }
        if (numPrint.value <= 0) {
          setNumPrint({
            ...numPrint,
            error: 'Vui lòng nhập đúng số lần xuất bản',
          });
          return 'Vui lòng nhập đúng số lần xuất bản';
        }
        if (imagesUpload.length === 0) {
          // setPublisher({
          //   ...publisher,
          //   error: 'Vui lòng nhập năm xuất bản',
          // });
          return 'Vui lòng thêm ảnh cho sách';
        }

        if (description.value.length === 0) {
          setDescription({
            ...description,
            error: 'Vui lòng nhập mô tả',
          });
          return 'Vui lòng nhập mô tả';
        }
        if (!amount.value || amount.value <= 0) {
          setAmount({
            ...amount,
            error: 'Vui lòng nhập đúng số lượng sách',
          });
          return 'Vui lòng nhập đúng số lượng sách';
        }
        if (!price.value || price.value <= 0) {
          setPrice({
            ...price,
            error: 'Vui lòng nhập đúng giá sách',
          });
          return 'Vui lòng nhập đúng giá sách';
        }
      }

      return true;
    };

    const onPress = () => {
      const validate = validateCreate();
      if (validateCreate() === true) {
        let dataBook;
        if (bookCurrent.book) {
          dataBook = {
            amount: Number(amount.value),
            price: Number(price.value),
          };
        } else {
          dataBook = {
            name: name.value,
            description: description.value,
            year: year.value,
            numberOfReprint: Number(numPrint.value),
            publisher: publisher.value,
            category: categori.value ? categori.value : bookCurrent.categoryId,
            images: imagesUpload,
            amount: Number(amount.value),
            price: Number(price.value),
            author: author.value,
          };
        }
        mutateData(UPDATE_BOOK, {
          dataBook,
          id: bookCurrent.id,
        })
          .then(({data}) => {
            const dataUpdate = {
              categoryId: bookCurrent.categoryId,
              categoryName: bookCurrent.categoryName,
              name: name.value,
              description: description.value,
              year: year.value,
              numberOfReprint: Number(numPrint.value),
              publisher: publisher.value,
              category: categori.value
                ? categori.value
                : bookCurrent.categoryId,
              images: imagesUpload,
              amount: Number(amount.value),
              price: Number(price.value),
              author: author.value,
              book: bookCurrent.book,
            };
            const findIndex = [...bookStore].findIndex(
              (dt) => dt.id + '' == bookCurrent.id + '',
            );
            shop.setBookStore([
              ...[...bookStore].slice(0, findIndex),
              {...bookStore[findIndex], ...dataUpdate},
              ...[...bookStore].slice(findIndex + 1),
            ]);
            setBookCurrent({
              ...bookStore[findIndex],
              ...dataUpdate,
            });
            Toast.show(Notification(NOTIFI.success, 'Cập nhật thành công'));
            navigation.goBack();
          })
          .catch((err) => {
            Toast.show(Notification(NOTIFI.error, 'Cập nhật không thành công'));
            console.log(err);
          });
      } else {
        Toast.show(Notification(NOTIFI.error, validate));
      }
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
              Toast.show(Notification(NOTIFI.error, 'Have error'));
              console.log('update book', err);
            });
        })
        .catch((err) => {
          console.log(err);
          Toast.show(Notification(NOTIFI.error, 'Have error'));
        });
    };

    return (
      <ScrollView>
        <View style={styles.container_product}>
          <Text style={styles.header}>Thông tin sách</Text>
          <View style={styles.title}>
            <ScrollView
              style={{flexDirection: 'row', marginVertical: 10}}
              horizontal={true}>
              {images.length > 0 &&
                images.map((r, i) => (
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
                    {!bookCurrent.book && (
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
                    )}
                  </View>
                ))}
              {bookCurrent.images.length < 10 && !bookCurrent.book && (
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
                <Text>Tên sách *</Text>
                <TextInput
                  editable={!bookCurrent.book}
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
              <Text style={styles.err}>{name.error}</Text>

              <View>
                <Text>Danh mục sách *</Text>
                <Form>
                  <Item picker>
                    <Picker
                      enabled={!bookCurrent.book}
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
                        <Picker.Item key={i} label={ct.name} value={ct.id} />
                      ))}
                    </Picker>
                  </Item>
                </Form>
              </View>

              {/* author */}
              <View style={styles.ct}>
                <Text>Tác giả *</Text>
                <TextInput
                  editable={!bookCurrent.book}
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
              <Text style={styles.err}>{author.error}</Text>

              {/* pulisher */}
              <View style={styles.ct}>
                <Text>Nhà xuất bản *</Text>
                <TextInput
                  editable={!bookCurrent.book}
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
              <Text style={styles.err}>{publisher.error}</Text>
              {/* number of printed lines */}
              <View style={styles.horizontal}>
                <Text>Số lần xuất bản *</Text>
                <TextInput
                  editable={!bookCurrent.book}
                  style={styles.txtPrice}
                  placeholder="Số lần xuất bản"
                  keyboardType="numeric"
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
              <Text style={styles.err}>{numPrint.error}</Text>
              <View style={styles.horizontal}>
                <Text>Năm xuất bản *</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    editable={!bookCurrent.book}
                    style={styles.txtVND}
                    placeholder="Năm xuất bản"
                    value={year.value}
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
                  />
                </View>
              </View>
              <Text style={styles.err}>{year.error}</Text>

              {/* Image */}
              <View style={styles.horizontal}>
                <Text>Số lượng *</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    style={styles.txtVND}
                    placeholder="Số lượng"
                    value={amount.value}
                    keyboardType="numeric"
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
              <Text style={styles.err}>{amount.error}</Text>

              <View style={styles.horizontal}>
                <Text>Giá sách *</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    style={styles.txtVND}
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
              <Text style={styles.err}>{price.error}</Text>

              <View style={styles.container}></View>
              <View style={styles.des}>
                <Text style={styles.textContent}>Mô tả *</Text>
                <Textarea
                  editable={!bookCurrent.book}
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
              <Text style={styles.err}>{description.error}</Text>

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
  err: {
    fontSize: 10,
    color: 'red',
    textAlign: 'left',
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
    // marginLeft: 10,
    marginBottom: 5,
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
