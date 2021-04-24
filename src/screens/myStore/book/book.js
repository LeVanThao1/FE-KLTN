import {Text, View} from 'native-base';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import All from './all';
import Processing from './processing';
import Comfirmed from './comfirmed';
import Done from './done';
import Waiting from './waiting';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity, Image} from 'react-native';

const Book = ({
  id,
  bookName = 'Nha gia kim',
  images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPvTGo1s3WBMeWc61fz_-3w5SNwLSa3KWcKXzc7__r&usqp=CAE&s',
  ],
  amount = 1,
  price = 30000,
  description = 'https://encryp ted-tbn0.gs tatic.com/i mages?q= tbn :AN d9Gc TPv TGo1s3WBMeWc61fz_-3w5SNwLSa3KWcKXzc7',
}) => {
  // const {} = route.param;

  return (
    <TouchableOpacity
      key={id}
      onPress={() => navigation.navigate('BookDetail', {id})}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          borderColor: '#696969',
          borderWidth: 0.2,
          borderRadius: 4,
          padding: 10,
          marginVertical: 8,
        }}>
        <View>
          <Image style={{width: 80, height: 100}} source={{uri: images[0]}} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 18,
          }}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}
            numberOfLines={1}>
            {bookName}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 14, textAlign: 'left'}}>
              Số lượng x{amount}
            </Text>
            <Text style={{fontSize: 14, textAlign: 'left'}}>Giá x{price}</Text>
          </View>
          <Text style={{fontSize: 14, textAlign: 'left'}}>
            Tác giả: Thái Bảo
          </Text>

          <Text style={{fontSize: 14, textAlign: 'left'}}>NXB:Kim Đồng</Text>

          <Text
            style={{flex: 1, fontSize: 14, color: '#000000'}}
            numberOfLines={1}>
            Mô tả: {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Book;
