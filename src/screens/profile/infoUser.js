import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import DatePicker from 'react-native-datepicker';
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
import {split, useMutation} from '@apollo/client';
import {UPDATE_USER_INFO} from '../../query/user';
import * as ImagePicker from 'react-native-image-picker';
import {Button} from 'native-base';
import {ReactNativeFile} from 'apollo-upload-client';
import {UPLOAD_SINGLE_FILE} from '../../query/upload';
import { COLORS } from '../../constants';
import PostOfUser from '../post/postOfUser';
import Post from '../post';

const defaultAvatar =
  'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2';
const UserInfo = ({navigation, route}) => {
  const {userId, userName, userAvatar, userPhone, userMail, userAddress} = route.params;
  const lastName = (userName) => {
    let splitName = userName.split(' ');
    return splitName[splitName.length-1];
  }
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
        </View>

        <Hr />
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.label}>Tên</Text>
            <Text style={styles.inputText} placeholder="tên">
              {userName}
            </Text>
          </View>
          <Hr />
          <View style={styles.row}>
            <Text style={styles.label}>Số điện thoại</Text>
            <Text
              style={styles.inputText}
              placeholder="Số điện thoại"
              value={userPhone}
              // editable={!phone}
              // onChangeText={(value) => setUserPhone(value)}
              // keyboardType="numeric"
            >
              {userPhone}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text
              style={styles.inputText}
            >
              {userMail}
            </Text>
          </View>
          <Hr />
          <View style={styles.row}>
            <Text style={styles.label}>Địa chỉ</Text>
            <Text
              style={styles.inputText}
            >
              {userAddress}
            </Text>
          </View>
          <Hr />
          <Hr />          
        </View>
        <View>
        <View style={{backgroundColor: COLORS.primary, padding: 10, marginHorizontal: 10}}>
          <Text style={{textAlign: 'center', fontSize: 18, color: COLORS.white}}>Bài viết của {lastName(userName)}</Text>
        </View>
          <PostOfUser postOfUseId={userId} />
        </View>
      </ScrollView>
    </View>
  );
  // });
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

export default UserInfo;
