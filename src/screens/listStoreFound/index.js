import {Icon} from 'native-base';
import React, {memo, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {queryData} from '../../common';
import {GET_STORES_LOCATION} from '../../query/store';
import StoreCart from './store';
import GetLocation from 'react-native-get-location';
import Toast from 'react-native-toast-message';
import {Notification} from '../../utils/notifications';
import {NOTIFI} from '../../constants';
const ListStoreFound = ({navigation}) => {
  const [stores, setStores] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        queryData(GET_STORES_LOCATION, {
          lng: location.longitude,
          lat: location.latitude,
        }).then(({data}) => {
          setStores(data.locationsStores);
          setLoading(false);
        });
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
        Toast.show(Notification(NOTIFI.error, message));
      });
  }, []);
  const renderStore = () => (
    <>
      {loading ? (
        <View style={{width: '100%', margin: 'auto', marginTop: 20}}>
          <Text style={{textAlign: 'center'}}>Đang quét</Text>
        </View>
      ) : stores.length > 0 ? (
        stores?.map((store, i) => (
          <StoreCart key={i} data={store} />
          // delete={onPress(book.id)}
        ))
      ) : (
        <View style={{padding: 20}}>
          <Text style={{textAlign: 'center'}}>
            Không có cửa hàng nào gần đây
          </Text>
        </View>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.orderContainer}>
        <ScrollView>{renderStore()}</ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  row: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f44f4f',
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
    color: '#f44f4f',
    borderBottomColor: '#f44f4f',
    borderBottomWidth: 2,
  },
  orderContainer: {
    flex: 1,
  },
});

export default memo(ListStoreFound);
