import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Icon} from 'native-base';

export default function AccountManager({navigation}) {
  const ManagerItem = ({label, icon, url, isLogout}) => {
    return isLogout ? (
      <TouchableOpacity
        style={styles.manager_item}
        onPress={() => console.log(`logout`)}>
        <View style={styles.manager_item_wrap}>
          <Icon style={styles.manager_item_icon} name={icon} type="AntDesign" />
          <Text style={styles.manager_item_text}>{label}</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.manager_item}
        onPress={() => navigation.navigate(url)}>
        <View style={styles.manager_item_wrap}>
          <Icon style={styles.manager_item_icon} name={icon} type="AntDesign" />
          <Text style={styles.manager_item_text}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header_wrap}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-sharp"
            type="Ionicons"
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
      </View>
      <ScrollView>
        <View style={styles.content_wrap}>
          <View style={styles.user_wrap}>
            <Image
              style={styles.user__avatar}
              source={{
                uri:
                  'https://theme.hstatic.net/1000361048/1000460005/14/slideshow_3.jpg?v=444',
              }}
            />
            <Text style={styles.user_name}>Anh Lâm</Text>
          </View>
          <View style={styles.manager_wrapp}>
            <ManagerItem label="Thông tin cá nhân" icon="user" url="Profile" />
            <ManagerItem label="Tạo cửa hàng" icon="book" url="CreateStore" />
            <ManagerItem
              label="Quản lý đơn hàng mua"
              icon="gift"
              url="manager-order"
            />
            <ManagerItem
              label="Quản lý giỏ hàng"
              icon="shoppingcart"
              url="manager-cart"
            />
            <ManagerItem label="Wishlist" icon="hearto" url="wishlist" />
            <ManagerItem
              label="Đăng xuất"
              icon="logout"
              isLogout={true}
              url=""
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  //   manager_wrapp: {

  //   },
  header_wrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(68, 108, 179, 1)',
    padding: 4,
  },
  headerIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  headerTitle: {fontSize: 20, color: '#ffffff', flex: 1},
  content_wrap: {
    paddingVertical: 20,
  },
  user_wrap: {
    justifyContent: 'center',
    marginBottom: 5,
    alignItems: 'center',
  },
  user__avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  manager_item: {
    marginVertical: 10,
  },
  manager_item_wrap: {
    flexDirection: 'row',
    borderBottomColor: '#ffe31b',
    borderBottomWidth: 0.6,
  },
  manager_item_icon: {fontSize: 16, color: '#ffe31b', marginRight: 5},
  manager_item_text: {},
});
