import {useLazyQuery, useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXProviderContext, useObserver} from 'mobx-react';
import React, {useContext, useState, useEffect} from 'react';
import {Icon} from 'native-base';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {ORDERS_BY_STORE} from '../../../query/order';
import {queryData} from '../../../common';

const OrdersByStore = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {user, shop},
    } = useContext(MobXProviderContext);
    const {orderStore, setOrderStore} = shop;
    const [selectedStatus, setSelectedStatus] = useState('WAITING');
    const [subOrders, setSubOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
      queryData(ORDERS_BY_STORE)
        .then(({data}) => {
          setSubOrders(data.subOrdersByStore);
          setLoading(false);
          setRefreshing(true);
        })
        .catch((err) => console.log(err));
    }, [refreshing]);

    useEffect(() => {
      // console.log('selectedStatus', selectedStatus);
    }, [selectedStatus]);

    const renderSubOrders = () => {
      console.log(selectedStatus);
      return subOrders
        ?.filter((so) => so.status === selectedStatus)
        .map((so) => <SubOrder {...so} order={so} key={so.id} />);
      // console.log('sub order ..', x);
    };

    function Tab({name, status}) {
      return (
        <TouchableOpacity onPress={() => setSelectedStatus(status)}>
          <Text
            style={status == selectedStatus ? styles.tabSelected : styles.tab}>
            {name}
          </Text>
        </TouchableOpacity>
      );
    }

    function SubOrder({order}) {
      console.log('=====', order);
      return (
        <TouchableOpacity
          onPress={() => {
            setOrderStore(order);
            navigation.navigate('OrderDetailStore');
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              borderColor: '#696969',
              borderWidth: 0.2,
              borderRadius: 4,
              padding: 10,
              marginBottom: 8,
              backgroundColor: '#ffffff',
            }}>
            <View>
              <Image
                style={{width: 100, height: 120}}
                source={{uri: order?.detail?.book?.images?.[0]}}
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'space-between', padding: 8}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#000000'}}
                numberOfLines={1}>
                {order.user.name}
              </Text>
              <Text style={{fontSize: 14, textAlign: 'right'}}>
                x {order.detail.amount}
              </Text>
              <Text
                style={{fontSize: 14, color: '#000000', textAlign: 'right'}}>
                Đơn giá {order.detail.price}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {/* <Text style={{fontSize: 14, color: '#333333'}}>
                  Ngày đặt hàng {order.createdAt.slice(0, 10)}
                </Text> */}
                <Text style={{fontSize: 16, color: 'rgba(68, 108, 179, 1)'}}>
                  Tổng tiền {order.detail.amount * order.detail.price}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.searchGroup}>
            <Icon name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Nhập mã đơn hàng"
            />
          </View>
        </View>
        <View style={{height: 46, backgroundColor: '#ffffff'}}>
          <ScrollView horizontal>
            <Tab name="Đang chờ" status="WAITING" />
            <Tab name="Đã xác nhận" status="CONFIRMED" />
            <Tab name="Đang xử lý" status="PROCESSING" />
            <Tab name="Đã giao" status="DONE" />
            <Tab name="Đã hủy" status="CANCLE" />
          </ScrollView>
        </View>
        <View style={styles.orderContainer}>
          <ScrollView>{renderSubOrders()}</ScrollView>
        </View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',

    // alignItems: 'center',
  },
  row: {
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(68, 108, 179, 1)',
  },
  searchGroup: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  searchInput: {
    height: 35,
    width: '100%',
    color: '#111',
    backgroundColor: '#fff',
    paddingLeft: 40,
    fontSize: 16,
    padding: 0,
    borderRadius: 6,
  },
  searchIcon: {
    position: 'absolute',
    left: 8,
    zIndex: 1,
    opacity: 0.4,
    fontSize: 24,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2,
  },
  tabSelected: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: 'rgba(68, 108, 179, 1)',
    borderBottomColor: 'rgba(68, 108, 179, 1)',
    borderBottomWidth: 2,
  },
  orderContainer: {
    flex: 1,
    padding: 12,
  },
});

export default OrdersByStore;
