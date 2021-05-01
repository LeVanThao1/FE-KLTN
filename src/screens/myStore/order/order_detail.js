import {useLazyQuery, useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext, useObserver} from 'mobx-react';
import React, {useContext, useState, useEffect} from 'react';
import {Icon} from 'native-base';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {queryData} from '../../../common';
// import {GET_SUB_ORDER} from '../../query/subOrder';

const OrderDetailStore = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {user, shop},
    } = useContext(MobXProviderContext);
    console.log('order-detail route', route);
    const {orderStore, setOrderStore} = shop;
    const [subOrder, setSubOrder] = useState({});
    console.log('order store detail', orderStore);
    // const [getSubOrder, {called, loading, data, error}] = useLazyQuery(
    //   GET_SUB_ORDER,
    //   {
    //     onCompleted: async (data) => {
    //       // console.log(data.subOrderByUser);
    //       setSubOrder(data.subOrderByUser);
    //     },
    //     onError: (err) => {
    //       console.log(err);
    //     },
    //   },
    // );

    // useEffect(() => {
    //   queryData(subOrderByStore, {id: id})
    // })

    // useEffect(() => {
    //   getSubOrder({
    //     variables: {
    //       // id: route.params.id,
    //     },
    //   });
    // }, []);

    const nextStatus = (stt) => {
      let resultStt = '';
      if (stt === 'WAITING') {
        resultStt = 'CONFIRMED';
      }
      if (stt === 'CONFIRMED') {
        resultStt = 'PROCESSING';
      }
      if (stt === 'PROCESSING') {
        resultStt = 'DONE';
      }
      return resultStt;
    };

    // const changeStatus = () => {
    //   setOrderStore({
    //     ...orderStore,
    //     status: nextStatus(status),
    //   });
    // };

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{marginBottom: 16}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
              Địa chỉ nhận hàng
            </Text>
            <Text style={{fontSize: 16, marginBottom: 8}}>
              {orderStore?.user?.name}
            </Text>
            <Text style={{fontSize: 16, marginBottom: 8}}>
              (+84) {orderStore?.phone}
            </Text>
            <Text style={{fontSize: 16, marginBottom: 8}}>
              {orderStore?.address}
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
                source={{uri: orderStore?.detail?.book?.images[0]}}
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
                {orderStore?.detail?.book?.name}
              </Text>
              <Text style={{fontSize: 14, textAlign: 'right', marginBottom: 8}}>
                x {orderStore?.detail?.amount}
              </Text>
              <Text style={{fontSize: 14, textAlign: 'right', marginBottom: 8}}>
                Giá: {orderStore?.detail?.price}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: 'rgba(68, 108, 179, 1)',
                  textAlign: 'right',
                }}>
                Thành tiền:{' '}
                {orderStore?.detail?.price * orderStore?.detail?.amount}
              </Text>
            </View>
          </View>
          <View
            style={{
              // paddingVertical: 20,
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <Text>Trạng thái đơn hàng</Text>
            <Text style={{paddingVertical: 20, paddingLeft: 30}}>
              {orderStore?.status}
            </Text>
          </View>
          <View
            style={{
              // paddingVertical: 20,
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <Text>Trạng thái kế tiếp</Text>
            <Text style={{paddingVertical: 20, paddingLeft: 30}}>
              {nextStatus(orderStore?.status)}
            </Text>
          </View>
          <View style={{paddingVertical: 20}}>
            <TouchableOpacity onPress={changeStatus}>
              <Text
                style={{
                  color: '#fff',
                  backgroundColor: 'rgba(68, 108, 179, 1)',
                  textAlign: 'center',
                  width: '40%',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                Chuyển trạng thái
              </Text>
            </TouchableOpacity>
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

export default OrderDetailStore;
