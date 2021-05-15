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
} from 'react-native';
import {useLazyQuery, useMutation} from '@apollo/client';
import {UPDATE_USER_INFO, GET_PROFILE_USER} from '../../query/user';
import ImagePicker from 'react-native-image-crop-picker';
import {Icon, Spinner} from 'native-base';
import {ReactNativeFile} from 'apollo-upload-client';
import {UPLOAD_SINGLE_FILE} from '../../query/upload';
import {Notification} from '../../utils/notifications';
import {COLORS, NOTIFI} from '../../constants';
import PostOfUser from '../post/postOfUser';

import Toast from 'react-native-toast-message';
import {queryData} from '../../common';
const defaultAvatar =
  'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2';
const Profile = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {
        auth,
        user: {info, setInfo},
      },
    } = useContext(MobXProviderContext);
    const id = route.params.id;
    console.log(id);
    const [userProfile, setUserProfile] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      queryData(GET_PROFILE_USER, {id: id})
        .then(({data}) => {
          setUserProfile(data.profileUserOther);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {}, [loading]);

    return (
      <View style={styles.container}>
        {!loading ? (
          <ScrollView style={styles.body}>
            <View style={styles.cover}>
              <Image
                style={styles.image}
                source={{
                  uri: userProfile.profile.avatar || imageURL,
                }}
              />
              <View>
                <Text style={styles.name}>{userProfile.profile.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#e6e6e6',
                  paddingVertical: 10,
                  paddingHorizontal: 60,
                  borderRadius: 10,
                }}>
                {/* <View style={{paddingVertical: 20, paddingHorizontal: 30}}> */}
                <Icon
                  name="messenger"
                  type="Fontisto"
                  style={{fontSize: 20, padding: 0, marginRight: 20}}
                />
                <Text style={{padding: 0, margin: 0}}>Nhắn tin</Text>
                {/* </View> */}
              </View>
            </View>

            <Hr />
            <View style={styles.form}>
              {/* <Hr /> */}
              <View style={styles.row}>
                <Icon
                  name="phone-alt"
                  type="FontAwesome5"
                  style={styles.icon}
                />
                <Text style={styles.inputText}>
                  {userProfile.profile.phone}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="mail" type="Entypo" style={styles.icon} />
                <Text style={styles.inputText}>
                  {userProfile.profile.email}
                </Text>
              </View>
              {/* <Hr /> */}
              <View style={styles.row}>
                <Icon
                  name="map-marker-alt"
                  type="FontAwesome5"
                  style={styles.icon}
                />
                <Text style={styles.inputText}>
                  {' '}
                  {userProfile.profile.address}
                </Text>
              </View>
              <Hr />

              <Hr />
              {info.id === userProfile.profile.id ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('UpdateProfile')}>
                  <Text style={styles.buttonText}>Cập nhật thông tin</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
            <View>
              {/* <View style={styles.infoBg}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: COLORS.white,
                  }}></Text>
              </View> */}
              <Hr />
              <PostOfUser posts={userProfile.post} />
            </View>
          </ScrollView>
        ) : (
          <Spinner size="small" color={COLORS.primary} />
        )}
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
    paddingTop: 30,
  },
  icon: {
    fontSize: 20,
  },
  name: {
    color: '#111',
    fontSize: 24,
    padding: 20,
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
    // height: 220,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: '#696969',
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  form: {
    width: '100%',
    paddingHorizontal: 35,
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
    fontWeight: 'bold',
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
    fontSize: 18,
    letterSpacing: 0.75,
  },
});

export default Profile;
