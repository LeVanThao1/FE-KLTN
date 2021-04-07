import {Button, Text, View} from 'native-base';
import React, {useState, memo} from 'react';
import {
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Images from '../../assets/images/images';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {styles, stylesTable} from './styles';
const ViewAll = () => {
  const [data, setData] = useState({
    tableHead: [
      'ID',
      'Tên sách',
      'Danh mục',
      'Giá(VND)',
      'Nhà xuất bản',
      'Năm xuất bản',
      'Số lần tái bản',
      'Hành động',
    ],
    tableData: [
      [1, 'One piece Hawai', 'Truyện tranh', 4000, '5', 2010, 5, '2'],
      [2, 'One piece', 'Sách dạy học', 4000, '5', 2010, 5, '2'],
      [3, 'One piece Hawai 2', 'Sách hướng dẫn', 4000, '5', 2010, 5, '2'],
      [4, 'One piece Hawai 1', 'Sách', 4000, '5', 2010, 5, '2'],
    ],
  });

  const element = (data, index) => (
    <TouchableOpacity onPress={() => this._alertIndex(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container_view}>
      <Text style={styles.header}>Tất cả sản phẩm</Text>
      <View style={styles.main}>
        <View style={styles.search}>
          <TextInput style={styles.input} placeholder="Nhập tên sản phẩm" />
          <Button
            primary
            style={{
              width: 100,
              height: 35,
              alignContent: 'center',
              padding: '5%',
              marginLeft: 5,
              borderRadius: 5,
            }}>
            <Text style={{textAlign: 'center'}}>Tìm</Text>
          </Button>
        </View>
        <View>
          <ScrollView horizontal>
            <View style={stylesTable.tableGrid}>
              <View style={stylesTable.tableRow}>
                <View style={stylesTable.id}>
                  <Text numberOfLines={1}>ID</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Tên sách</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Danh mục</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Giá</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Nhà xuất bản</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Năm xuất bản</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Số lần tái bản</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Hành động</Text>
                </View>
              </View>
              <View style={stylesTable.tableRow}>
                <View style={stylesTable.id}>
                  <Text>1</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Năm xuất bản</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Số lần tái bản</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Column 4</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Nhà xuất bản</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Năm xuất bản</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Số lần tái bản</Text>
                </View>
                <View style={stylesTable.column}>
                  <Text>Column 4</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default memo(ViewAll);
