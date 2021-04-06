import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {Icon, Button} from 'native-base';
import CartDetail from './CartDetail';

export default function Cart() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" type="Ionicons" style={styles.headerIcon} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Giỏ Hàng</Text>
      </View>
      <ScrollView style={styles.body}>
        <CartDetail />
        <CartDetail />
        <CartDetail />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalText}>
            Tổng tiền: <Text style={styles.footerTotalPrice}>100.000đ</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.footerPayment}>
          <Text style={styles.footerPaymentText}>Mua hàng</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: 'rgba(68, 108, 179, 1)',
    padding: 8,
  },
  headerIcon: {
    zIndex: 1,
    fontSize: 24,
    color: '#ffffff',
  },
  headerTitle: {padding: 8, fontSize: 24, color: '#ffffff'},
  body: {
    flex: 1,
    width: '100%',
  },
  footer: {
    borderTopColor: '#000000',
    width: '100%',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    height: 60,
    borderColor: 'rgba(68, 108, 179, 1)',
    borderWidth: 0.2,
  },
  footerTotal: {
    height: '100%',
    color: '#000000',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footerTotalPrice: {
    color: 'rgba(68, 108, 179, 1)',
  },
  footerPayment: {
    width: '40%',
    backgroundColor: 'rgba(68, 108, 179, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerPaymentText: {
    fontSize: 20,
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});
