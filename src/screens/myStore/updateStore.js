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
  Alert,
} from 'react-native';
import Textarea from 'react-native-textarea';
import {Icon, ListItem, Separator, Spinner, Button} from 'native-base';
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
import {UPDATE_STORE} from '../../query/store';
import {introspectionFromSchema} from 'graphql';
import {transaction} from 'mobx';
import {Picker} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../constants/themes';
import {UPDATE_AVATAR, UPDATE_USER_INFO} from '../../query/user';
import ImagePicker from 'react-native-image-crop-picker';
import {ReactNativeFile} from 'apollo-upload-client';

import sub, {
  getProvinces,
  getDistricts,
  getWards,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
} from 'sub-vn';
import Toast from 'react-native-toast-message';
import {Notification} from '../../utils/notifications';
import {NOTIFI} from '../../constants';
import {UPLOAD_SINGLE_FILE} from '../../query/upload';

const UpdateStore = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {shop, user, auth},
    } = useContext(MobXProviderContext);
    const {info, setInfo} = shop;
    const navigation = useNavigation();
    const add = info.address.split(',');

    const [name, setName] = useState({
      value: info ? info.name : '',
      error: '',
    });
    const [description, setDescription] = useState({
      value: info ? info.description : '',
      error: '',
    });

    const getAddress = (type, i) =>
      type.filter(
        (pr) =>
          pr.name.toUpperCase() === add[add.length - i].trim().toUpperCase(),
      )[0].code +
      '-' +
      type.filter(
        (pr) =>
          pr.name.toUpperCase() === add[add.length - i].trim().toUpperCase(),
      )[0].name;
    const [provinces, setProvinces] = useState({
      value:
        getProvinces()?.filter(
          (pr) =>
            pr.name.toUpperCase() === add[add.length - 1].trim().toUpperCase(),
        )[0].code +
          '-' +
          getProvinces().filter(
            (pr) =>
              pr.name.toUpperCase() ===
              add[add.length - 1].trim().toUpperCase(),
          )[0].name || undefined,
      error: '',
    });
    const [districts, setDistricts] = useState({
      value: getAddress(getDistricts(), 2) || undefined,
      error: '',
    });
    const wardOfDistrict = getWards()?.filter(
      (pr) =>
        pr.name.toUpperCase() === add[add.length - 3].trim().toUpperCase() &&
        pr.district_name ===
          getDistricts().filter(
            (pr) =>
              pr.name.toUpperCase() ===
              add[add.length - 2].trim().toUpperCase(),
          )[0].name,
    )[0];
    const [ward, setWard] = useState({
      value: wardOfDistrict?.code + '-' + wardOfDistrict?.name || undefined,
      error: '',
    });
    const [address, setAddress] = useState({
      value: info && add.length == 4 ? add[add.length - 4].trim() : '',
      error: '',
    });
    useEffect(() => {}, [provinces]);

    const [updateStore, {called, loading, data, error}] = useMutation(
      UPDATE_STORE,
      {
        onCompleted: async (data) => {
          setInfo({
            ...info,
            name: name.value,
            description: description.value,
            address: `${address.value}, ${ward.value.split('-')[1]}, ${
              districts.value.split('-')[1]
            }, ${provinces.value.split('-')[1]}`,
          });
          Toast.show(
            Notification(NOTIFI.error, 'C???p nh???t c???a h??ng th??nh c??ng'),
          );
        },
        onError: (err) => {
          Toast.show(Notification(NOTIFI.error, err.message));
          console.log('error update store', err);
        },
      },
    );
    const validateSubmit = () => {
      let count = 0;
      if (!name.value) {
        setName({
          ...name,
          error: 'Vui l??ng nh???p h??? t??n',
        });
        count++;
      }
      if (!provinces.value) {
        setProvinces({
          ...provinces,
          error: 'Vui l??ng ch???n t???nh / th??nh ph???',
        });
        count++;
      }
      if (!districts.value) {
        setDistricts({
          ...districts,
          error: 'Vui l??ng ch???n qu???n / huy???n',
        });
        count++;
      }
      if (!ward.value) {
        setWard({
          ...ward,
          error: 'Vui l??ng ch???n ph?????ng / x??',
        });
        count++;
      }
      if (!address.value) {
        setAddress({
          ...address,
          error: 'Vui l??ng nh???p ?????a ch??? c??? th???',
        });
        count++;
      }
      return count === 0;
    };

    const onAlert = () => {
      Alert.alert('?????ng ?? c???p nh???t', 'L???a ch???n', [
        {text: '?????ng ??', onPress: () => onPress()},
        {text: 'H???y'},
      ]);
    };

    const [upload] = useMutation(UPLOAD_SINGLE_FILE, {
      onCompleted: (data) => {
        setAvatarUpload(data.uploadSingleFile.url);
      },
      onError: (err) => {
        Toast.show(Notification(NOTIFI.error, err.message));
        console.log(err);
      },
    });
    const [avatarUpload, setAvatarUpload] = useState(info.avatar);

    const onPress = () => {
      if (validateSubmit === true) {
        let dataStore = {
          avatar: avatarUpload,
          // // background: 'https://picsum.photos/id/237/200/300',
          name: name.value,
          description: description.value,
          address: `${address.value}, ${ward.value.split('-')[1]}, ${
            districts.value.split('-')[1]
          }, ${provinces.value.split('-')[1]}`,
          // owner: user.info.id,
        };
        updateStore({
          variables: {
            dataStore,
            id: shop.info.id,
          },
        });
      }
      else {
        Toast.show({
          text: 'Vui l??ng nh???p ????? th??ng tin',
          type: 'error',
          position: 'top',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
      // }
    };

    const handleChoosePhoto = (type) => {
      if (type) {
        ImagePicker.openPicker({
          width: 1024,
          height: 720,
          // includeBase64: true,
        }).then((response) => {
          setLoading(true);
          mutateData(UPDATE_AVATAR, {
            file: new ReactNativeFile({
              uri: response.path,
              name: 'avatar',
              type: response.mime,
            }),
          })
            .then(({data}) => {
              setInfo({
                ...info,
                avatar: data.updateAvatar,
              });
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        });
      } else {
        ImagePicker.openCamera({
          width: 1024,
          height: 720,
          // includeBase64: true,
        }).then((response) => {
          setLoading(true);
          mutateData(UPDATE_AVATAR, {
            file: new ReactNativeFile({
              uri: response.path,
              name: 'avatar',
              type: response.mime,
            }),
          })
            .then(({data}) => {
              setInfo({
                ...info,
                avatar: data.updateAvatar,
              });
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        });
      }
    };
    return (
      <ScrollView>
        {/* <View style={styles.images}>
          <ImageBackground source={Images.slider1} style={styles.image}>
            <Image source={{uri: info.avatar}} style={styles.avatar} />
          </ImageBackground>
        </View> */}

        <View style={styles.container_store}>
          <View style={styles.cover}>
            <Image
              style={{...styles.imageAvt, opacity: !loading ? 1 : 0.5}}
              source={{
                uri: info.avatar,
              }}
            />
            {loading && (
              <View
                style={{
                  position: 'absolute',
                  top: 35,
                }}>
                <Spinner size="small" color={COLORS.primary} />
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => handleChoosePhoto(false)}
                style={{
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  margin: 0,
                  // width: 70,
                  // height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 40,
                  backgroundColor: 'transparent',
                }}>
                <Icon
                  type="MaterialIcons"
                  name="camera-alt"
                  style={{fontSize: 25, color: COLORS.primary}}></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleChoosePhoto(true)}
                style={{
                  // paddingHorizontal: 10,
                  // paddingVertical: 5,
                  margin: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 40,
                  backgroundColor: 'transparent',
                }}>
                <Icon
                  type="MaterialIcons"
                  name="photo-library"
                  style={{fontSize: 25, color: COLORS.primary}}></Icon>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={{fontSize: 16}}>T??n shop </Text>
            <TextInput
              style={styles.titleCreate}
              placeholder="Nh???p t??n shop"
              value={name.value}
              onChangeText={(value) =>
                setName({
                  ...name,
                  value: value,
                })
              }
            />
          </View>
          <View style={styles.field}>
            <Text>T???nh / Th??nh ph???</Text>
            <View
              style={{
                ...styles.picker,
                borderColor: !!provinces.error ? 'red' : '#696969',
              }}>
              <Picker
                note
                mode="dropdown"
                style={{width: '100%', borderWidth: 1, borderColor: '#696969'}}
                selectedValue={provinces?.value}
                placeholder="Ch???n t???nh / th??nh ph???"
                onValueChange={(value) => {
                  setProvinces({value: value, error: ''});
                }}>
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
            <Text>Qu???n / Huy???n</Text>
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
                placeholder="Ch???n qu???n / huy???n"
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
            <Text>Th??? x??/Th??n</Text>
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
                placeholder="Ch???n x?? / th??n"
                onValueChange={(value) => {
                  console.log('ward change', value);
                  setWard({value: value, error: ''});
                }}>
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
            <Text>?????a ch??? c??? th???</Text>
            <TextInput
              style={styles.titleCreate}
              placeholder="Nh???p ?????a ch??? c??? th???"
              value={address.value}
              onChangeText={(value) => setAddress({...address, value})}
              onFocus={() => {
                setAddress({...address, error: ''});
              }}
            />
            <Text style={styles.err}>{address.error}</Text>
          </View>
          <View style={styles.des}>
            <Text style={{fontSize: 16}}>M?? t??? shop </Text>
            <Textarea
              containerStyle={styles.textareacont}
              style={styles.textarea}
              maxLength={200}
              placeholder={'Nh???p m?? t???'}
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
          <TouchableOpacity style={styles.btnCreate} onPress={onAlert}>
            <Text style={styles.txtCreate}>C???p nh???t c???a h??ng</Text>
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
  },

  createStore: {
    marginHorizontal: 'auto',
    paddingVertical: '60%',
  },

  titleCreate: {
    width: '100%',
    height: 40,
    fontSize: 14,
    paddingHorizontal: 10,
    // marginLeft: 10, de t tao cai store xong da
    color: '#111',
    borderWidth: 0.2,
    borderRadius: 4,
  },
  btnCreate: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 5,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  txtCreate: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 0.75,
  },

  cover: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: '#696969',
  },
  imageAvt: {width: 128, height: 128, borderRadius: 64},

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

export default memo(UpdateStore);
