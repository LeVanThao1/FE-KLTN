import {useNavigation} from '@react-navigation/native';
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {ListItem, Separator} from 'native-base';
import React, {memo, useContext, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../../assets/images/images';
import {COLORS} from '../../constants/themes';

const Store = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {shop, user},
    } = useContext(MobXProviderContext);
    const {info, setInfo} = shop;
    const navigation = useNavigation();
    const [listInfo, setListInfo] = useState(undefined);
    const [text, setText] = useState('');

    if (shop.info === null)
      return (
        <View style={styles.createStore}>
          <Text style={styles.titleCreate}>Bạn chưa có cửa hàng</Text>
          <TouchableOpacity
            style={styles.btnCreate}
            onPress={() => navigation.navigate('CreateStore')}>
            <Text style={styles.txtCreate}>Tạo cửa hàng</Text>
          </TouchableOpacity>
        </View>
      );

    return (
      <ScrollView>
        <View style={styles.images}>
          <ImageBackground source={Images.slider1} style={styles.image}>
            <Image source={{uri: info.avatar}} style={styles.avatar} />
          </ImageBackground>
        </View>
        <View style={styles.container_store}>
          <View style={styles.infoStore}>
            <View style={styles.content}>
              <Text>Tên shop </Text>
              <Text
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
                }>
                {/* {info?.name} */}
                {info?.name}
              </Text>
            </View>
            <View style={styles.address}>
              <Text style={{paddingLeft: 10}}>Địa chỉ cửa hàng </Text>
              <Text
                style={{
                  color: '#333',
                  borderWidth: 0.3,
                  borderColor: '#111',
                  padding: 10,
                  marginVertical: 5,
                  marginLeft: 4,
                  borderRadius: 6,
                  width: '98%',
                }}
                numberOfLines={2}>
                {info?.address}
              </Text>
            </View>
            <View style={styles.des}>
              <Text>Mô tả shop: </Text>
              <Text style={styles.textarea}>{info?.description}</Text>
            </View>
          </View>
          <View style={styles.product}>
            <View>
              <Collapse>
                <CollapseHeader>
                  <Separator bordered style={{backgroundColor: COLORS.primary}}>
                    <Text style={{color: '#fff'}}>+ Quản lý sách</Text>
                  </Separator>
                </CollapseHeader>
                <CollapseBody style={{backgroundColor: COLORS.grayLight}}>
                  <ListItem onPress={() => navigation.navigate('CreateBook')}>
                    <Text>Thêm sách</Text>
                  </ListItem>
                  <ListItem onPress={() => navigation.navigate('BooksStore')}>
                    <Text>Quản lý sách</Text>
                  </ListItem>
                </CollapseBody>
              </Collapse>
            </View>
          </View>
          {/*  manage order */}
          <View style={styles.order}>
            <View>
              <Collapse>
                <CollapseHeader style={{backgroundColor: COLORS.grayLight}}>
                  <Separator
                    bordered
                    style={{
                      backgroundColor: COLORS.primary,
                    }}>
                    <Text style={{color: '#fff'}}>+ Quản lý đơn hàng</Text>
                  </Separator>
                </CollapseHeader>
                <CollapseBody style={{backgroundColor: COLORS.grayLight}}>
                  <ListItem
                    onPress={() => navigation.navigate('OrdersByStore')}>
                    <Text>Quản lý đơn hàng</Text>
                  </ListItem>
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
                  <Separator bordered style={{backgroundColor: COLORS.primary}}>
                    <Text style={{color: '#fff'}}>+ Tài chính</Text>
                  </Separator>
                </CollapseHeader>
                <CollapseBody style={{backgroundColor: COLORS.grayLight}}>
                  <ListItem onPress={() => navigation.navigate('Statistics')}>
                    <Text>Thống kê</Text>
                  </ListItem>
                </CollapseBody>
              </Collapse>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UpdateStore', {
                idStore: info.id,
              })
            }>
            <Text style={styles.btn}>Cập nhật cửa hàng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  });
};

const styles = StyleSheet.create({
  container_store: {
    flex: 0,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    // width: '90%',
  },

  infoStore: {},

  createStore: {
    marginHorizontal: 'auto',
    paddingVertical: '60%',
  },

  titleCreate: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 20,
  },
  btnCreate: {
    alignSelf: 'center',
    padding: 15,
    borderRadius: 4,
    color: '#fff',
    backgroundColor: COLORS.primary,
  },

  txtCreate: {
    color: '#fff',
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

  address: {
    marginVertical: 5,
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
    width: '98%',
    marginVertical: 10,
    padding: 10,
    textAlignVertical: 'top', // hack android
    height: 130,
    fontSize: 14,
    borderWidth: 0.1,
    borderRadius: 3,
    color: '#333',
    marginBottom: 20,
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
  btn: {
    padding: 10,
    // width: '50%',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: COLORS.primary,
  },
});

export default memo(Store);
