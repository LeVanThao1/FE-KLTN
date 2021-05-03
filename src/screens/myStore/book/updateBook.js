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
  Alert,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {ScrollView} from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import {Form, Item, Picker} from 'native-base';
import Images from '../../assets/images/images';
import {CREATE_BOOK, UPDATE_BOOK} from '../../query/book';
import * as ImagePicker from 'react-native-image-picker';
import {button} from '../style';
import Toast from 'react-native-toast-message';
import {Notification} from '../../../utils/notifications';
import {NOTIFI} from '../../../constants';

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
      value: bookCurrent.category.id,
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
            <TouchableOpacity onPress={onAlert}>
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

export default memo(UpdateBook);
