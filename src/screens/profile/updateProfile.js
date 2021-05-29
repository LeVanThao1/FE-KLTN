import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useMutation} from '@apollo/client';
import {UPDATE_AVATAR, UPDATE_USER_INFO} from '../../query/user';
import ImagePicker from 'react-native-image-crop-picker';
import {Icon, Spinner} from 'native-base';
import {ReactNativeFile} from 'apollo-upload-client';
import {UPLOAD_SINGLE_FILE} from '../../query/upload';
import {Notification} from '../../utils/notifications';
import {COLORS, NOTIFI} from '../../constants';

import Toast from 'react-native-toast-message';
import {mutateData} from '../../common';
const defaultAvatar =
  'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2';
const UpdateProfile = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {
        auth,
        user: {info, setInfo},
      },
    } = useContext(MobXProviderContext);
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
    // const [userAvatar, setUserAvatar] = useState(info.avatar || defaultAvatar);
    const [userName, setUserName] = useState(info.name);
    const [userEmail, setUserEmail] = useState(info.email);
    const [userAddress, setUserAddress] = useState(info.address);
    const [userPhone, setUserPhone] = useState(info.phone);
    const [loading, setLoading] = useState(false);
    const checkEdit = () => {
      return (
        userName != info.name ||
        userPhone != info.phone ||
        info.email != userEmail ||
        info.address != userAddress
      );
    };
    const [updateUser, {}] = useMutation(UPDATE_USER_INFO, {
      onCompleted: (data) => {
        Toast.show({
          text: 'Thay đổi thành công',
          type: 'success',
          position: 'top',
          // style: {backgroundColor: COLORS.primary, color: '#ffffff'},
        });
        setInfo({
          ...info,
          name: userName,
          address: userAddress,
          email: userEmail,
          phone: userPhone,
        });
      },
      onError: (err) => {
        Toast.show(Notification(NOTIFI.error, err.message));
        console.log(err);
      },
    });

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
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <View style={styles.cover}>
            <Image
              style={{...styles.image, opacity: !loading ? 1 : 0.5}}
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

          <Hr />
          <View style={styles.form}>
            <View style={styles.row}>
              <Icon
                style={styles.icon}
                name="rename-box"
                type="MaterialCommunityIcons"
              />
              <TextInput
                style={styles.inputText}
                placeholder="Tên"
                // autoFocus={true}
                value={userName}
                onChangeText={(value) => setUserName(value)}
              />
            </View>
            <View style={styles.row}>
              <Icon name="phone-alt" type="FontAwesome5" style={styles.icon} />
              <TextInput
                style={styles.inputText}
                placeholder="Số điện thoại"
                value={userPhone}
                editable={!info.phone}
                onChangeText={(value) => setUserPhone(value)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.row}>
              <Icon name="mail" type="Entypo" style={styles.icon} />
              <TextInput
                style={styles.inputText}
                placeholder="Email"
                value={userEmail}
                onChangeText={(value) => setUserEmail(value)}
                editable={!info.email}
              />
            </View>
            <View style={styles.row}>
              <Icon
                name="map-marker-alt"
                type="FontAwesome5"
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                placeholder="địa chỉ"
                value={userAddress}
                onChangeText={(value) => setUserAddress(value)}
                numberOfLines={1}
              />
            </View>
            <Hr />
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}>
              <View style={styles.row}>
                <Text
                  style={{
                    ...styles.label,
                    width: '100%',
                    color: COLORS.primary,
                    fontWeight: 'bold',
                  }}>
                  Thay đổi mật khẩu
                </Text>
              </View>
            </TouchableOpacity>
            <Hr />
            {checkEdit() ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  updateUser({
                    variables: {
                      userUpdate: {
                        name: userName,
                        avatar: avatarUpload,
                        address: userAddress,
                        email: info.email ? info.email : userEmail,
                        phone: info.phone ? info.phone : userPhone,
                        interests: info.interests,
                      },
                    },
                  });
                }}>
                <Text style={styles.buttonText}>Xác nhận thay đổi</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  });
};

function Hr() {
  return (
    <View
      style={{width: '100%', height: 12, backgroundColor: '#EEEEEE'}}></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 8,
  },
  headerIcon: {
    zIndex: 1,
    fontSize: 24,
    color: '#ffffff',
  },
  headerTitle: {padding: 8, fontSize: 24, color: '#ffffff', flex: 1},
  body: {
    flex: 1,
    width: '100%',
  },
  cover: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: '#696969',
  },
  image: {width: 128, height: 128, borderRadius: 64},
  form: {
    width: '100%',
    paddingHorizontal: 20,
  },
  row: {
    width: '100%',
    borderBottomColor: '#696969',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  label: {
    width: 150,
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
    padding: 8,
    letterSpacing: 1,
  },
  inputText: {
    flex: 1,
    color: '#000000',
    letterSpacing: 1,
    padding: 10,
    paddingLeft: 20,
    // borderLeftColor: '#696969',
    // borderLeftWidth: 0.2,
  },
  button: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 5,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 0.75,
  },
});

export default UpdateProfile;
