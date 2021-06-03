import React, {useState, memo, useContext, useEffect, useRef} from 'react';
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
import {useLazyQuery, useMutation} from '@apollo/client';
import {CREATE_STORE, GET_STORE} from '../../query/store';
import {introspectionFromSchema} from 'graphql';
import {transaction} from 'mobx';
import {Picker} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../constants/themes';

import sub, {
  getProvinces,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
} from 'sub-vn';
import Toast from 'react-native-toast-message';
import {Notification} from '../../utils/notifications';
import {NOTIFI} from '../../constants';

import ImagePicker from 'react-native-image-crop-picker';
import {UPLOAD_MULTI_FILE} from '../../query/upload';
import {ReactNativeFile} from 'extract-files';

const CreateStore = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {shop, user, auth},
    } = useContext(MobXProviderContext);
    const {info, setInfo} = shop;
    const navigation = useNavigation();
    const [name, setName] = useState({
      value: '',
      error: '',
    });
    const [description, setDescription] = useState('');
    const [provinces, setProvinces] = useState({
      value: undefined,
      error: '',
    });
    const [districts, setDistricts] = useState({
      value: undefined,
      error: '',
    });
    const [ward, setWard] = useState({
      value: undefined,
      error: '',
    });
    const [address, setAddress] = useState({
      value: '',
      error: '',
    });

    const [createStore, {called, loading, data, error}] = useMutation(
      CREATE_STORE,
      {
        onCompleted: async (data) => {
          Toast.show({
            text: `Tạo cửa hàng thành công`,
            type: 'success',
            position: 'top',
            style: {backgroundColor: COLORS.primary, color: '#ffffff'},
          });
          AsyncStorage.clear().then(() => {
            auth.setLogout();
          });
        },
        onError: (err) => {
          Toast.show(Notification(NOTIFI.error, err.message));
          console.log(err);
        },
      },
    );
    const validateSubmit = () => {
      let count = 0;
      if (!name.value) {
        setName({
          ...name,
          error: 'Vui lòng nhập họ tên',
        });
        count++;
        return name.error;
      }
      if (!provinces.value) {
        setProvinces({
          ...provinces,
          error: 'Vui lòng chọn tỉnh / thành phố',
        });
        count++;
        return provinces.error;
      }
      if (!districts.value) {
        setDistricts({
          ...districts,
          error: 'Vui lòng chọn quận / huyện',
        });
        count++;
        return districts.error;
      }
      if (!ward.value) {
        setWard({
          ...ward,
          error: 'Vui lòng chọn phường / xã',
        });
        count++;
      }
      if (!address.value) {
        setAddress({
          ...address,
          error: 'Vui lòng nhập địa chỉ cụ thể',
        });
        count++;
        return address.error;
      }
      return count === 0;
    };

    const refName = useRef(null);
    const [imagesUpload, setImageUpload] = useState([]);
    const [images, setImages] = useState([]);
    const onChange = (value) => {
      setCategori({
        value: value,
      });
    };

    const [visibleToast, setvisibleToast] = useState(false);

    // useEffect(() => setvisibleToast(false), [visibleToast]);
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
        Toast.show(Notification(NOTIFI.error, err.message));
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

    const removeImages = (index) => {
      setImages(images.filter((ig, i) => index !== i));
      setImageUpload(imagesUpload.filter((ig, i) => index !== i));
    };

    const onPress = () => {
      if (validateSubmit === true) {
        let dataStore = {
          // avatar: 'https://picsum.photos/200',
          name: name,
          description: description,
          address: `${address.value}, ${ward.value.split('-')[1]}, ${
            districts.value.split('-')[1]
          }, ${provinces.value.split('-')[1]}`,
          owner: user.info.id,
        };
        createStore({
          variables: {
            dataStore,
          },
        });
        setInfo(dataStore);
      } else {
        Toast.show({
          text: 'Vui lòng nhập đủ thông tin',
          type: 'error',
          position: 'top',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    };
    return (
      <ScrollView>
        <View style={styles.container_store}>
          <View style={styles.content}>
            <Text style={{fontSize: 16}}>Tên shop *</Text>
            <TextInput
              style={styles.titleCreate}
              placeholder="Nhập tên shop"
              value={name}
              onChangeText={(value) => setName(value)}
              onFocus={() => {
                setName({
                  ...name,
                  error: '',
                });
              }}
              onChangeText={(value) =>
                setName({
                  ...name,
                  value: value,
                })
              }
            />
            <Text style={styles.err}>{name.error}</Text>
          </View>
          <View style={styles.field}>
            <Text style={{fontSize: 16}}>Tỉnh / Thành phố *</Text>
            <View
              style={{
                ...styles.picker,
                borderColor: !!provinces.error ? 'red' : '#696969',
              }}>
              <Picker
                note
                mode="dropdown"
                style={{width: '100%', borderWidth: 1, borderColor: '#696969'}}
                selectedValue={provinces.value}
                placeholder="Chọn tỉnh / thành phố"
                onValueChange={(value) =>
                  setProvinces({value: value, error: ''})
                }>
                {getProvinces().map((pr) => (
                  <Picker.Item
                    key={pr.code}
                    label={pr.name}
                    value={pr.code + '-' + pr.name}
                  />
                ))}
              </Picker>
            </View>
            <Text style={styles.err}>{provinces.error}</Text>
          </View>
          <View style={styles.field}>
            <Text style={{fontSize: 16}}>Quận / Huyện *</Text>
            <View
              style={{
                ...styles.picker,
                borderColor: !!districts.error ? 'red' : '#696969',
              }}>
              <Picker
                note
                mode="dropdown"
                style={{width: '100%'}}
                selectedValue={districts.value}
                placeholder="Chọn quận / huyện"
                onValueChange={(value) =>
                  setDistricts({value: value, error: ''})
                }>
                {provinces?.value &&
                  getDistrictsByProvinceCode(
                    provinces.value.split('-')[0],
                  )?.map((pr) => (
                    <Picker.Item
                      key={pr.code}
                      label={pr.name}
                      value={pr.code + '-' + pr.name}
                    />
                  ))}
              </Picker>
            </View>
            <Text style={styles.err}>{districts.error}</Text>
          </View>
          <View style={styles.field}>
            <Text style={{fontSize: 16}}>Thị xã/Thôn *</Text>
            <View
              style={{
                ...styles.picker,
                borderColor: !!ward.error ? 'red' : '#696969',
              }}>
              <Picker
                note
                mode="dropdown"
                style={{width: '100%'}}
                selectedValue={ward.value}
                placeholder="Chọn xã / thôn"
                onValueChange={(value) => setWard({value: value, error: ''})}>
                {districts.value &&
                  getWardsByDistrictCode(
                    districts.value.split('-')[0],
                  )?.map((pr) => (
                    <Picker.Item
                      key={pr.code}
                      label={pr.name}
                      value={pr.code + '-' + pr.name}
                    />
                  ))}
              </Picker>
            </View>
            <Text style={styles.err}>{ward.error}</Text>
          </View>
          <View style={styles.field}>
            <Text style={{fontSize: 16}}>Địa chỉ cụ thể *</Text>
            <TextInput
              style={styles.titleCreate}
              placeholder="Nhập địa chỉ cụ thể"
              value={address.value}
              onChangeText={(value) => setAddress({...address, value})}
              onFocus={() => {
                setAddress({...address, error: ''});
              }}
            />
            <Text style={styles.err}>{address.error}</Text>
          </View>
          <View style={styles.des}>
            <Text style={{fontSize: 16}}>Mô tả shop </Text>
            <Textarea
              containerStyle={styles.textareacont}
              style={styles.textarea}
              maxLength={200}
              placeholder={'Nhập mô tả'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
              value={description}
              onFocus={() => {
                setDescription({
                  ...description,
                  error: '',
                });
              }}
              onChangeText={(value) =>
                setDescription({
                  ...description,
                  value: value,
                })
              }
            />
          </View>
          <TouchableOpacity style={styles.btnCreate} onPress={onPress}>
            <Text style={styles.txtCreate}>Tạo cửa hàng</Text>
          </TouchableOpacity>
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
    backgroundColor: '#fff',
    borderRadius: 6,
  },

  createStore: {
    marginHorizontal: 'auto',
    paddingVertical: '60%',
  },

  titleCreate: {
    width: '100%',
    height: 38,
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
    backgroundColor: COLORS.primary,
    color: '#fff',
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
    // margin: 5,
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
    // margin: 5,
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
  picker: {
    fontSize: 14,
    backgroundColor: '#f0f0f0',
    width: '100%',
    // padding: 10,
    // paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#696969',
    // letterSpacing: 0.75,
  },
  err: {
    fontSize: 10,
    color: 'red',
    textAlign: 'left',
  },
  field: {
    paddingBottom: 10,
  },
});

export default memo(CreateStore);
