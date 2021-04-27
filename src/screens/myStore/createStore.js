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
import {useLazyQuery, useMutation} from '@apollo/client';
import {CREATE_STORE, GET_STORE} from '../../query/store';
import {introspectionFromSchema} from 'graphql';
import {transaction} from 'mobx';

const CreateStore = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {shop, user},
    } = useContext(MobXProviderContext);
    const {info} = shop;
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [createStore, {called, loading, data, error}] = useMutation(
      CREATE_STORE,
      {
        onCompleted: async (data) => {
          goBack();
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
    // useEffect(() => {
    //   store({
    //     variables: {
    //       id: info?.id,
    //     },
    //   });
    // }, [info]);
    // console.log('List info ...', listInfo);

    const onPress = () => {
      let dataStore = {
        avatar: 'https://picsum.photos/200',
        background: 'https://picsum.photos/id/237/200/300',
        name: name,
        description: description,
        owner: user.info.id,
      };
      // dk gmail di.. hien tai dk bang dth no kh nhan dc sdt m. nen kh dk dc dau. bữa là nó cung caaso cho 2 cai api 1 la dung authentication của nó 2 là gui message. bữa t dùng thứ 1 nên nó xác nhận dc dth lạ. còn hiện tại t đổi lại dùng cai thứ  2 nên nó kh xác nhận dc sdt lạ nên lỗi đó, dt còn pin ko mở gọi ns cho nhanh, m chat dài vl còn lâu
      createStore({
        variables: {
          dataStore,
        },
      });
    };

    return (
      <ScrollView>
        {/* <View style={styles.images}>
          <ImageBackground source={Images.slider1} style={styles.image}>
            <Image source={{uri: info.avatar}} style={styles.avatar} />
          </ImageBackground>
        </View> */}

        <View style={styles.container_store}>
          <View>
            <Text>Thêm avatar nha</Text>
          </View>
          <View>
            <Text>Thêm background nha</Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontSize: 16}}>Tên shop </Text>
            <TextInput
              style={styles.titleCreate}
              placeholder="Nhập tên shop"
              value={name}
              onChangeText={(value) => setName(value)}
            />
          </View>
          <View style={styles.des}>
            <Text style={{fontSize: 16}}>Mô tả shop </Text>
            <Textarea
              containerStyle={styles.textareacont}
              style={styles.textarea}
              // onChangeText={this.onChange}
              // defaultValue={this.state.text}
              maxLength={200}
              placeholder={'Nhập mô tả'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
              value={description}
              onChangeText={(value) => setDescription(value)}
            />
          </View>
          <Button style={styles.btnCreate} onPress={onPress}>
            <Text style={styles.txtCreate}>Tạo cửa hàng</Text>
          </Button>
        </View>
      </ScrollView>
    );
  });
};

const styles = StyleSheet.create({
  container_store: {
    margin: 10,
    padding: 10,
    // alignItems: 'felx-start',
    // width: '90%',
  },

  createStore: {
    marginHorizontal: 'auto',
    paddingVertical: '60%',
  },

  titleCreate: {
    width: '100%',
    height: 35,
    fontSize: 14,
    // paddingBottom: 20,
    // marginLeft: 10, de t tao cai store xong da
    color: '#111',
    borderWidth: 0.2,
    borderRadius: 4,
  },
  btnCreate: {
    alignSelf: 'center',
    padding: 15,
    borderRadius: 4,
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
    // flexDirection: 'row',
    // alignItems: 'center',
    margin: 5,
    paddingVertical: 10,
    // width: '70%',
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
