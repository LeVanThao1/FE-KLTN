import React, {memo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  Button,
} from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
import sub from 'sub-vn';

const Test = () => {
  const [value, setValue] = useState('');
  return (
    <View style={styles.container}>
      <View>
        <Text>Họ và tên</Text>
        <TextInput placeholder="Nhập họ & tên" />
      </View>
      <View>
        <Text>Số điện thoại</Text>
        <TextInput placeholder="Nhập SĐT" />
      </View>
      <View>
        <TextInput placeholder="Nhập SĐT" /> */}
      </View>
      <View>
        <Text>Quận/Huyện</Text>
        <TextInput placeholder="Nhập SĐT" />
      </View>
      <View>
        <Text>Thị xã/Thôn</Text>
        <TextInput placeholder="Nhập SĐT" />
      </View>
      <View>
        <Text>Địa chỉ cụ thể</Text>
        <TextInput placeholder="Nhập địa chỉ cụ thể" />
      </View>
      <View>
        <Button title="Xác nhận" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default memo(Test);
