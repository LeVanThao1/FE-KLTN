import {useLazyQuery, useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext, useObserver} from 'mobx-react';
import React, {useContext, useState, useEffect} from 'react';
import {Icon} from 'native-base';

import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {GET_SUB_ORDER} from '../../query/subOrder';
import {Notification} from '../../utils/notifications';
import Toast from 'react-native-toast-message';
import {COLORS, NOTIFI} from '../../constants';
import formatMoney from '../../utils/format';

const OrderDetail = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {user},
    } = useContext(MobXProviderContext);
    const [subOrder, setSubOrder] = useState({});

    const [getSubOrder, {called, loading, data, error}] = useLazyQuery(
      GET_SUB_ORDER,
      {
        onCompleted: async (data) => {
          setSubOrder(data.subOrderByUser);
        },
        onError: (err) => {
          Toast.show(Notification(NOTIFI.error, err.message));
          console.log(err);
        },
      },
    );

    useEffect(() => {
      getSubOrder({
        variables: {
          id: route.params.id,
        },
      });
    }, []);

    useEffect(() => {}, [subOrder]);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{marginBottom: 16}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
              Địa chỉ nhận hàng
            </Text>
            <Text style={{fontSize: 16, marginBottom: 8}}>
              {subOrder?.user?.name}
            </Text>
            <Text style={{fontSize: 16, marginBottom: 8}}>
              (+84) {subOrder.phone}
            </Text>
            <Text style={{fontSize: 16, marginBottom: 8}}>
              {subOrder.address}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              borderColor: '#696969',
              borderWidth: 0.2,
              borderRadius: 4,
              padding: 10,
              marginVertical: 8,
              backgroundColor: '#ffffff',
            }}>
            <View>
              <Image
                style={{width: 90, height: 120}}
                source={{uri: subOrder?.detail?.book?.images[0]}}
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'space-between', padding: 8}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: 8,
                }}
                numberOfLines={1}>
                {subOrder?.detail?.book?.name}
              </Text>
              <Text style={{fontSize: 14, textAlign: 'right', marginBottom: 8}}>
                x {subOrder?.detail?.amount}
              </Text>
              <Text style={{fontSize: 14, textAlign: 'right', marginBottom: 8}}>
                Giá: {formatMoney(subOrder?.detail?.price || 0)} VNĐ
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  textAlign: 'right',
                }}>
                Thành tiền:{' '}
                {formatMoney(
                  subOrder?.detail?.price * subOrder?.detail?.amount || 0,
                )}{' '}
                VNĐ
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default OrderDetail;
