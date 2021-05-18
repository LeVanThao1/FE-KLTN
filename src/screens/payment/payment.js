import React, {memo, useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import {Icon, ListItem, Picker, Separator} from 'native-base';
import Toast from 'react-native-toast-message';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Images from '../../assets/images/images';
import Address from './address';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import {useMutation} from '@apollo/client';
import {CREATE_ORDER} from '../../query/order';
import {mutateData, queryData} from '../../common';
import {Notification} from '../../utils/notifications';
import {NOTIFI} from '../../constants';
import {GET_DISTANCE} from '../../query/distance';
import {COLORS} from '../../constants/themes';
import formatMoney from '../../utils/format';

const Payment = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {
        user: {cart, setCart},
        order: {infoOrder, setInfoOrder},
      },
    } = useContext(MobXProviderContext);
    const [add, setAdd] = useState('');
    const [typePayment, setTypePayment] = useState('AFTERRECEIVED');
    const [total, setTotal] = useState(0);
    const [ship, setShip] = useState(undefined);
    const [note, setNote] = useState('');
    useEffect(() => {
      if (cart) {
        setTotal(cart.reduce((a, b) => a + b.book.price * b.amount, 0));
      }
    }, [cart]);

    useEffect(() => {
      if (infoOrder && infoOrder?.address?.length > 0) {
        queryData(GET_DISTANCE, {
          origin: infoOrder.address,
          destination: cart.map((ct) => ct.book.store.address),
        })
          .then(({data}) => {
            console.log(data);
            setShip(data.distances);
          })
          .catch((err) => {
            console.log('getDistance', err);
            Toast.show(Notification(NOTIFI.error, err));
          });
      }
    }, [infoOrder]);

    const onPress = () => {
      if (!infoOrder) {
        Toast.show(
          Notification(NOTIFI.error, 'Vui lòng nhập địa chỉ nhận hàng'),
        );
        return;
      }
      const subOrder = [...cart].map((ct, i) => ({
        book: ct.book.id,
        amount: ct.amount,
        price: ct.book.price,
        ship: ship[i],
      }));
      const order = {
        name: infoOrder?.name,
        phone: infoOrder?.phone,
        address: infoOrder?.address,
        subOrder,
        typePayment: typePayment,
        note: note,
      };

      mutateData(CREATE_ORDER, {dataOrder: order})
        .then(() => {
          setCart([]);
          setInfoOrder(undefined);
          navigation.navigate('ManageOrder');
          Toast.show(Notification(NOTIFI.success, 'Đặt hàng thành công'));
        })
        .catch((err) => {
          console.log(err);
          Toast.show(Notification(NOTIFI.error, 'Đặt hàng không thành công'));
        });
    };
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container_payment}>
            {/* address */}

            <TouchableOpacity
              style={styles.address}
              onPress={() => navigation.navigate('Andress')}>
              <View style={styles.location}>
                <Icon name="location" style={styles.icon} />
                <Text style={styles.text}>
                  Địa chỉ nhận hàng {add ? ' - Vui lòng họn địa chỉ' : ''}
                </Text>
              </View>
              <View style={{alignItems: 'center', height: 30}}>
                {infoOrder && (
                  <Text style={{...styles.text, width: 150}} numberOfLines={2}>
                    {infoOrder.address}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            {/* payment method */}
            <View style={styles.shipping}>
              <View style={styles.shipping_title}>
                <Icon
                  name="shipping-fast"
                  type="FontAwesome5"
                  style={{fontSize: 25}}
                />
                <Text style={styles.title}>Phương thức thanh toán</Text>
              </View>
              <View>
                <Picker
                  note
                  mode="dropdown"
                  style={{width: '100%'}}
                  selectedValue={typePayment}
                  placeholder="Chọn phương thức thanh toán"
                  onValueChange={(value) => setTypePayment(value)}>
                  <Picker.Item
                    key={'AFTERRECEIVED'}
                    label="Thanh toán sau khi nhận"
                    value={'AFTERRECEIVED'}
                  />
                  <Picker.Item
                    key={'ONLINE'}
                    label="Thanh toán trực tuyến"
                    value={'ONLINE'}
                  />
                </Picker>
              </View>
            </View>
            {cart &&
              cart.map((ct, i) => (
                <View key={i}>
                  <View style={styles.product}>
                    <Image
                      source={{
                        uri: ct.book.book
                          ? ct.book.book.images[0]
                          : ct.book.images[0],
                      }}
                      style={{width: 55, height: 70}}
                    />
                    <View style={styles.product_name}>
                      <Text>
                        {ct.book.name ? ct.book.name : ct.book.book.name}
                      </Text>
                      <View style={styles.product_amount}>
                        <Text>{ct.book.price}</Text>
                        <TextInput
                          placeholder="Nhập số lượng"
                          style={{textAlign: 'right'}}>
                          x {ct.amount}
                        </TextInput>
                      </View>
                      <View style={styles.product_amount}>
                        <Text>Phí vận chuyển</Text>
                        <Text
                          style={{
                            textAlign: 'right',
                            fontSize: 14,
                            color: COLORS.primary,
                          }}>
                          {ship ? ship[i] + ' đ' : 'Chưa xác định'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <Text style={{fontSize: 15}}>
                      Tổng số tiền ({ct.amount} sản phẩm):
                    </Text>
                    <Text
                      style={
                        (styles.price, {fontSize: 14, color: COLORS.primary})
                      }>
                      {formatMoney(
                        ct.amount * ct.book.price + (ship ? ship[i] : 0),
                      )}{' '}
                      VNĐ
                    </Text>
                  </View>
                </View>
              ))}
            {/* sumary */}
            <View style={styles.rowInput}>
              <Text style={{width: 80}}>Tin nhắn:</Text>
              <TextInput
                placeholder="Lưu ý cho người bán ..."
                style={{
                  borderBottomWidth: 0.5,
                  padding: 5,
                  paddingBottom: 1,
                  width: Dimensions.get('window').width - 120,
                }}
                value={note}
                onChangeText={(value) => setNote(value)}
              />
            </View>
            <View>
              <View style={styles.row}>
                <Text>Tổng tiền hàng</Text>
                <Text style={(styles.price, {fontSize: 14, color: '#111'})}>
                  {formatMoney(total)} VNĐ
                </Text>
              </View>
              {/* <View style={styles.row}>
                <Text>Tổng phí vận chuyển</Text>
                <Text style={(styles.price, {fontSize: 14, color: '#111'})}>
                  {ship} đ
                </Text>
              </View> */}
              <View style={styles.row}>
                <Text style={styles.sumary}>Tổng thanh toán</Text>
                <Text style={styles.sumary}>
                  {formatMoney(
                    ship ? total + ship.reduce((a, b) => a + b, 0) : total,
                  )}{' '}
                  VNĐ
                </Text>
              </View>
            </View>
            {/* btn payment */}
            <View style={styles.button}>
              <Button
                title="Đặt hàng"
                color={COLORS.primary}
                hasTVPreferredFocus={true}
                onPress={onPress}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  });
};

const styles = StyleSheet.create({
  container_payment: {
    flex: 1,
  },
  address: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,

    // height: 40,
    alignItems: 'center',
    borderBottomWidth: 1.2,
    borderBottomColor: COLORS.primary,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: COLORS.primary,
  },

  shipping_title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    margin: 10,
  },

  product: {
    padding: 15,
    flexDirection: 'row',
    // borderBottomColor: 'grey',
    // borderTopColor: 'grey',
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    // marginVertical: 5,
  },
  product_name: {
    marginHorizontal: 20,
    width: '100%',
  },
  product_amount: {
    width: Dimensions.get('screen').width - 104,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    // paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  sumary: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  price: {
    fontSize: 12,
    color: '#111',
  },
  button: {
    // width: '70%',
    borderRadius: 5,
    padding: 15,
    marginHorizontal: 15,
    alignContent: 'center',
  },
});

export default memo(Payment);
