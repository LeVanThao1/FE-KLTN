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
import {UPDATE_USER_INFO} from '../../query/user';
import ImagePicker from 'react-native-image-crop-picker';
import {Icon} from 'native-base';
import {ReactNativeFile} from 'apollo-upload-client';
import {UPLOAD_SINGLE_FILE} from '../../query/upload';
import {Notification} from '../../utils/notifications';
import {NOTIFI} from '../../constants';
import Toast from 'react-native-toast-message';
const defaultAvatar =
  'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2';
const Profile = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {
        auth,
        user: {info, setInfo},
      },
    } = useContext(MobXProviderContext);
    const [upload] = useMutation(UPLOAD_SINGLE_FILE, {
      onCompleted: (data) => {
        console.log(data);
        setAvatarUpload(data.uploadSingleFile.url);
      },
      onError: (err) => {
        Toast.show(Notification(NOTIFI.error, err.message));
        console.log(err);
      },
    });
    const [avatarUpload, setAvatarUpload] = useState(info.avatar);
    const [userAvatar, setUserAvatar] = useState(info.avatar || defaultAvatar);
    const [userName, setUserName] = useState(info.name);
    const [userEmail, setUserEmail] = useState(info.email);
    const [userAddress, setUserAddress] = useState(info.address);
    const [userPhone, setUserPhone] = useState(info.phone);
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
          style: {backgroundColor: 'rgba(68, 108, 179, 1)', color: '#ffffff'},
        });
        setInfo({
          ...info,
          name: userName,
          avatar: avatarUpload,
          address: userAddress,
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
          upload({
            variables: {
              file: new ReactNativeFile({
                uri: response.path,
                name: 'avatar',
                type: response.mime,
              }),
            },
          });
        });
      } else {
        ImagePicker.openCamera({
          width: 1024,
          height: 720,
          // includeBase64: true,
        }).then((response) => {
          console.log(response, Object.keys(response));
          setUserAvatar(response.path);
          upload({
            variables: {
              file: new ReactNativeFile({
                uri: response.path,
                name: 'avatar',
                type: response.mime,
              }),
            },
          });
        });
      }
    };
    return (
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <View style={styles.cover}>
            <Image
              style={styles.image}
              source={{
                uri: userAvatar || imageURL,
              }}
            />
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
                  style={{fontSize: 25, color: 'rgba(68, 108, 179, 1)'}}></Icon>
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
                  style={{fontSize: 25, color: 'rgba(68, 108, 179, 1)'}}></Icon>
              </TouchableOpacity>
            </View>
          </View>

          <Hr />
          <View style={styles.form}>
            <View style={styles.row}>
              <Text style={styles.label}>Tên</Text>
              <TextInput
                style={styles.inputText}
                placeholder="tên"
                value={userName}
                onChangeText={(value) => setUserName(value)}
              />
            </View>
            <Hr />
            <View style={styles.row}>
              <Text style={styles.label}>Số điện thoại</Text>
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
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Email"
                value={userEmail}
                onChangeText={(value) => setUserEmail(value)}
                editable={!info.email}
              />
            </View>
            <Hr />
            <View style={styles.row}>
              <Text style={styles.label}>Địa chỉ</Text>
              <TextInput
                style={styles.inputText}
                placeholder="địa chỉ"
                value={userAddress}
                onChangeText={(value) => setUserAddress(value)}
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
                    color: 'rgba(68, 108, 179, 1)',
                  }}>
                  Thay đổi mật khẩu
                </Text>
              </View>
            </TouchableOpacity>
            <Hr />
            {checkEdit() ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  updateUser({
                    variables: {
                      userUpdate: {
                        name: userName,
                        avatar: avatarUpload,
                        address: userAddress,
                        interests: info.interests,
                      },
                    },
                  })
                }>
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
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(68, 108, 179, 1)',
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
  },
  row: {
    width: '100%',
    borderBottomColor: '#696969',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#ffffff',
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
    borderLeftColor: '#696969',
    borderLeftWidth: 0.2,
  },
  button: {
    backgroundColor: 'rgba(68, 108, 179, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 5,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    letterSpacing: 0.75,
  },
});

export default Profile;
