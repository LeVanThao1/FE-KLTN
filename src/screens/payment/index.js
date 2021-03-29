import React, {memo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  Button,
} from 'react-native';
import {Icon, ListItem, Separator} from 'native-base';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Images from '../../assets/images/images';
import Address from './address';

const Payment = ({navigation}) => {
  const [add, setAdd] = useState('');

  const order = () => {
    console.log('order');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container_payment}>
          {/* address */}
          <View style={styles.address}>
            <View style={styles.location}>
              <Icon name="location" style={styles.icon} />
              <Text style={styles.text}>
                Địa chỉ nhận hàng {add ? ' - Vui lòng chọn địa chỉ' : ''}
              </Text>
            </View>
            <View>
              <Icon
                name="keyboard-arrow-right"
                type="MaterialIcons"
                onPress={() => navigation.navigate(<Address />)}
              />
            </View>
          </View>
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
          <View>
            <View style={styles.product}>
              <Image
                source={Images.onepiece1}
                style={{width: 55, height: 70}}
              />
              <View style={styles.product_name}>
                <Text>One piece ở Wano</Text>
                <View style={styles.product_amount}>
                  <Text>Giá: 15000 đ</Text>
                  <TextInput placeholder="Nhập số lượng">x 4</TextInput>
                </View>
              </View>
            </View>
            <View style={styles.rowInput}>
              <Text>Tin nhắn:</Text>
              <TextInput
                placeholder="Lưu ý cho người bán ..."
                style={{borderBottomWidth: 0.5, padding: 5}}
              />
            </View>
            <View style={styles.row}>
              <Text style={{fontSize: 15}}>Tổng số tiền (0 sản phẩm):</Text>
              <Text style={(styles.price, {fontSize: 14, color: 'purple'})}>
                100000 đ
              </Text>
            </View>
          </View>
          {/* sumary */}
          <View>
            <View style={styles.row}>
              <Text>Tổng tiền hàng</Text>
              <Text style={(styles.price, {fontSize: 14, color: '#111'})}>
                100000 đ
              </Text>
            </View>
            <View style={styles.row}>
              <Text>Tổng phí vận chuyển</Text>
              <Text style={(styles.price, {fontSize: 14, color: '#111'})}>
                18.000 đ
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.sumary}>Tổng thanh toán</Text>
              <Text style={styles.sumary}>100000 đ</Text>
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
