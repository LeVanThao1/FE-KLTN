import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Icon} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/themes';
import formatMoney from '../../utils/format';
import CartDetail from './CartDetail';

export default function Cart({navigation}) {
  return useObserver(() => {
    const {
      stores: {user},
    } = useContext(MobXProviderContext);
    const {cart} = user;
    const [total, setTotal] = useState(0);

    useEffect(() => {
      if (cart.length > 0) {
        setTotal(
          cart.reduce((a, b) => {
            return a + b.book.price * b.amount;
          }, 0),
        );
      }
    }, [cart]);

    return (
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="arrow-back" type="Ionicons" style={styles.headerIcon} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Giỏ Hàng</Text>
        </View> */}
        {cart && cart.length > 0 ? (
          <ScrollView style={styles.body}>
            {cart.map((ct, i) => (
              <CartDetail data={ct} key={i} />
            ))}
          </ScrollView>
        ) : (
          <Text style={{marginTop: 20, fontSize: 18}}>Giỏ hàng trống</Text>
        )}
        {cart.length > 0 && (
          <View style={styles.footer}>
            <View style={styles.footerTotal}>
              <Text style={styles.footerTotalText}>
                Tổng tiền:{' '}
                <Text style={styles.footerTotalPrice}>
                  {formatMoney(total)} VNĐ
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.footerPayment}
              onPress={() => navigation.navigate('Payment')}>
              <Text style={styles.footerPaymentText}>Mua hàng</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ededed',
    padding: 12,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
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
    marginHorizontal: -12,
    borderTopColor: '#000000',
    width: '100%',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 0.2,
    backgroundColor: '#ffffff',
  },
  footerTotal: {
    height: '100%',
    color: '#000000',
    width: '68%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTotalText: {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footerTotalPrice: {
    color: COLORS.primary,
  },
  footerPayment: {
    width: '32%',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerPaymentText: {
    fontSize: 15,
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});
