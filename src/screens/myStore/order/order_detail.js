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
  RefreshControl,
  Alert,
} from 'react-native';
import {mutateData, queryData} from '../../../common';
import {UPDATE_STATUS_ORDER} from '../../../query/order';
import Toast from 'react-native-toast-message';
import {Notification} from '../../../utils/notifications';
import {NOTIFI} from '../../../constants';
import {COLORS} from '../../../constants/themes';
import formatMoney from '../../../utils/format';

// import {GET_SUB_ORDER} from '../../query/subOrder';

const OrderDetailStore = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {user, shop, order},
    } = useContext(MobXProviderContext);
    const {orderStore, setOrderStore} = shop;
    const {infoOrder, setInfoOrder} = order;
    const [subOrder, setSubOrder] = useState({});
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true);

    console.log('order', infoOrder.map(o => o.detail));

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
      if (stt === 'CANCEL') {
        resultStt = 'CANCEL';
      }
      return resultStt;
    };

    const onAlert = () => {
      Alert.alert('Đồng ý chuyển trạng thái ?', 'Lựa chọn', [
        {text: 'Đồng ý', onPress: () => changeStatus()},
        {text: 'Hủy'},
      ]);
    };

    const onAlertCancel = () => {
      Alert.alert('Đồng ý hủy đơn hàng ?', 'Lựa chọn', [
        {text: 'Đồng ý', onPress: () => CancelOrder()},
        {text: 'Hủy'},
      ]);
    };

    const [updateStatusSubOrder] = useMutation(UPDATE_STATUS_ORDER, {
      onCompleted: async (data) => {
        console.log('dataa' ,data);
        console.log(infoOrder)
        const newData = [...infoOrder].filter(
          (od) => od.id + '' !== orderStore.id + '',
        );
        console.log('data update stt', newData);
        setInfoOrder([infoOrder, ...newData]);
        Toast.show(
          Notification(
            NOTIFI.success,
            `Chuyển đơn trạng thái đơn hàng thành công`,
          ),
        );
      },
      onError: (err) => {
        Toast.show(Notification(NOTIFI.error, err.message));
        console.log(err);
      },
    });

    const CancelOrder = () => {
      updateStatusSubOrder({
        variables: {
          dataStatus: 'CANCLE',
          id: orderStore.id,
        },
      });
      const newData = [...infoOrder].filter(
        (od) => od.id + '' !== orderStore.id + '',
      );
      console.log('data update stt', newData);
      setInfoOrder([infoOrder, ...newData]);
      navigation.navigate('OrdersByStore');
    };

    const changeStatus = () => {
      updateStatusSubOrder({
        variables: {
          dataStatus: nextStatus(orderStore.status),
          id: orderStore.id,
        },
      });
      const newData = [...infoOrder].filter(
        (od) => od.id + '' !== orderStore.id + '',
      );
      console.log('data update stt', newData);
      setInfoOrder([infoOrder, ...newData]);
      navigation.navigate('OrdersByStore');
    };

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
              }}
            />
          }>
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
              style={{
                flex: 1,
                justifyContent: 'space-between',
                padding: 8,
                paddingVertical: 0,
              }}>
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 14, color: '#333333'}}>
                  {orderStore?.createdAt.slice(0, 10)}
                </Text>
                <Text style={{fontSize: 14, textAlign: 'right'}}>
                  x {orderStore?.detail?.amount}
                </Text>
              </View>

              {/* <Text style={{fontSize: 14, textAlign: 'right', marginBottom: 8}}>
                x {orderStore?.detail?.amount}
              </Text> */}
              <Text style={{fontSize: 14, textAlign: 'right'}}>
                Giá: {formatMoney(orderStore?.detail?.price)} VNĐ
              </Text>
              <Text style={{fontSize: 14, textAlign: 'right', marginBottom: 5}}>
                Phí vận chuyển: {formatMoney(orderStore?.ship || 0)} VNĐ
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  textAlign: 'right',
                }}>
                Thành tiền:{' '}
                {formatMoney(
                  orderStore?.detail?.price * orderStore?.detail?.amount +
                    (orderStore?.ship || 0),
                )}{' '}
                VNĐ
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
            <Text style={{width: '50%'}}>Trạng thái đơn hàng</Text>
            <Text style={{paddingVertical: 20, paddingLeft: 30}}>
              {orderStore?.status}
            </Text>
          </View>
         { orderStore?.status !== 'CANCLE' ? <><View
            style={{
              // paddingVertical: 20,
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <Text style={{width: '50%'}}>Trạng thái kế tiếp</Text>
            <Text style={{paddingVertical: 20, paddingLeft: 30}}>
              {nextStatus(orderStore?.status)}
            </Text>
          </View> 
          <TouchableOpacity onPress={onAlert}>
              <Text
                style={{
                  color: '#fff',
                  backgroundColor: COLORS.primary,
                  textAlign: 'center',
                  width: '50%',
                  alignSelf: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  marginVertical: 15,
                  borderRadius: 4,
                }}>
                Trạng thái tiếp theo
              </Text>
            </TouchableOpacity>
          </>
          : <></>}
          
          <View style={{paddingVertical: 20}}>
            {/* {orderStore.status !== 'CANCLE' ?} */}
            {orderStore?.status === 'WAITING' ?
              <TouchableOpacity onPress={onAlertCancel}>
                <Text
                  style={{
                    color: '#fff',
                    backgroundColor: COLORS.primary,
                    textAlign: 'center',
                    width: '50%',
                    alignSelf: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    // marginVertical: 15,
                    borderRadius: 4,
                  }}>
                  Hủy đơn hàng
                </Text>
              </TouchableOpacity>
              : <></>
            }            
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
