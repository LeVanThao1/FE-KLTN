import {useNavigation} from '@react-navigation/native';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Icon} from 'native-base';
import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
const {width, height} = Dimensions.get('screen');

const HeaderRoom = ({name, avatar, userId, isNew}) => {
  const navigation = useNavigation();
  const [menu, setMenu] = useState();
  const openMenu = () => {
    menu.show();
  };

  return (
    <View style={styles.container__header}>
      <View style={styles.header__menu}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => {
            navigation.navigate('Chatting');
          }}>
          <Icon
            name="arrowleft"
            type="AntDesign"
            style={{color: '#fff', fontSize: 26}}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: isNew ? 'center' : 'flex-start',
              width: width - 145,
            }}>
            {!isNew && (
              <Image
                source={{uri: avatar}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  marginRight: 10,
                }}
              />
            )}
            <Text
              style={{
                fontSize: 18,
                color: '#fff',
                fontWeight: 'bold',
                padding: 0,
              }}
              numberOfLines={1}>
              {isNew ? 'Tin nhắn mới' : name}
            </Text>
          </View>

          {isNew ? (
            <TouchableOpacity
              onPress={() => {
                openMenu();
              }}>
              <Text style={{color: '#fff', fontSize: 15}}>Hủy</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => {
                  openMenu();
                }}>
                <Icon
                  type="Ionicons"
                  name="ios-information-circle"
                  style={{color: '#fff', fontSize: 30}}
                />
              </TouchableOpacity>
              <Menu ref={(ref) => setMenu(ref)} style={{height: 80}}>
                <MenuItem
                  style={{
                    padding: 0,
                    margin: 0,
                    height: 40,
                  }}
                  onPress={() => {
                    menu.hide();
                    navigation.navigate('ProfileOther', {userId});
                  }}>
                  Xem trang cá nhân
                </MenuItem>
                <MenuItem
                  style={{
                    padding: 0,
                    margin: 0,
                    height: 40,
                  }}
                  onPress={() => {
                    menu.hide();
                    navigation.navigate('ImagesView');
                  }}>
                  Tất cả hình ảnh
                </MenuItem>
              </Menu>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default HeaderRoom;
