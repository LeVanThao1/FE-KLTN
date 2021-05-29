import {useLazyQuery, useMutation} from '@apollo/client';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Icon, Text, View} from 'native-base';
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
import {COLORS} from '../../../constants/themes';
import { useScrollToTop } from '@react-navigation/native';
import SpeechToText from 'react-native-google-speech-to-text';
const CreateBook = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {category, shop},
    } = useContext(MobXProviderContext);
    const {setBookStore, bookStore} = shop;
    const ref = React.useRef(null);

    // useScrollToTop(React.useRef({
    //   scrollToTop: () => ref.current?.scrollTo(0, 0),
    // }));
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
          Toast.show(Notification(NOTIFI.success, 'Thêm sách mới thành công'));
          // setBookStore([data.createBook, ...bookStore]);
          setName({
            ...name,
            value: ''
          });
          setAuthor({
            ...author,
            value: ''
          });
          setNumPrint({
            ...numPrint,
            value: 0
          });
          setDescription({
            ...description,
            value: ''
          });
          setPublisher({
            ...publisher,
            value: ''
          });
          setAmount({
            ...amount,
            value: 0
          });
          setPrice({
            ...price,
            value: 0
          });
          ref.current.scrollTop(0);

        },
        onError: (err) => {
          console.log(err);
          Toast.show(Notification(NOTIFI.error, err.message));
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

    const validateCreate = () => {
      if (name.value < 3) {
        setName({
          ...name,
          error: 'Tên sách phải dài hơn 3 ký tự',
        });
        return name.error;
      }
      if (author.value < 3) {
        setAuthor({
          ...author,
          error: 'Tên tác giả phải dài hơn 3 ký tự',
        });
        return false;
      }
      if (description.value < 30) {
        setDescription({
          ...description,
          error: 'Mô tả phải dài hơn 30 ký tự',
        });
        return false;
      }
      if (!amount.value) {
        setAmount({
          ...amount,
          error: 'Vui lòng nhập số lượng sách',
        });
        return false;
      }
      if (!price.value) {
        setPrice({
          ...price,
          error: 'Vui lòng nhập giá sách',
        });
        return false;
      }
      return true;
    };

    // console.log('valuidate', validateCreate())
    const onPress = () => {
      if(validateCreate() === true) {      
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
      }
      else {
        Toast.show(Notification(NOTIFI.error, validateCreate()));
      }
    };

    const removeImages = (index) => {
      setImages(images.filter((ig, i) => index !== i));
      setImageUpload(imagesUpload.filter((ig, i) => index !== i));
    };

    // const [field, setField] = useState(false);
    const filterNumber = (data) => {
      console.log(typeof data);
      if (!isNaN(data.replace('.', ''))) return +data.replace('.', '');
      else {
        const tamp = data
          .replace(/[àáâãăạảấầẩẫậắằẳẵặ]/g, 'a')
          .replace(/[ÀÁÂÃĂẠẢẤẦẨẪẬẮẰẲẴẶ]/g, 'A')
          .replace(/[òóôõơọỏốồổỗộớờởỡợ]/g, 'o')
          .replace(/[ÒÓÔÕƠỌỎỐỒỔỖỘỚỜỞỠỢ]/g, 'O')
          .replace(/[èéêẹẻẽếềểễệ]/g, 'e')
          .replace(/[ÈÉÊẸẺẼẾỀỂỄỆ]/g, 'E')
          .replace(/[ùúũưụủứừửữự]/g, 'u')
          .replace(/[ÙÚŨƯỤỦỨỪỬỮỰ]/g, 'U')
          .replace(/[ìíĩỉị]/g, 'i')
          .replace(/[ÌÍĨỈỊ]/g, 'I')
          .replace(/[ýỳỵỷỹ]/g, 'y')
          .replace(/[ÝỲỴỶỸ]/g, 'Y')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
          .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
          .replace(/\u02C6|\u0306|\u031B/g, '')
          .replace(/\s+/g, ' ')
          .trim()
          .toLowerCase();

        switch (tamp) {
          case 'khong':
            return 0;
          case 'mot':
            return 1;
          case 'hai':
            return 2;
          case 'ba':
            return 3;
          case 'bon':
            return 4;
          case 'buon':
            return 4;
          case 'nam':
            return 5;
          case 'sau':
            return 6;
          case 'bay':
            return 7;
          case 'tam':
            return 8;
          case 'chin':
            return 9;
          case 'chinh':
            return 9;
          case 'muoi':
            return 10;
          default:
            Toast.show(Notification(NOTIFI.error, 'Vui lòng nhập số'));
        }
      }
      return '';
    };
    const speechToTextHandler = async (field) => {
      try {
        const speechToTextData = await SpeechToText.startSpeech(
          'Please saying something',
          'vi-VN',
        );
        if (field === 'name') setName({error: '', value: speechToTextData});
        if (field === 'author') setAuthor({error: '', value: speechToTextData});
        if (field === 'description')
          setDescription({error: '', value: speechToTextData});
        if (field === 'year') setYear({error: '', value: speechToTextData});
        if (field === 'publisher')
          setPublisher({error: '', value: speechToTextData});
        if (field === 'price')
          setPrice({error: '', value: filterNumber(speechToTextData)});
        if (field === 'amount')
          setAmount({error: '', value: filterNumber(speechToTextData)});
        if (field === 'numPrint')
          setNumPrint({error: '', value: filterNumber(speechToTextData)});
      } catch (error) {
        console.log('error: ', error);
      }
    };

    return (
      <ScrollView ref={ref}>
        <View style={styles.container_product}>
          <View style={styles.title}>
            {/* name */}
            <View style={styles.name}>
              <Text>Tên sách *</Text>
              <View>
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
                    speechToTextHandler('name');
                  }}>
                  <Icon
                    type="FontAwesome"
                    name="microphone"
                    style={{
                      fontSize: 25,
                    }}></Icon>
                </TouchableOpacity>
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
                          setAuthor({...author, value: bk.author});
                          setType(false);
                        }}>
                        <Image
                          source={{uri: bk.images[0]}}
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
                )}
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
            <View style={styles.name}>
              <Text>Tác giả *</Text>
              <View>
                <TextInput
                  style={styles.txtMaxWidth}
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
                    speechToTextHandler('author');
                  }}>
                  <Icon
                    type="FontAwesome"
                    name="microphone"
                    style={{
                      fontSize: 25,
                    }}></Icon>
                </TouchableOpacity>
              </View>
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
                          setAuthor({...author, value: bk.author});
                          setName({...name, value: bk.name});
                          setType(false);
                        }}>
                        <Image
                          source={{uri: bk.images[0]}}
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
                )}
            </View>
            {/* year */}
            <View style={styles.name}>
              <Text>Năm xuất bản</Text>
              <View>
                <TextInput
                  editable={book ? false : true}
                  style={styles.txtMaxWidth}
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
                <TouchableOpacity
                  disabled={book ? true : false}
                  style={{
                    position: 'absolute',
                    right: 0,
                    height: '100%',
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    speechToTextHandler('year');
                  }}>
                  <Icon
                    type="FontAwesome"
                    name="microphone"
                    style={{
                      fontSize: 25,
                      color: book ? '#dddddd' : '#000',
                    }}></Icon>
                </TouchableOpacity>
              </View>
            </View>
            {/* pulisher */}
            <View style={styles.name}>
              <Text>Nhà xuất bản</Text>
              <View>
                <TextInput
                  editable={book ? false : true}
                  style={styles.txtMaxWidth}
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
                <TouchableOpacity
                  disabled={book ? true : false}
                  style={{
                    position: 'absolute',
                    right: 0,
                    height: '100%',
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    speechToTextHandler('publisher');
                  }}>
                  <Icon
                    type="FontAwesome"
                    name="microphone"
                    style={{
                      fontSize: 25,
                      color: book ? '#ddd' : '#000',
                    }}></Icon>
                </TouchableOpacity>
              </View>
            </View>
            {/* number of printed lines */}
            <View style={styles.name}>
              <Text>Số lần xuất bản</Text>
              <View>
                <TextInput
                  editable={book ? false : true}
                  style={styles.txtMaxWidth}
                  placeholder="Nhập số lần xuất bản"
                  value={book ? book.numberOfReprint + '' : numPrint.value + ''}
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
                <TouchableOpacity
                  disabled={book ? true : false}
                  style={{
                    position: 'absolute',
                    right: 0,
                    height: '100%',
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    speechToTextHandler('numPrint');
                  }}>
                  <Icon
                    type="FontAwesome"
                    name="microphone"
                    style={{
                      fontSize: 25,
                      color: book ? '#ddd' : '#000',
                    }}></Icon>
                </TouchableOpacity>
              </View>
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
                            color: COLORS.primary,
                          }}></Icon>
                      </TouchableOpacity>
                    )
                  : null}
              </ScrollView>
            </View>
            <View style={styles.name}>
              <Text>Mô tả sản phẩm *</Text>
              <View>
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
                <TouchableOpacity
                  disabled={book ? true : false}
                  style={{
                    position: 'absolute',
                    right: -6,
                    height: '100%',
                    width: 30,
                    top: 10,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }}
                  onPress={() => {
                    speechToTextHandler('description');
                  }}>
                  <Icon
                    type="FontAwesome"
                    name="microphone"
                    style={{
                      fontSize: 25,
                      color: book ? '#ddd' : '#000',
                    }}></Icon>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.name}>
              <Text>Số lượng *</Text>
              <View
                style={{
                  position: 'relative',
                }}>
                <TextInput
                  style={styles.txtMaxWidth}
                  placeholder="Nhập số lượng"
                  value={amount.value + ''}
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
                <View
                  style={{
                    position: 'absolute',
                    right: 10,
                    height: '100%',
                    flexDirection: 'row',
                    // width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      marginRight: 7,
                    }}>
                    Quyển
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      speechToTextHandler('amount');
                    }}>
                    <Icon
                      type="FontAwesome"
                      name="microphone"
                      style={{
                        fontSize: 25,
                      }}></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/*  */}
            <View style={styles.name}>
              <Text>Giá sách *</Text>
              <View>
                <TextInput
                  style={styles.txtMaxWidth}
                  placeholder="Nhập giá sách"
                  value={price.value + ''}
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
                <View
                  style={{
                    position: 'absolute',
                    right: 10,
                    height: '100%',
                    // width: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      marginRight: 7,
                    }}>
                    VND
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      speechToTextHandler('price');
                    }}>
                    <Icon
                      type="FontAwesome"
                      name="microphone"
                      style={{
                        fontSize: 25,
                      }}></Icon>
                  </TouchableOpacity>
                </View>
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
                style={{backgroundColor: COLORS.primary}}
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
