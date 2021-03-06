import React, {useState, memo, useContext, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Textarea from 'react-native-textarea';
import {Icon, ListItem, Separator, Button} from 'native-base';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Images from '../../assets/images/images';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {useLazyQuery} from '@apollo/client';
import {GET_STORE} from '../../query/store';
import {introspectionFromSchema} from 'graphql';
import {transaction} from 'mobx';
import {Notification} from '../../utils/notifications';
import Toast from 'react-native-toast-message';
import {NOTIFI} from '../../constants';
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

    console.log('shopppp', shop);

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
    // else {
    //   const [store, {called, loading, data, error}] = useLazyQuery(GET_STORE, {
    //     onCompleted: async (data) => {
    //       console.log(data);
    //       setListInfo({
    //         id: data?.store.id,
    //         name: data?.store.name,
    //         description: data?.store.description,
    //         address: data?.store.address,
    //       });
    //     },
    //     onError: (err) => {
    //       Toast.show(Notification(NOTIFI.error, err.message));
    //       console.log('get store', err);
    //     },
    //   });
    //   useEffect(() => {
    //     store({
    //       variables: {
    //         id: shop.info.id,
    //       },
    //     });
    //   }, [info]);
    // }
    // useEffect(() => {}, [info]);

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
              <Text
                // containerStyle={styles.textareacont}
                style={styles.textarea}
                // onChangeText={this.onChange}
                // defaultValue={this.state.text}
                // maxLength={120}
                // placeholder={'Description'}
                // placeholderTextColor={'#c7c7c7'}
                // underlineColorAndroid={'transparent'}>
              >
                {info?.description}
              </Text>
            </View>
          </View>
          {/* <View style={styles.product}></View> */}
          <View style={styles.product}>
            <View>
              <Collapse>
                <CollapseHeader>
                  <Separator bordered style={{backgroundColor: COLORS.primary}}>
                    <Text style={{color: '#fff'}}>+ Quản lý sản phẩm</Text>
                    {/* <Icon name="keyboard-arrow-down" type="MaterialIcons" /> */}
                  </Separator>
                </CollapseHeader>
                <CollapseBody style={{backgroundColor: COLORS.grayLight}}>
                  <ListItem onPress={() => navigation.navigate('CreateBook')}>
                    <Text>Thêm sản phẩm</Text>
                  </ListItem>
                  <ListItem onPress={() => navigation.navigate('BooksStore')}>
                    <Text>Quản lý sản phẩm</Text>
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
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() =>
            navigation.navigate('UpdateStore', {
              idStore: info.id,
            })
          }>
          <Text style={styles.btn}>Cập nhật cửa hàng</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 10,
    padding: 10,
    marginHorizontal: 85,
    width: '50%',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: COLORS.primary,
  },
});

export default memo(Store);
