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
const CreateBook = () => {
  return useObserver(() => {
    const {
      stores: {category},
    } = useContext(MobXProviderContext);
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
    const [isModalVisible, setIsModalVisible] = useState(false);

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
          // setBookStore()
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
    const onChangeTextName = (value) => {
      if (refName.current) {
        clearTimeout(refName.current);
      }
      setName({
        error: '',
        value: value,
      });
      if (value.length === 0) {
        setBooksRecomment(undefined);
        return;
      }

      refName.current = setTimeout(() => {
        queryData(GET_RECOMMENT_BY_NAME, {name: value})
          .then(({data}) => {
            setBooksRecomment(data.getRecommentByName);
            setType(true);
          })
          .catch((err) => console.log(err));
      }, 300);
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
      // <Toast visible={visibleToast} message="Exampsssle" />;
    };

    const removeImages = (index) => {
      setImages(images.filter((ig, i) => index !== i));
      setImageUpload(imagesUpload.filter((ig, i) => index !== i));
    };
    console.log(book);
    return (
      <ScrollView>
        <View style={styles.container_product}>
          {/*  */}
          <Text style={styles.header}>Thêm 1 sản phẩm mới</Text>
          <View style={styles.title}>
            {/* name */}
            <View style={styles.name}>
              <Text>Tên sản phẩm *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên sản phẩm"
                value={name.value}
                onFocus={() => {
                  // setName({
                  //   ...name,
                  //   error: '',
                  // });
                  // onChangeTextName(name.value);
                  setType(true);
                  setBook(undefined);
                }}
                onChangeText={(value) => {
                  onChangeTextName(value);
                }}
                onEndEditing={() => {}}
              />
              {type && booksRecomment && booksRecomment.length > 0 && (
                <ScrollView style={styles.listRecomment}>
                  {booksRecomment.map((bk) => (
                    <TouchableOpacity
                      style={styles.recomment}
                      onPress={() => {
                        console.log('click click');
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
              <TextInput
                editable={book ? false : true}
                style={styles.input}
                placeholder="Nhập tên tác giả"
                value={book ? book.author : author.value}
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
            {/* year */}
            <View style={styles.name}>
              <Text>Năm phát hành *</Text>
              <TextInput
                editable={book ? false : true}
                style={styles.input}
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
            <View style={styles.name}>
              <Text>Nhà xuất bản *</Text>
              <TextInput
                editable={book ? false : true}
                style={styles.input}
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
            <View style={styles.name}>
              <Text>Số lần xuất bản *</Text>
              <TextInput
                editable={book ? false : true}
                style={styles.input}
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
                {!book ||
                  (images.length < 10 && (
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
                  ))}
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
                maxLength={120}
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
            {/* price */}
            <View style={styles.price}>
              <Text>Số lượng *</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  style={styles.inputPrice}
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
                      value: Number(value),
                    });
                  }}
                />
                <Text>Quyển</Text>
              </View>
            </View>
            <View style={styles.price}>
              <Text>Giá sách *</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  style={styles.inputPrice}
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
            <View
              style={{
                marginTop: 10,
                justifyContent: 'flex-end',
                // width: '100%',
                flexDirection: 'row',
              }}>
              {/* <Button
                title="Xác nhận"
                color="rgba(68, 108, 179, 1)"
                onPress={onPress}
              /> */}
              <Button
                style={{color: 'rgba(68, 108, 179, 1)', padding: 0}}
                onPress={onPress}>
                <Text>Xác nhận</Text>
              </Button>
            </View>
          </View>
          {/* des */}
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
  name: {
    marginVertical: 8,
  },

  input: {
    height: 35,
    width: '100%',
    paddingLeft: 10,
    borderWidth: 0.2,
    borderRadius: 6,
    position: 'relative',
  },

  inputPrice: {
    width: '70%',
    height: 35,
    paddingLeft: 10,
    borderWidth: 0.2,
    borderRadius: 6,
    position: 'relative',
  },

  price: {
    width: '100%',
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
    // padding: -3?0,
    // marginTop: -10,
    padding: 10,
    textAlignVertical: 'top', // hack android
    height: 130,
    fontSize: 14,
    borderWidth: 0.1,
    borderRadius: 3,
    color: '#333',
  },

  listRecomment: {
    position: 'absolute',
    top: 60,
    width: Dimensions.get('screen').width - 40,
    bottom: 0,
    zIndex: 999,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  recomment: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    // borderTopColor: 'grey',
    // borderTopWidth: 1,
    paddingVertical: 10,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
  },
  content_main: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  content_name: {
    fontSize: 13,
    fontWeight: 'bold',
    width: Dimensions.get('screen').width - 130,
  },
  content_description: {
    fontSize: 13,
    width: Dimensions.get('screen').width - 130,
  },
  content_author: {
    fontSize: 13,
    width: Dimensions.get('screen').width - 130,
  },
});

export default memo(CreateBook);

// import {useLazyQuery, useMutation} from '@apollo/client';
// import {MobXProviderContext, useObserver} from 'mobx-react';
// import {Icon, Text, View} from 'native-base';
// import React, {memo, useContext, useEffect, useRef, useState} from 'react';
// import {
//   TextInput,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ToastAndroid,
//   Dimensions,
// } from 'react-native';
// import ImageView from 'react-native-image-viewing';
// import {ScrollView} from 'react-native-gesture-handler';
// import Textarea from 'react-native-textarea';
// import {Form, Item, Picker, Button} from 'native-base';
// import {CREATE_BOOK, GET_RECOMMENT_BY_NAME} from '../../../query/book';
// // import * as ImagePicker from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';
// import {UPLOAD_MULTI_FILE} from '../../../query/upload';
// import {ReactNativeFile} from 'extract-files';
// // import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// // import Modal from 'react-native-modal';
// import {queryData} from '../../../common';
// import Menu, {MenuItem} from 'react-native-material-menu';
// const CreateBook = () => {
//   return useObserver(() => {
//     const {
//       stores: {category},
//     } = useContext(MobXProviderContext);
//     const [product, setProduct] = useState({
//       value: '',
//       error: '',
//     });
//     const [name, setName] = useState({
//       value: '',
//       error: '',
//     });

//     const [author, setAuthor] = useState({
//       value: '',
//       error: '',
//     });
//     const [year, setYear] = useState({
//       value: '',
//       error: '',
//     });
//     const [publisher, setPublisher] = useState({
//       value: '',
//       error: '',
//     });
//     const [book, setBook] = useState(undefined);
//     const [booksRecomment, setBooksRecomment] = useState(undefined);
//     const [numPrint, setNumPrint] = useState({
//       value: 0,
//       error: '',
//     });
//     const [description, setDescription] = useState({
//       value: '',
//       error: '',
//     });

//     const [price, setPrice] = useState({
//       value: 0,
//       error: '',
//     });

//     const [amount, setAmount] = useState({
//       value: 0,
//       error: '',
//     });
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     const [categori, setCategori] = useState({
//       value: category.categories[0].id,
//     });

//     const refName = useRef(null);
//     const [imagesUpload, setImageUpload] = useState([]);
//     const [images, setImages] = useState([]);
//     const onChange = (value) => {
//       setCategori({
//         value: value,
//       });
//     };

//     const [visibleToast, setvisibleToast] = useState(false);

//     useEffect(() => setvisibleToast(false), [visibleToast]);
//     const [type, setType] = useState(false);
//     const handleButtonPress = () => {
//       setvisibleToast(true);
//     };
//     // const [photo, setPhoto] = useState(null);
//     const [upload] = useMutation(UPLOAD_MULTI_FILE, {
//       onCompleted: (data) => {
//         const tamp = data.uploadMultiFile.map((dt) => dt.url);
//         setImageUpload([...imagesUpload, ...tamp]);
//       },
//       onError: (err) => {
//         console.log('manage', err);
//       },
//     });

//     const handleChoosePhoto = () => {
//       ImagePicker.openPicker({
//         multiple: true,
//         maxFiles: 10,
//         mediaType: 'photo',
//       })
//         .then((res) => {
//           if (res.length > 10 || res.length + images.length > 10) {
//             console.log(
//               'Vượt quá giới hạn cho phép. Giới hạn cho phép 10 hình ảnh',
//             );
//             return;
//           }
//           const tamp = res.map((r) => r.path);
//           setImages([...images, ...tamp]);
//           const files = res.map(
//             (r) =>
//               new ReactNativeFile({
//                 uri: r.path,
//                 name: 'product',
//                 type: r.mime,
//               }),
//           );
//           upload({
//             variables: {
//               files,
//             },
//           });
//         })
//         .catch((err) => console.log(err));
//     };

//     const [createBook, {called, loading, data, error}] = useMutation(
//       CREATE_BOOK,
//       {
//         onCompleted: async (data) => {
//           // setBookStore()
//         },
//         onError: (err) => {
//           console.log(err);
//         },
//       },
//     );
//     const onChangeTextName = (value) => {
//       if (refName.current) {
//         clearTimeout(refName.current);
//       }
//       setName({
//         error: '',
//         value: value,
//       });
//       if (value.length === 0) {
//         setBooksRecomment(undefined);
//         return;
//       }

//       refName.current = setTimeout(() => {
//         queryData(GET_RECOMMENT_BY_NAME, {name: value})
//           .then(({data}) => {
//             setBooksRecomment(data.getRecommentByName);
//             setType(true);
//           })
//           .catch((err) => console.log(err));
//       }, 300);
//     };
//     const onPress = () => {
//       let dataBook = {
//         name: name.value,

//         amount: amount.value,
//         price: price.value,
//       };
//       if (book) {
//         dataBook.book = book.id;
//       } else {
//         dataBook.description = description.value;
//         dataBook.year = year.value;
//         dataBook.numberOfReprint = numPrint.value;
//         dataBook.publisher = publisher.value;
//         dataBook.category = categori.value;
//         dataBook.images = imagesUpload;
//         dataBook.author = author.value;
//       }
//       createBook({
//         variables: {
//           dataBook,
//         },
//       });
//       // <Toast visible={visibleToast} message="Exampsssle" />;
//     };

//     const removeImages = (index) => {
//       setImages(images.filter((ig, i) => index !== i));
//       setImageUpload(imagesUpload.filter((ig, i) => index !== i));
//     };
//     console.log(book);
//     return (
//       <ScrollView>
//         <View style={styles.container_product}>
//           {/*  */}
//           <Text style={styles.header}>Thêm 1 sản phẩm mới</Text>
//           <View style={styles.title}>
//             {/* name */}
//             <View style={styles.name}>
//               <Text>Tên sản phẩm *</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Nhập tên sản phẩm"
//                 value={name.value}
//                 onFocus={() => {
//                   // setName({
//                   //   ...name,
//                   //   error: '',
//                   // });
//                   // onChangeTextName(name.value);
//                   setType(true);
//                   setBook(undefined);
//                 }}
//                 onChangeText={(value) => {
//                   onChangeTextName(value);
//                 }}
//                 onEndEditing={() => {}}
//               />
//               {type && booksRecomment && booksRecomment.length > 0 && (
//                 <ScrollView style={styles.listRecomment}>
//                   {booksRecomment.map((bk) => (
//                     <TouchableOpacity
//                       style={styles.recomment}
//                       onPress={() => {
//                         console.log('click click');
//                         setBook(bk);
//                         setName({...name, value: bk.name});
//                         setType(false);
//                       }}>
//                       <Image
//                         source={require('../../../assets/images/dinosaurRevert.png')}
//                         style={{
//                           width: 70,
//                           height: 70,
//                           resizeMode: 'stretch',
//                         }}></Image>
//                       <View style={styles.content}>
//                         <View style={styles.content_main}>
//                           <Text style={styles.content_name} numberOfLines={1}>
//                             {bk.name}
//                           </Text>
//                           <Text style={styles.content_author}>
//                             Tác giả: {bk.author}
//                           </Text>
//                           <Text
//                             style={styles.content_description}
//                             numberOfLines={2}>
//                             Mô tả: {bk.description}
//                           </Text>
//                         </View>
//                       </View>
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
//               )}
//             </View>
//             <View style={styles.name}>
//               <Text>Danh mục sách *</Text>
//               <Form>
//                 <Item picker>
//                   <Picker
//                     style={styles.picker}
//                     mode="dropdown"
//                     enabled={book ? false : true}
//                     // iosIcon={<Icon name="arrow-down" />}
//                     style={{width: undefined}}
//                     selectedValue={book ? book.category.id : categori}
//                     onValueChange={onChange}>
//                     {category.categories.map((ct, i) => (
//                       <Picker.Item label={ct.name} value={ct.id} />
//                     ))}
//                     {/* <Picker.Item label="Wallet" value="key0" /> */}
//                   </Picker>
//                 </Item>
//               </Form>
//             </View>

//             {/* author */}
//             <View style={styles.name}>
//               <Text>Tác giả *</Text>
//               <TextInput
//                 editable={book ? false : true}
//                 style={styles.input}
//                 placeholder="Nhập tên tác giả"
//                 value={book ? book.author : author.value}
//                 onFocus={() => {
//                   setAuthor({
//                     ...author,
//                     error: '',
//                   });
//                 }}
//                 onChangeText={(value) => {
//                   setAuthor({
//                     ...author,
//                     value: value,
//                   });
//                 }}
//               />
//             </View>
//             {/* year */}
//             <View style={styles.name}>
//               <Text>Năm phát hành *</Text>
//               <TextInput
//                 editable={book ? false : true}
//                 style={styles.input}
//                 placeholder="Nhập năm phát hành"
//                 value={book ? book.year : year.value}
//                 onFocus={() => {
//                   setYear({
//                     ...year,
//                     error: '',
//                   });
//                 }}
//                 onChangeText={(value) => {
//                   setYear({
//                     ...year,
//                     value: value,
//                   });
//                 }}
//               />
//             </View>
//             {/* pulisher */}
//             <View style={styles.name}>
//               <Text>Nhà xuất bản *</Text>
//               <TextInput
//                 editable={book ? false : true}
//                 style={styles.input}
//                 placeholder="Nhập tên nhà xuất bản"
//                 value={book ? book.publisher : publisher.value}
//                 onFocus={() => {
//                   setPublisher({
//                     ...publisher,
//                     error: '',
//                   });
//                 }}
//                 onChangeText={(value) => {
//                   setPublisher({
//                     ...publisher,
//                     value: value,
//                   });
//                 }}
//               />
//             </View>
//             {/* number of printed lines */}
//             <View style={styles.name}>
//               <Text>Số lần xuất bản *</Text>
//               <TextInput
//                 editable={book ? false : true}
//                 style={styles.input}
//                 placeholder="Nhập số lần xuất bản"
//                 value={book ? book.numberOfReprint + '' : numPrint.value}
//                 onFocus={() => {
//                   setNumPrint({
//                     ...numPrint,
//                     error: '',
//                   });
//                 }}
//                 onChangeText={(value) => {
//                   setNumPrint({
//                     ...numPrint,
//                     value: Number(value),
//                   });
//                 }}
//               />
//             </View>
//             {/* Image */}
//             <View style={styles.name}>
//               <Text>Hình ảnh *</Text>
//               <ScrollView
//                 style={{flexDirection: 'row', marginVertical: 10}}
//                 horizontal={true}>
//                 {book
//                   ? book.images.map((r, i) => (
//                       <View key={i}>
//                         <Image
//                           style={{
//                             fontSize: 22,
//                             color: 'red',
//                           }}></Icon>
//                       </TouchableOpacity>
//                     </View>
//                   ))}

//               {!book ||
//                 (images.length < 10 && (
//                   <TouchableOpacity
//                     onPress={handleChoosePhoto}
//                     style={{
//                       // paddingHorizontal: 10,
//                       // paddingVertical: 5,
//                       margin: 0,
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       width: 100,
//                       height: 100,
//                       backgroundColor: '#fff',
//                       shadowColor: '#000',
//                       shadowOffset: {
//                         width: 0,
//                         height: 1,
//                       },
//                       shadowOpacity: 0.18,
//                       shadowRadius: 1.0,

//                       elevation: 1,
//                     }}>
//                     <Icon
//                       type="FontAwesome5"
//                       name="plus"
//                       style={{
//                         // paddingHorizontal: 10,
//                         // paddingVertical: 5,
//                         margin: 0,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         width: 100,
//                         height: 100,
//                         backgroundColor: '#fff',
//                         shadowColor: '#000',
//                         shadowOffset: {
//                           width: 0,
//                           height: 1,
//                         },
//                         shadowOpacity: 0.18,
//                         shadowRadius: 1.0,

//                         elevation: 1,
//                       }}>
//                       <Icon
//                         type="FontAwesome5"
//                         name="plus"
//                         style={{
//                           fontSize: 50,
//                           color: 'rgba(68, 108, 179, 1)',
//                         }}></Icon>
//                     </TouchableOpacity>
//                   ))}
//               </ScrollView>
//             </View>
//             <View style={styles.name}>
//               <Text>Mô tả sản phẩm *</Text>
//               <Textarea
//                 editable={book ? false : true}
//                 containerStyle={styles.textareacont}
//                 style={styles.textarea}
//                 // onChangeText={this.onChange}
//                 // defaultValue={this.state.text}
//                 maxLength={120}
//                 placeholder={'Nhập mô tả sách'}
//                 placeholderTextColor={'#c7c7c7'}
//                 underlineColorAndroid={'transparent'}
//                 value={book ? book.description : description.value}
//                 onFocus={() => {
//                   setDescription({
//                     ...description,
//                     error: '',
//                   });
//                 }}
//                 onChangeText={(value) => {
//                   setDescription({
//                     ...description,
//                     value: value,
//                   });
//                 }}
//               />
//             </View>
//             {/* price */}
//             <View style={styles.price}>
//               <Text>Số lượng *</Text>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}>
//                 <TextInput
//                   style={styles.inputPrice}
//                   placeholder="Nhập số lượng sách"
//                   value={amount.value}
//                   onFocus={() => {
//                     setAmount({
//                       ...amount,
//                       error: '',
//                     });
//                   }}
//                   onChangeText={(value) => {
//                     setAmount({
//                       ...amount,
//                       value: Number(value),
//                     });
//                   }}
//                 />
//                 <Text>Quyển</Text>
//               </View>
//             </View>
//             <View style={styles.price}>
//               <Text>Giá sách *</Text>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}>
//                 <TextInput
//                   style={styles.inputPrice}
//                   placeholder="Nhập giá sách"
//                   value={price.value}
//                   onFocus={() => {
//                     setPrice({
//                       ...price,
//                       error: '',
//                     });
//                   }}
//                   onChangeText={(value) => {
//                     setPrice({
//                       ...price,
//                       value: Number(value),
//                     });
//                   }}
//                 />
//                 <Text>VND</Text>
//               </View>
//             </View>
//             <View
//               style={{
//                 marginTop: 20,
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 borderRadius: 4,
//               }}>
//               {/* <Button
//                 title="Xác nhận"
//                 color="rgba(68, 108, 179, 1)"
//                 onPress={onPress}
//               /> */}
//               <Button
//                 style={{color: 'rgba(68, 108, 179, 1)'}}
//                 onPress={onPress}>
//                 <Text>Xác nhận</Text>
//               </Button>
//             </View>
//           </View>
//           {/* des */}
//         </View>
//       </ScrollView>
//     );
//   });
// };

// const styles = StyleSheet.create({
//   container_product: {
//     margin: 5,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     // color: rgba(68, 108, 179, 1),
//   },
//   title: {
//     margin: 15,
//   },

//   name: {
//     marginVertical: 8,
//   },

//   input: {
//     height: 35,
//     width: '100%',
//     paddingLeft: 10,
//     borderWidth: 0.2,
//     borderRadius: 6,
//     position: 'relative',
//   },

//   inputPrice: {
//     width: '70%',
//     height: 35,
//     paddingLeft: 10,
//     borderWidth: 0.2,
//     borderRadius: 6,
//     position: 'relative',
//   },

//   price: {
//     width: '100%',
//   },
//   image: {
//     marginVertical: 10,
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: '#111',
//   },
//   des: {
//     marginTop: 10,
//   },
//   status: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   textareaContainer: {
//     height: 10,
//     width: '100%',
//     backgroundColor: '#F5FCFF',
//   },
//   textarea: {
//     // padding: -3?0,
//     // marginTop: -10,
//     padding: 10,
//     textAlignVertical: 'top', // hack android
//     height: 130,
//     fontSize: 14,
//     borderWidth: 0.1,
//     borderRadius: 3,
//     color: '#333',
//   },

//   listRecomment: {
//     position: 'absolute',
//     top: 60,
//     width: Dimensions.get('screen').width - 40,
//     bottom: 0,
//     zIndex: 999,
//     height: 250,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   recomment: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row',
//     borderBottomColor: 'grey',
//     borderBottomWidth: 1,
//     // borderTopColor: 'grey',
//     // borderTopWidth: 1,
//     paddingVertical: 10,
//   },
//   content: {
//     width: '100%',
//     flexDirection: 'row',
//   },
//   content_main: {
//     width: '100%',
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//   },
//   content_name: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     width: Dimensions.get('screen').width - 130,
//   },
//   content_description: {
//     fontSize: 13,
//     width: Dimensions.get('screen').width - 130,
//   },
//   content_author: {
//     fontSize: 13,
//     width: Dimensions.get('screen').width - 130,
//   },
// });

// export default memo(CreateBook);
