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
import {COLORS} from '../../constants/themes';


const tempImageURL =
  'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2';

export default function Personal({navigation, imageURL}) {
  function NavItem({label, screen, objData}) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(screen, objData)}>
        <View style={styles.row}>
          <Text style={styles.label}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon
            name="arrow-back-sharp"
            type="Ionicons"
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Name at here</Text>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.cover}>
          <Image
            style={styles.image}
            source={{
              uri: imageURL ? imageURL : tempImageURL,
            }}
          />
        </View>
        <NavItem label="Đơn mua" screen="BuyOrder" />
        <NavItem label="Cửa hàng" screen="Store" />
        <NavItem label="Bài viết" screen="Post" />
        <NavItem label="Thông tin cá nhân" screen="Profile" />
      </ScrollView>
    </View>
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
<<<<<<< HEAD
    backgroundColor: COLORS.primary,
=======
    backgroundColor: '#f44f4f',
>>>>>>> 5496eb3dd2688c985a5aa2c22829045944d17ac1
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
  row: {
    width: '100%',
    borderBottomColor: '#696969',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 4,
  },
  label: {
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
    padding: 8,
    letterSpacing: 1,
  },
});
