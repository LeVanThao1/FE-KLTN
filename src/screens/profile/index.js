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

const defaultAvatar =
  'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2';
const Profile = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {
        auth,
        user: {
          info: {name, avatar, phone, address, email},
        },
      },
    } = useContext(MobXProviderContext);
    console.log('Profile Screen', {name, avatar, phone, address, email});
    const [userAvatar, setUserAvatar] = useState(avatar || defaultAvatar);
    const [userName, setUserName] = useState(name);
    const [userEmail, setUserEmail] = useState(email);
    const [userAddress, setUserAddress] = useState(address);
    const [userPhone, setUserPhone] = useState(phone);
    const checkEdit = () => {
      return (
        userName != name ||
        userPhone != phone ||
        email != userEmail ||
        address != userAddress
      );
    };
    return (
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <View style={styles.cover}>
            <Image
              style={styles.image}
              source={{
                uri: avatar || imageURL,
              }}
            />
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
                editable={!phone}
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
                editable={!email}
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
            {checkEdit ? (
              <TouchableOpacity style={styles.button}>
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
