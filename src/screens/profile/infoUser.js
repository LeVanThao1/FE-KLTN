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
import {useLazyQuery, useMutation} from '@apollo/client';
import {UPDATE_USER_INFO, GET_PROFILE_USER} from '../../query/user';
import ImagePicker from 'react-native-image-crop-picker';
import {Icon, Spinner} from 'native-base';
import {ReactNativeFile} from 'apollo-upload-client';
import {UPLOAD_SINGLE_FILE} from '../../query/upload';
import {Notification} from '../../utils/notifications';
import {COLORS, NOTIFI} from '../../constants';
import PostOfUser from '../post/postOfUser';
import BG from '../../assets/images/bg.jpg';
import Toast from 'react-native-toast-message';
import {queryData} from '../../common';
import ImageView from 'react-native-image-viewing';
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
    const [visible, setIsVisible] = useState(false);
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

    console.log(userProfile);

    useEffect(() => {}, [loading]);

    return (
      <View style={styles.container}>
        {!loading ? (
          <ScrollView style={styles.body}>
            <ImageView
              images={[{uri: userProfile.profile.avatar}]}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
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
                  <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: userProfile.profile.avatar || imageURL,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 60}}>
                  <Text style={styles.name}>{userProfile.profile.name}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#e6e6e6',
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                    borderRadius: 10,
                    width: 130,
                  }}
                  onPress={() => {
                    navigation.navigate('Room', {
                      name: userProfile.profile.name,
                      avatar: userProfile.profile.avatar,
                      userIdTo: userProfile.profile.id,
                    });
                  }}>
                  {/* <View style={{paddingVertical: 20, paddingHorizontal: 30}}> */}
                  <Icon
                    name="messenger"
                    type="Fontisto"
                    style={{fontSize: 20, ...styles.icon}}
                  />
                  <Text style={{padding: 0, margin: 0}}>Nh???n tin</Text>
                  {/* </View> */}
                </TouchableOpacity>
              </View>
            </View>

            {/* <Hr /> */}
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
              {/* <Hr /> */}

              {/* <Hr /> */}
              {info.id === userProfile.profile.id ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('UpdateProfile')}>
                  <Text style={styles.buttonText}>C???p nh???t th??ng tin</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={{marginTop: 5}}>
              {/* <View style={styles.infoBg}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: COLORS.white,
                  }}></Text>
              </View> */}
              {/* <Hr /> */}
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
  },
  icon: {
    fontSize: 20,
    color: COLORS.primary,
  },
  name: {
    color: '#111',
    fontSize: 24,
    padding: 15,
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
    // paddingTop: 30,
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
  },
  form: {
    // width: '100%',
    marginTop: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    borderRadius: 5,
    paddingVertical: 7,
    paddingLeft: 15,
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
