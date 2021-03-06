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
import {COLORS} from '../../constants/themes';

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
    const ManagerItem = ({label, icon, url, isLogout, type}) => {
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
              type={type ? type : 'AntDesign'}
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
                label="Th??ng tin c?? nh??n"
                icon="user"
                url="Profile"
              />
              <ManagerItem label="C???a h??ng" icon="book" url="Store" />
              <ManagerItem
                label="Qu???n l?? ????n h??ng mua"
                icon="gift"
                url="ManageOrder"
              />
              <ManagerItem
                label="Qu???n l?? gi??? h??ng"
                icon="shoppingcart"
                url="Cart"
              />
              <ManagerItem
                label="C???a h??ng g???n b???n"
                icon="location"
                url="ListStoreFound"
                type="Entypo"
              />
              <ManagerItem label="Wishlist" icon="hearto" url="WishList" />
              <ManagerItem label="????ng xu???t" icon="logout" url="" />
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
    padding: 12,
  },
    manager_wrapp: {
      padding: 8,
      paddingVertical: 16,
      backgroundColor: '#fff',
      borderRadius: 6,
    },
  header_wrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
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
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  user__avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    marginBottom: 16,
  },
  user_name: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  manager_item: {
    marginVertical: 0,
  },
  manager_item_wrap: {
    flexDirection: 'row',
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 0.6,
    paddingVertical: 8,
    paddingLeft: 16,
  },
  manager_item_icon: {
    fontSize: 20,
    color: COLORS.primary,
    marginRight: 16,
  },
  manager_item_text: {
    fontSize: 16,
  },
});
