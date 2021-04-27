import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
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
  return useObserver(() => {
    const {
      stores: {
        auth,
        user: {
          info: {name, avatar},
        },
      },
    } = useContext(MobXProviderContext);
    const ManagerItem = ({label, icon, url, isLogout}) => {
      return !url ? (
        <TouchableOpacity
          style={styles.manager_item}
          onPress={() => {
            AsyncStorage.clear().then(() => {
              auth.setLogout();
            });
          }}>
          <View style={styles.manager_item_wrap}>
            <Icon
              style={styles.manager_item_icon}
              name={icon}
              type="AntDesign"
            />
            <Text style={styles.manager_item_text}>{label}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.manager_item}
          onPress={() => navigation.navigate(url)}>
          <View style={styles.manager_item_wrap}>
            <Icon
              style={styles.manager_item_icon}
              name={icon}
              type="AntDesign"
            />
            <Text style={styles.manager_item_text}>{label}</Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content_wrap}>
            <View style={styles.user_wrap}>
              <Image
                style={styles.user__avatar}
                source={{
                  uri:
                    avatar ||
                    'https://theme.hstatic.net/1000361048/1000460005/14/slideshow_3.jpg?v=444',
                }}
              />
              <Text style={styles.user_name}>{name}</Text>
            </View>
            <View style={styles.manager_wrapp}>
              <ManagerItem
                label="Thông tin cá nhân"
                icon="user"
                url="Profile"
              />
              <ManagerItem
                label="Bài viết cá nhân"
                icon="logout"
                url="PostUser"
              />
              <ManagerItem label="Tạo cửa hàng" icon="book" url="CreateStore" />
              <ManagerItem
                label="Quản lý đơn hàng mua"
                icon="gift"
                url="ManageOrder"
              />
              <ManagerItem
                label="Quản lý giỏ hàng"
                icon="shoppingcart"
                url="Cart"
              />
              <ManagerItem label="Wishlist" icon="hearto" url="WishList" />
              <ManagerItem label="Đăng xuất" icon="logout" url="" />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
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
    marginBottom: 16,
    alignItems: 'center',
  },
  user__avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    marginBottom: 16,
  },
  user_name: {
    fontSize: 16,
    marginBottom: 10,
  },
  manager_item: {
    marginVertical: 0,
  },
  manager_item_wrap: {
    flexDirection: 'row',
    borderBottomColor: 'rgba(68, 108, 179, 1)',
    borderBottomWidth: 0.6,
    paddingVertical: 8,
    paddingLeft: 16,
  },
  manager_item_icon: {
    fontSize: 20,
    color: 'rgba(68, 108, 179, 1)',
    marginRight: 16,
  },
  manager_item_text: {
    fontSize: 16,
  },
});
