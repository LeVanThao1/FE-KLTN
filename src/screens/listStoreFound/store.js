import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'native-base';
import React, {memo} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get('screen');
const StoreCart = ({data}) => {
  const navigation = useNavigation();
  const {store, distance} = data;
  return (
    <TouchableOpacity
      // key={id}

      style={styles.storeContainer}
      onPress={() => {
        navigation.navigate('StoreDetail', {
          id: store.id,
        });
      }}>
      <Image
        style={{width: 80, height: 80, borderRadius: 80}}
        source={{
          uri: store.avatar || 'https://picsum.photos/200/300',
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          width: width - 150,
          marginLeft: 10,
          justifyContent: 'space-around',
        }}>
        <View style={{justifyContent: 'space-between'}}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}
            numberOfLines={1}>
            {store.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 14, marginRight: 15}} numberOfLines={2}>
            {store.address}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#f44f4f',
              fontWeight: 'bold',
              textAlign: 'right',
            }}>
            {distance} km
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(StoreCart);

const styles = StyleSheet.create({
  storeContainer: {
    width: Dimensions.get('screen').width - 0,
    flexDirection: 'row',
    borderColor: '#696969',
    borderWidth: 0.2,
    borderRadius: 4,
    padding: 10,
    marginVertical: 8,
  },
});
