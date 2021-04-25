import {useLazyQuery, useMutation} from '@apollo/client';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Text, View} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {ScrollView} from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import {Form, Item, Picker} from 'native-base';
import Images from '../../assets/images/images';
import {CREATE_BOOK, UPDATE_BOOK} from '../../query/book';
import * as ImagePicker from 'react-native-image-picker';
import {button} from '../style';

const BookDetail = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {category, shop},
    } = useContext(MobXProviderContext);
    const {bookStore} = shop;
    const {
      bookId,
      bookName,
      bookCategoryId,
      bookCategoryName,
      bookPublisher,
      bookYear,
      bookPrint,
      bookPrice,
      bookAmount,
      bookDescription,
      bookImg,
    } = route.params;

    const [name, setName] = useState({
      value: bookName,
      error: '',
    });

    const [author, setAuthor] = useState({
      value: 'Aliba',
      error: '',
    });
    const [year, setYear] = useState({
      value: bookYear ? bookYear : '',
      error: '',
    });
    const [publisher, setPublisher] = useState({
      value: bookPublisher ? bookPublisher : '',
      error: '',
    });
    const [numPrint, setNumPrint] = useState({
      value: bookPrint ? bookPrint.toString() : '0',
      error: '',
    });
    const [description, setDescription] = useState({
      value: bookDescription ? bookDescription : '',
      error: '',
    });

    const [price, setPrice] = useState({
      value: bookPrice ? bookPrice.toString() : '0',
      error: '',
    });

    const [amount, setAmount] = useState({
      value: bookAmount ? bookAmount.toString() : '0',
      error: '',
    });

    const [categori, setCategori] = useState({
      value: bookCategoryId,
    });
    const [images, setImages] = useState([]);
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
          console.log(err);
        },
      },
    );

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
          id: bookId,
        },
      });

      // navigation.goBack();
    };

    return (
      <ScrollView>
        <View style={styles.container_product}>
          {/*  */}
          <Text style={styles.header}>Thông tin sản phẩm</Text>
          <View style={styles.title}>
            {/* name */}
            <View style={styles.name}>
              <Text>Mã sản phẩm</Text>
              <Text>{bookId}</Text>
            </View>
            <View style={styles.name}>
              <Text>Tên sản phẩm</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên sản phẩm"
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
                    {/* <Picker.Item label="Wallet" value="key0" /> */}
                  </Picker>
                </Item>
              </Form>
            </View>

            {/* author */}
            <View style={styles.name}>
              <Text>Tác giả</Text>
              <TextInput
                style={styles.input}
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
            {/* year */}
            <View style={styles.name}>
              <Text>Năm phát hành</Text>
              <TextInput
                style={styles.input}
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
            {/* pulisher */}
            <View style={styles.name}>
              <Text>Nhà xuất bản</Text>
              <TextInput
                style={styles.input}
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
            <View style={styles.name}>
              <Text>Số lần xuất bản</Text>
              <TextInput
                style={styles.input}
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
            {/* Image */}
            <View style={styles.container}></View>

            {/* <Button title="Choose Photo" onPress={handleChoosePhoto} />
            <ImageView
              images={images.map((im) => ({uri: im}))}
              imageIndex={0}
              visible={false}
              // onRequestClose={() => setIsVisible(false)}
            /> */}
            <View style={styles.des}>
              <Text>Mô tả sản phẩm</Text>
              <Textarea
                containerStyle={styles.textareacont}
                style={styles.textarea}
                maxLength={120}
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
            <View style={styles.price}>
              <Text>Số lượng *</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  style={styles.input}
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
                <Text>Quyển</Text>
              </View>
            </View>
            <View style={styles.price}>
              <Text>Giá sách</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  style={styles.input}
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
                <Text>VND</Text>
              </View>
            </View>
            {/* status */}
            {/* <View style={styles.status}>
            <Text>Tình trạng sách (mới)</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput style={styles.input} placeholder="Nhập tình trạng" />
              <Text>%</Text>
            </View>
          </View> */}
            {/* <Button
              color="rgba(68, 108, 179, 1)"
              title="Xác nhận"
              onPress={onPress}></Button> */}
            <TouchableOpacity onPress={onPress}>
              <Text style={button.btn}>Cập nhật</Text>
            </TouchableOpacity>
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
  input: {
    height: 40,
    // borderWidth: 0.2,
    // borderRadius: 2,
  },
  name: {},
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
});

export default memo(BookDetail);
