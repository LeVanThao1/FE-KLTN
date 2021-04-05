import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Textarea from 'react-native-textarea';
import {Icon, ListItem, Separator} from 'native-base';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Images from '../../assets/images/images';

const CreateStore = ({navigation}) => {
  const [text, setText] = useState('');
  return (
    <ScrollView>
      <View style={styles.images}>
        <ImageBackground source={Images.slider1} style={styles.image}>
          <Image source={Images.onepiece1} style={styles.avatar} />
        </ImageBackground>
      </View>
      <View style={styles.container_store}>
        <View style={styles.content}>
          <Text>Tên shop: </Text>
          <TextInput
            style={
              (styles.text,
              {
                color: '#333',
                borderBottomWidth: 0.5,
                borderBottomColor: '#111',
                padding: 0,
                marginLeft: 10,
                width: '100%',
              })
            }
          />
        </View>
        <View style={styles.des}>
          <Text>Mô tả shop: </Text>
          <Textarea
            containerStyle={styles.textareacont}
            style={styles.textarea}
            // onChangeText={this.onChange}
            // defaultValue={this.state.text}
            maxLength={120}
            placeholder={'Description'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
          />
        </View>
        <View style={styles.evalue}>
          <Text>Đánh giá shop: </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text>4.5/5 </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" type="MaterialIcons" />
              <Icon name="star" type="MaterialIcons" />
              <Icon name="star" type="MaterialIcons" />
              <Icon name="star-half" type="MaterialIcons" />
              <Icon name="star-border" type="MaterialIcons" />
            </View>
          </View>
        </View>
        {/* <View style={styles.product}></View> */}
        <View style={styles.product}>
          <View>
            <Collapse>
              <CollapseHeader>
                <Separator
                  bordered
                  style={{backgroundColor: 'rgba(68, 108, 179, 1)'}}>
                  <Text style={{color: '#fff'}}>+ Quản lý sản phẩm</Text>
                  {/* <Icon name="keyboard-arrow-down" type="MaterialIcons" /> */}
                </Separator>
              </CollapseHeader>
              <CollapseBody>
                <ListItem onPress={() => navigation.navigate('CreateProduct')}>
                  <Text>Thêm sản phẩm</Text>
                </ListItem>
                <ListItem onPress={() => navigation.navigate('ViewAllProduct')}>
                  <Text>Tất cả sản phẩm</Text>
                </ListItem>
              </CollapseBody>
            </Collapse>
          </View>
        </View>
        {/*  manage order */}
        <View style={styles.order}>
          <View>
            <Collapse>
              <CollapseHeader>
                <Separator
                  bordered
                  style={{
                    backgroundColor: 'rgba(68, 108, 179, 1)',
                  }}>
                  <Text style={{color: '#fff'}}>+ Quản lý đơn hàng</Text>
                </Separator>
              </CollapseHeader>
              <CollapseBody>
                <ListItem onPress={() => navigation.navigate('ManageOrder')}>
                  <Text>Tất cả sản phẩm</Text>
                </ListItem>
                {/* <ListItem>
                <Text onPress={() => navigation.navigate('ViewAllProduct')}>
                  Tất cả sản phẩm
                </Text>
              </ListItem> */}
              </CollapseBody>
            </Collapse>
          </View>
        </View>
        {/*  manage order */}
        {/* money */}
        <View style={styles.order}>
          <View>
            <Collapse>
              <CollapseHeader>
                <Separator
                  bordered
                  style={{backgroundColor: 'rgba(68, 108, 179, 1)'}}>
                  <Text style={{color: '#fff'}}>+ Tài chính</Text>
                </Separator>
              </CollapseHeader>
              <CollapseBody>
                <ListItem onPress={() => navigation.navigate('Revenue')}>
                  <Text>Doanh thu</Text>
                </ListItem>
                <ListItem onPress={() => navigation.navigate('Statistics')}>
                  <Text>Thống kê</Text>
                </ListItem>
                {/* <ListItem>
                <Text onPress={() => navigation.navigate('ViewAllProduct')}>
                  Tất cả sản phẩm
                </Text>
              </ListItem> */}
              </CollapseBody>
            </Collapse>
          </View>
        </View>
        {/* money */}
        {/* test */}
        {/* tét */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container_store: {
    flex: 0,
    margin: 10,
    padding: 10,
    // width: '90%',
  },
  image: {
    // flex: 1,
    width: '100%',
    height: 150,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 50,
    margin: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: '70%',
  },
  text: {
    marginLeft: 10,
    width: '100%',
    height: 20,
    borderBottomWidth: 0.1,
    borderColor: '#111',
    color: '#111',
  },
  des: {
    flexDirection: 'column',
    margin: 5,
    width: '100%',
  },
  textareacont: {
    justifyContent: 'center',
  },
  textareaContainer: {
    height: 150,
    width: '100%',

    // padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    // padding: -3?0,
    marginTop: -10,
    padding: 10,
    textAlignVertical: 'top', // hack android
    height: 130,
    fontSize: 14,
    borderWidth: 0.1,
    borderRadius: 3,
    color: '#333',
  },

  evalue: {
    marginVertical: 10,
    marginBottom: 20,
  },

  shipping_title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    margin: 10,
  },
});

export default CreateStore;
