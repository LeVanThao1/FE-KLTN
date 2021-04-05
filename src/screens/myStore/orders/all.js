import {Button, Icon, Text, View} from 'native-base';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styles, stylesTable} from './styles';

import Images from '../../../assets/images/images';

const All = () => {
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

  return (
    // <ScrollView horizontal={false}>
    // <View>
    //   <View style={stylesPost.person}>
    //     <View style={stylesPost.info}>
    //       <Image source={Images.onepiece1} style={stylesPost.avt} />
    //       <Text style={stylesPost.name}>Monkey D Luffy</Text>
    //     </View>
    //     <Icon name="dots-horizontal" type="MaterialCommunityIcons" />
    //   </View>
    //   <Image source={Images.onepiece1} style={stylesPost.post} />
    //   <Text>Vài giây trước</Text>

    //   <View style={stylesPost.content}>
    //     <View style={stylesPost.action}>
    //       <View style={stylesPost.heart_cmt}>
    //         <Icon name="heart-o" type="FontAwesome" />
    //         <Text style={stylesPost.textCount}>10</Text>
    //         <Icon
    //           name="comment-o"
    //           type="FontAwesome"
    //           style={{paddingLeft: 15}}
    //         />
    //         <Text style={stylesPost.textCount}>20</Text>
    //       </View>
    //       <Icon
    //         name="share"
    //         type="FontAwesome"
    //         // style={{color: '#fff', borderColor: '#111'}}
    //       />
    //     </View>
    //     <View style={stylesPost.text}>
    //       <Text style={{fontWeight: 'bold'}}>MonkeLuffy</Text>
    //       <Text style={stylesPost.textContent}>
    //         chào em anh đưunsg đây từ chiều chào em anh đưunsg đây từ chiều
    //       </Text>
    //     </View>
    //     <View style={stylesPost.addCmt}>
    //       <View style={stylesPost.person}>
    //         <View style={stylesPost.info}>
    //           <Image source={Images.onepiece1} style={stylesPost.avtcmt} />
    //           <TextInput style={stylesPost.name} placeholder="Thêm bình luận" />
    //         </View>
    //       </View>
    //     </View>
    //     <View style={stylesPost.cmt}></View>
    //   </View>
    // </View>
    // </ScrollView>

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

export default All;
