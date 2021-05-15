import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import BG from '../../assets/images/bg.jpg';
import {useMutation} from '@apollo/client';
import {UPDATE_AVATAR, UPDATE_USER_INFO} from '../../query/user';
import ImagePicker from 'react-native-image-crop-picker';
import {Icon, Spinner} from 'native-base';
import {ReactNativeFile} from 'apollo-upload-client';
import {UPLOAD_SINGLE_FILE} from '../../query/upload';
import {Notification} from '../../utils/notifications';
import {COLORS, NOTIFI} from '../../constants';

import Toast from 'react-native-toast-message';
import Post from '../post';
import {mutateData} from '../../common';
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
    // useEffect(() => {
    //   setUserAvatar(info.avatar);
    // }, [info.avatar]);
    const handleChoosePhoto = (type) => {
      if (type) {
        ImagePicker.openPicker({
          width: 1024,
          height: 720,
          // includeBase64: true,
        }).then((response) => {
          // setUserAvatar(response.path);
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
          <View style={{marginHorizontal: 12}}>
            <ImageBackground
              source={BG}
              style={{
                width: '100%',
                height: 170,
                position: 'relative',
                marginTop: 12,
              }}
              imageStyle={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}></ImageBackground>
            <View style={styles.cover}>
              <View
                style={{
                  position: 'absolute',
                  width: 148,
                  height: 148,
                  borderRadius: 148,
                  borderWidth: 4,
                  top: -80,
                  borderColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                }}>
                <Image
                  style={{...styles.image, opacity: !loading ? 1 : 0.5}}
                  source={{
                    uri: info.avatar || defaultAvatar,
                  }}
                />
                {loading && (
                  <View
                    style={{
                      position: 'absolute',
                    }}>
                    <Spinner size="small" color={COLORS.primary} />
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // marginTop: 20,
                  // backgroundColor: 'blue',
                  width: 180,
                  marginTop: 25,
                }}>
                <TouchableOpacity
                  onPress={() => handleChoosePhoto(false)}
                  style={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    margin: 0,
                    // marginTop: -20,

                    // width: 70,
                    // height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    backgroundColor: COLORS.primary,
                    borderRadius: 40,
                  }}>
                  <Icon
                    type="MaterialIcons"
                    name="camera-alt"
                    style={{fontSize: 25, color: '#fff'}}></Icon>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChoosePhoto(true)}
                  style={{
                    // paddingHorizontal: 10,
                    // paddingVertical: 5,
                    margin: 0,
                    // marginTop: -20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    backgroundColor: COLORS.primary,
                    borderRadius: 40,
                  }}>
                  <Icon
                    type="MaterialIcons"
                    name="photo-library"
                    style={{fontSize: 25, color: '#fff'}}></Icon>
                </TouchableOpacity>
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={styles.name}>{userName}</Text>
              </View>
            </View>
          </View>

          {/* <Hr /> */}
          <View style={styles.form}>
            {/* <Hr /> */}
            <View style={styles.row}>
              <Icon name="phone-alt" type="FontAwesome5" style={styles.icon} />
              <Text style={styles.inputText}>{userPhone}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="mail" type="Entypo" style={styles.icon} />
              <Text style={styles.inputText}>{userEmail}</Text>
            </View>
            {/* <Hr /> */}
            <View style={styles.row}>
              <Icon
                name="map-marker-alt"
                type="FontAwesome5"
                style={styles.icon}
              />
              <Text style={styles.inputText}> {userAddress}</Text>
            </View>
            {/* <Hr />

            <Hr /> */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('UpdateProfile')}>
              <Text style={styles.buttonText}>Cập nhật thông tin</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 5}}>
            <Post />
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
    alignItems: 'center',
    height: '100%',
    // paddingTop: 30,
  },
  icon: {
    fontSize: 20,
    color: COLORS.primary,
  },
  name: {
    color: '#111',
    fontSize: 24,
    // padding: 20,
    fontWeight: 'bold',
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 140,
    // resizeMode: 'cover',
    // borderWidth: 3,
    // borderColor: '#fff',
  },
  form: {
    // width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    borderRadius: 5,
    paddingVertical: 7,
    paddingLeft: 15,
    marginTop: 10,
  },
  row: {
    width: '100%',
    // borderBottomColor: '#696969',
    // borderBottomWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    // backgroundColor: '#ffffff',
  },
  label: {
    width: 130,
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
    marginLeft: 20,
    // fontWeight: 'bold',
    // borderLeftColor: '#696969',
    // borderLeftWidth: 0.2,
  },
  button: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 12,
    borderRadius: 5,
    marginVertical: 10,
    // marginHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 0.75,
  },
});

export default Profile;
