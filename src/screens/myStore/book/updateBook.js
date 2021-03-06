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
      Alert.alert('?????ng ?? c???p nh???t ?', 'L???a ch???n', [
        {text: '?????ng ??', onPress: () => onPress()},
        {text: 'H???y'},
      ]);
    };
    const onPress = () => {
      let dataBook = {
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
      // updateBook({
      //   variables: {
      //     dataBook,
      //     id: bookCurrent.id,
      //   },
      // });
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
            category: categori.value ? categori.value : bookCurrent.categoryId,
            images: imagesUpload,
            amount: Number(amount.value),
            price: Number(price.value),
            author: author.value,
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
          Toast.show(Notification(NOTIFI.success, 'C???p nh???t th??nh c??ng'));
          navigation.goBack();
        })
        .catch((err) => {
          Toast.show(Notification(NOTIFI.error, 'C???p nh???t kh??ng th??nh c??ng'));
          console.log(err);
        });
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
          <Text style={styles.header}>Th??ng tin s??ch</Text>
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
                <Text>T??n s??ch</Text>
                <TextInput
                  style={styles.txtInput}
                  placeholder="Nh???p t??n s???n ph???m"
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
                <Text>Danh m???c s??ch</Text>
                <Form>
                  <Item picker>
                    <Picker
                      style={styles.picker}
                      mode="dropdown"
                      // iosIcon={<Icon name="arrow-down" />}
                      style={{width: undefined}}
                      placeholder="Ch???n danh m???c"
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
                <Text>T??c gi???</Text>
                <TextInput
                  style={styles.txtInput}
                  placeholder="Nh???p t??n t??c gi???"
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
                <Text>Nh?? xu???t b???n</Text>
                <TextInput
                  style={styles.txtInput}
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
              {/* number of printed lines */}
              <View style={styles.horizontal}>
                <Text>S??? l???n xu???t b???n</Text>
                <TextInput
                  style={styles.txtPrice}
                  placeholder="Nh???p s??? l???n xu???t b???n"
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
                <Text>N??m ph??t h??nh</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    style={styles.txtVND}
                    placeholder="Nh???p n??m ph??t h??nh"
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
                <Text>S??? l?????ng</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    style={styles.txtVND}
                    placeholder="Nh???p s??? l?????ng s??ch"
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
                    Quy???n
                  </Text>
                </View>
              </View>
              <View style={styles.horizontal}>
                <Text>Gi?? s??ch</Text>
                <View
                  style={{
                    position: 'relative',
                    width: '50%',
                  }}>
                  <TextInput
                    style={styles.txtVND}
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
                      top: 8,
                      fontSize: 14,
                    }}>
                    VND
                  </Text>
                </View>
              </View>
              <View style={styles.container}></View>
              <View style={styles.des}>
                <Text style={styles.textContent}>M?? t???</Text>
                <Textarea
                  containerStyle={styles.textareacont}
                  style={styles.textarea}
                  maxLength={200}
                  placeholder={'Nh???p m?? t??? s??ch'}
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
                <Text style={styles.button}>C???p nh???t</Text>
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
