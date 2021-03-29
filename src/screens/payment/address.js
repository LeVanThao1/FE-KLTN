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

const Address = () => {
  return (
    <View>
      <View>
        <Text>Họ và tên</Text>
        <TextInput placeholder="Điền họ & tên" />
      </View>
      <View>
        <Text>Số điện thoại</Text>
        <TextInput placeholder="Điền SĐT" />
      </View>
      <View>
        <Text>Số điện thoại</Text>
        <TextInput placeholder="Điền SĐT" />
      </View>
      <View>
        <Text>Số điện thoại</Text>
        <TextInput placeholder="Điền SĐT" />
      </View>
      <View>
        <Text>Số điện thoại</Text>
        <TextInput placeholder="Điền SĐT" />
      </View>
      <View>
        <Text>Địa chỉ cụ thể</Text>
        <TextInput placeholder="Nhập địa chỉ cụ thể" />
      </View>
      <View>
        <Button title="Chọn" />
      </View>
    </View>
  );
};

export default memo(Address);
