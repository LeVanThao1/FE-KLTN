import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Icon, Text, View} from 'native-base';
import React, {memo, useContext} from 'react';
import {Alert, Image, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import {NOTIFI} from '../../../constants';
import {COLORS} from '../../../constants/themes';
import {DELETE_BOOK} from '../../../query/book';
import formatMoney from '../../../utils/format';
import {Notification} from '../../../utils/notifications';

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
            <Image
              style={{width: 80, height: 100}}
              source={{uri: book.images[0]}}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingHorizontal: 18,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.secondary,
              }}
              numberOfLines={1}>
              {book.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                color: COLORS.secondary,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'left',
                  color: COLORS.primary,
                }}>
                Số lượng x{book.amount}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'left',
                  color: COLORS.primary,
                }}>
                Giá {formatMoney(book.price)} VNĐ
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                textAlign: 'left',
                color: COLORS.secondary,
              }}>
              Tác giả: {book.author}
            </Text>

            <Text
              style={{
                fontSize: 12,
                textAlign: 'left',
                color: COLORS.secondary,
              }}>
              NXB:Kim Đồng
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontSize: 12, color: '#000000', width: '80%'}}
                numberOfLines={1}>
                Mô tả: {book.description}
              </Text>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 30,
                  marginTop: -10,
                  backgroundColor: COLORS.primary,
                }}
                onPress={() => onAlert(book.id)}>
                <Icon
                  name="delete"
                  type="MaterialIcons"
                  style={{
                    fontSize: 16,
                    color: COLORS.white,
                    textAlign: 'center',
                    alignItem: 'center',
                    top: '20%',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });
};

export default memo(Book);
