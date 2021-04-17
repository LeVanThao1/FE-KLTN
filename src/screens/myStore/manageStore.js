import {useLazyQuery} from '@apollo/client';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Text, View} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {TextInput, StyleSheet, Image, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import {Form, Item, Picker} from 'native-base';
import Images from '../../assets/images/images';
import {CREATE_BOOK} from '../../query/book';
// import RNPickerSelect from 'react-native-picker-select';

const CreateProduct = () => {
  return useObserver(() => {
    const {
      stores: {category},
    } = useContext(MobXProviderContext);
    // console.log('categoriiiiiiii', category.categories);
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
    const [publiser, setPublisher] = useState({
      value: '',
      error: '',
    });
    const [numPrint, setNumPrint] = useState({
      value: '',
      error: '',
    });
    const [description, setDescription] = useState({
      value: '',
      error: '',
    });

    const [price, setPrice] = useState({
      value: '',
      error: '',
    });

    // const [categori, setCategori] = useState(null);
    // useEffect(() => {
    //   setCategori({});
    // });
    // const [createBook, {called, loading, data, error}] = useLazyQuery(
    //   CREATE_BOOK,
    //   {
    //     onCompleted: async (data) => {
    //       setProduct({});
    //     },
    //   },
    // );

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
                onChangeText={(value) => {
                  setName({
                    ...name,
                    value: value,
                  });
                }}
              />
            </View>
            <View>
              <Text>Danh mục sách *</Text>
              <Form>
                <Item picker>
                  <Picker
                    style={styles.picker}
                    mode="dropdown"
                    // iosIcon={<Icon name="arrow-down" />}
                    style={{width: undefined}}
                    placeholder="Select your SIM"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    // selectedValue={this.state.selected2}
                    // onValueChange={this.onValueChange2.bind(this)}
                  >
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
                style={styles.input}
                placeholder="Nhập tên tác giả"
                value={author.value}
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
                style={styles.input}
                placeholder="Nhập năm phát hành"
                value={year.value}
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
                style={styles.input}
                placeholder="Nhập tên nhà xuất bản"
                value={publiser.value}
                onChangeText={(value) => {
                  setPublisher({
                    ...publiser,
                    value: value,
                  });
                }}
              />
            </View>
            {/* number of printed lines */}
            <View style={styles.name}>
              <Text>Số lần xuất bản *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập số lần xuất bản"
                value={numPrint.value}
                onChangeText={(value) => {
                  setNumPrint({
                    ...numPrint,
                    value: value,
                  });
                }}
              />
            </View>
            {/* Image */}
            <View style={styles.image}>
              <Image source={Images.onepiece2} />
            </View>
            {/* des */}
            <View style={styles.des}>
              <Text>Mô tả sản phẩm *</Text>
              <Textarea
                containerStyle={styles.textareacont}
                style={styles.textarea}
                // onChangeText={this.onChange}
                // defaultValue={this.state.text}
                maxLength={120}
                placeholder={'Nhập mô tả sách'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                value={description.value}
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
              <Text>Giá sách *</Text>
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
            <Button color="rgba(68, 108, 179, 1)" title="Xác nhận"></Button>
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

export default memo(CreateProduct);
