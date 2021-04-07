import {Text, View} from 'native-base';
import React from 'react';
import {TextInput, StyleSheet, Image, Picker, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
// import {Container, Header, Content, Icon, Picker, Form} from 'native-base';
import Images from '../../assets/images/images';

const CreateProduct = () => {
  return (
    <ScrollView>
      <View style={styles.container_product}>
        {/*  */}
        <Text style={styles.header}>Thêm 1 sản phẩm mới</Text>
        <View style={styles.title}>
          {/* name */}
          <View style={styles.name}>
            <Text>Tên sản phẩm *</Text>
            <TextInput style={styles.input} placeholder="Nhập tên sản phẩm" />
          </View>
          <View>
            <Text>Danh mục sách *</Text>
            <Picker
              // selectedValue={selectedValue}
              style={styles.picker}
              // onValueChange={(itemValue, itemIndex) =>
              //   setSelectedValue(itemValue)
              // }>
            >
              <Picker.Item label="jav" value="java" />
            </Picker>
          </View>

          {/* author */}
          <View style={styles.name}>
            <Text>Tác giả *</Text>
            <TextInput style={styles.input} placeholder="Nhập tên tác giả" />
          </View>
          {/* year */}
          <View style={styles.name}>
            <Text>Năm phát hành *</Text>
            <TextInput style={styles.input} placeholder="Nhập năm phát hành" />
          </View>
          {/* pulisher */}
          <View style={styles.name}>
            <Text>Nhà xuất bản *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên nhà xuất bản"
            />
          </View>
          {/* number of printed lines */}
          <View style={styles.name}>
            <Text>Số lần xuất bản *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số lần xuất bản"
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
              <TextInput style={styles.input} placeholder="Nhập giá sách" />
              <Text>VND</Text>
            </View>
          </View>
          {/* status */}
          <View style={styles.status}>
            <Text>Tình trạng sách (mới)</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput style={styles.input} placeholder="Nhập tình trạng" />
              <Text>%</Text>
            </View>
          </View>
          <Button color="rgba(68, 108, 179, 1)" title="Xác nhận"></Button>
        </View>
        {/* des */}
      </View>
    </ScrollView>
  );
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

export default CreateProduct;
