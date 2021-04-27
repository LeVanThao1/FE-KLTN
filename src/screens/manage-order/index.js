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
import {GET_SUB_ORDERS} from '../../query/subOrder';

const ManageOrder = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {user},
    } = useContext(MobXProviderContext);
    const [selectedStatus, setSelectedStatus] = useState('WAITING');
    const [subOrders, setSubOrders] = useState([]);

    const [getSubOrders, {called, loading, data, error}] = useLazyQuery(
      GET_SUB_ORDERS,
      {
        onCompleted: async (data) => {
          const {subOrdersByUser} = data;
          console.log('subOrdersByUser', subOrdersByUser);
          setSubOrders(
            subOrdersByUser.map(
              ({
                id,
                detail: {
                  book: {name, images},
                  amount,
                  price,
                },
                status,
              }) => ({id, name, images, amount, price, status}),
            ),
          );
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );

    useEffect(() => {
      getSubOrders();
    }, []);

    useEffect(() => {
      console.log('selectedStatus', selectedStatus);
    }, [selectedStatus]);

    const renderSubOrders = () => {
      return subOrders
        .filter((so) => so.status === selectedStatus)
        .map((so) => <SubOrder {...so} key={so.id} />);
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

    function SubOrder({
      id,
      name = 'quang',
      images = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPvTGo1s3WBMeWc61fz_-3w5SNwLSa3KWcKXzc7__r&usqp=CAE&s',
      ],
      amount = 1,
      price = 100000,
    }) {
      return (
        <TouchableOpacity
          key={id}
          onPress={() => navigation.navigate('OrderDetail', {id})}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              borderColor: '#696969',
              borderWidth: 0.2,
              borderRadius: 4,
              padding: 10,
              marginBottom: 8,
              backgroundColor: "#ffffff"
            }}>
            <View>
              <Image
                style={{width: 80, height: 100}}
                source={{uri: images[0]}}
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'space-between', padding: 8}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#000000'}}
                numberOfLines={1}>
                {name}
              </Text>
              <Text style={{fontSize: 14, textAlign: 'right'}}>x {amount}</Text>
              <Text
                style={{fontSize: 14, color: '#000000', textAlign: 'right'}}>
                Thành tiền: {price}
              </Text>
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
        <View style={{height: 46, backgroundColor: "#ffffff"}}>
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
    backgroundColor: "#ededed"

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
    padding: 12
  },
});

export default ManageOrder;
