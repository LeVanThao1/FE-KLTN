import {Text, View, Button, Icon} from 'native-base';
import React, {memo, useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity, Image, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DELETE_BOOK} from '../../../query/book';
import {useMutation} from '@apollo/client';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import Toast from 'react-native-toast-message';
import {NOTIFI} from '../../../constants';
import {Notification} from '../../../utils/notifications';
import {COLORS} from '../../../constants/themes';


const Book = ({book}) => {
  return useObserver(() => {
    const {
      stores: {shop, user, comment},
    } = useContext(MobXProviderContext);
    const {bookStore} = shop;
    const {bookComment, setBookComment} = comment;
    const {bookCurrent, setBookCurrent} = user;
    const navigation = useNavigation();
    const [deleteBook, {dd, aa, ss, xx}] = useMutation(DELETE_BOOK, {
      onCompleted: async (data) => {
        const newData = [...bookStore].filter(
          (bt) => bt.id + '' !== book.id + '',
        );
        shop.setBookStore([...newData]);
        Toast.show(Notification(NOTIFI.success, 'Xóa thành công'));
        // navigation.goBack();
      },
      onError: (err) => {
        Toast.show(Notification(NOTIFI.error, err.message));
        console.log(err);
      },
    });

    const onAlert = (value) => {
      Alert.alert('Đồng ý xóa ?', 'Lựa chọn', [
        {text: 'Đồng ý', onPress: () => onPressDelete(value)},
        {text: 'Hủy'},
      ]);
    };
    const onPressDelete = (value) => {
      deleteBook({
        variables: {
          id: value,
        },
      });
    };
    return (
      <TouchableOpacity
        // key={id}
        onPress={() => {
          user.setBookCurrent(book);
          setBookComment(book.comment);
          navigation.navigate('BookDetail', {
            book: book,
          });
        }}>
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
            {book.images.map((img, i) => (
              <Image
              style={{width: 80, height: 100}}
              source={{
                uri: img
                  ? img
                  : 'https://picsum.photos/200/300',
              }}
            />
            ))}            
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
              {book.name}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 14, textAlign: 'left'}}>
                Số lượng x{book.amount}
              </Text>
              <Text style={{fontSize: 14, textAlign: 'left'}}>
                Giá x{book.price}
              </Text>
            </View>
            <Text style={{fontSize: 14, textAlign: 'left'}}>
              Tác giả: {book.author}
            </Text>

            <Text style={{fontSize: 14, textAlign: 'left'}}>NXB:Kim Đồng</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontSize: 14, color: '#000000', width: '80%'}}
                numberOfLines={1}>
                Mô tả: {book.description}
              </Text>
              <Button
                style={{width: 50, height: 30, marginTop: -10}}
                onPress={() => onAlert(book.id)}>
                <Icon
                  name="delete"
                  type="MaterialIcons"
                  style={{
                    width: 15,
                    height: 15,
                    textAlign: 'center',
                    padding: 0,
                  }}
                />
              </Button>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });
};

export default memo(Book);
