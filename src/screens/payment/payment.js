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
} from 'react-native';
import {Icon, ListItem, Separator} from 'native-base';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Images from '../../assets/images/images';
import Address from './address';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';

const Payment = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {
        user: {cart, setCart},
      },
    } = useContext(MobXProviderContext);
    const [add, setAdd] = useState('');

    const [total, setTotal] = useState(0);
    const order = () => {
      console.log('order');
    };
    const [ship, setShip] = useState(18000);
    useEffect(() => {
      if (cart) {
        setTotal(cart.reduce((a, b) => a + b.book.price * b.amount, 0));
      }
    }, [cart]);
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
                <Text
                  style={styles.text}
                  onPress={() => navigation.navigate('Andress')}>
                  Địa chỉ nhận hàng {add ? ' - Vui lòng họn địa chỉ' : ''}
                </Text>
              </View>
              <View>
                <Icon
                  name="keyboard-arrow-right"
                  type="MaterialIcons"
                  onPress={() => navigation.navigate('Địa chỉ')}
                />
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
                <Collapse>
                  <CollapseHeader>
                    <Separator
                      bordered
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: 50,
                        padding: -10,
                        margin: 0,
                      }}>
                      <Text>Chọn phương thức thanh toán</Text>
                      <Icon name="keyboard-arrow-down" type="MaterialIcons" />
                    </Separator>
                  </CollapseHeader>
                  <CollapseBody>
                    <ListItem>
                      <Icon
                        name="payment"
                        type="MaterialIcons"
                        style={{fontSize: 30}}
                      />
                      <Text style={{marginHorizontal: 10}}>
                        Thanh toán bằng ví Momo
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Icon
                        name="money"
                        type="FontAwesome"
                        style={{fontSize: 25}}
                      />
                      <Text style={{marginHorizontal: 10}}>
                        Thanh toán khi nhận hàng
                      </Text>
                    </ListItem>
                  </CollapseBody>
                </Collapse>
              </View>
            </View>
            {/* product */}
            {cart &&
              cart.map((ct, i) => (
                <View>
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
                        <TextInput placeholder="Nhập số lượng">
                          x {ct.amount}
                        </TextInput>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rowInput}>
                    {/* <Text>Tin nhắn:</Text>
                    <TextInput
                      placeholder="Lưu ý cho người bán ..."
                      style={{borderBottomWidth: 0.5, padding: 5}}
                    /> */}
                  </View>
                  <View style={styles.row}>
                    <Text style={{fontSize: 15}}>
                      Tổng số tiền ({ct.amount} sản phẩm):
                    </Text>
                    <Text
                      style={(styles.price, {fontSize: 14, color: 'purple'})}>
                      {ct.amount * ct.book.price} đ
                    </Text>
                  </View>
                </View>
              ))}
            {/* sumary */}
            <View>
              <View style={styles.row}>
                <Text>Tổng tiền hàng</Text>
                <Text style={(styles.price, {fontSize: 14, color: '#111'})}>
                  {total} đ
                </Text>
              </View>
              <View style={styles.row}>
                <Text>Tổng phí vận chuyển</Text>
                <Text style={(styles.price, {fontSize: 14, color: '#111'})}>
                  {ship} đ
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.sumary}>Tổng thanh toán</Text>
                <Text style={styles.sumary}>{total + ship} đ</Text>
              </View>
            </View>
            {/* btn payment */}
            <View style={styles.button}>
              <Button
                title="Đặt hàng"
                color="purple"
                hasTVPreferredFocus={true}
                onPress={order}
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
    borderBottomWidth: 1.2,
    borderBottomColor: 'purple',
  },
  location: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },
  icon: {
    color: 'purple',
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
  },
  product_name: {
    marginHorizontal: 20,
    width: '100%',
  },
  product_amount: {
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
    color: 'purple',
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
