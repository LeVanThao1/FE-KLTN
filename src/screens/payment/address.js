import {Picker} from 'native-base';
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
import RNPickerSelect from 'react-native-picker-select';
import sub, {getProvinces} from 'sub-vn';

const Address = () => {
  const [provinces, setProvinces] = useState('');
  console.log(provinces);
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
        <Picker
          note
          mode="dropdown"
          style={{width: '100%'}}
          // selectedValue={provinces}
          placeholder="Chọn tỉnh / thành phố"
          onValueChange={(value) => setProvinces(value)}>
          {getProvinces().map((pr) => (
            <Picker.Item
              key={pr.code}
              label={pr.name}
              value={pr.code + '-' + pr.name}
            />
          ))}
          {/* <Picker.Item label="Wallet" value="key0" />
          <Picker.Item label="ATM Card" value="key1" />
          <Picker.Item label="Debit Card" value="key2" />
          <Picker.Item label="Credit Card" value="key3" />
          <Picker.Item label="Net Banking" value="key4" /> */}
        </Picker>
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

export default memo(Address);
