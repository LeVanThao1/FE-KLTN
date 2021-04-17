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
} from 'react-native';
import Textarea from 'react-native-textarea';
import {Icon, ListItem, Separator} from 'native-base';
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

const CreateStore = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {user},
    } = useContext(MobXProviderContext);
    const {info} = user;
    const navigation = useNavigation();
    const [listInfo, setListInfo] = useState(null);
    const [text, setText] = useState('');
    const [store, {called, loading, data, error}] = useLazyQuery(GET_STORE, {
      onCompleted: async (data) => {
        setListInfo({
          id: info.store.id,
          name: info.store.name,
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
    useEffect(() => {
      store({
        variables: {
          id: info.store.id,
        },
      });
    }, [info]);
    console.log('List info ...', listInfo);
    console.log('Store info ...', info);

    return (
      <ScrollView>
        <View style={styles.images}>
          <ImageBackground source={Images.slider1} style={styles.image}>
            <Image source={{uri: info.avatar}} style={styles.avatar} />
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
              value={info.store.name}
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
              value={info.store.description}
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
                  <ListItem
                    onPress={() => navigation.navigate('CreateProduct')}>
                    <Text>Thêm sản phẩm</Text>
                  </ListItem>
                  <ListItem
                    onPress={() => navigation.navigate('ViewAllProduct')}>
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
  });
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

export default memo(CreateStore);
