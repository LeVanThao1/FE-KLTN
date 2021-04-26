import {Text, View, Button, Icon} from 'native-base';
import React, {memo, useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DELETE_BOOK} from '../../../query/book';
import {useMutation} from '@apollo/client';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';

const Book = ({book}) => {
  return useObserver(() => {
    const {
      stores: {shop},
    } = useContext(MobXProviderContext);
    const {bookStore} = shop;
    const navigation = useNavigation();
    const [deleteBook, {dd, aa, ss, xx}] = useMutation(DELETE_BOOK, {
      onCompleted: async (data) => {
        console.log(bookStore.length);
        const newData = [...bookStore].filter(
          (bt) => bt.id + '' !== book.id + '',
        );
        shop.setBookStore([...newData]);
        // navigation.goBack();
      },
      onError: (err) => {
        console.log(err);
      },
    });

    //
    const onPressDelete = (value) => {
      console.log('value', value);
      deleteBook({
        variables: {
          id: value,
        },
      });
    };

    return (
      <TouchableOpacity
        // key={id}
        onPress={() =>
          navigation.navigate('BookDetail', {
            bookId: book.id,
            // bookName: book.name,
            // bookCategoryId: book.categoryId,
            // bookCategoryName: book.categoryName,
            // bookAuthor: book.author,
            // bookPublisher: book.publisher,
            // bookYear: book.year,
            // bookPrint: book.numberOfReprint,
            // bookPrice: book.price,
            // bookAmount: book.amount,
            // bookSold: book.sold,
            // bookDescription: book.description,
            // bookImg: book.images,
          })
        }>
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
              source={{uri: book.images}}
            />
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
                onPress={() => onPressDelete(book.id)}>
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
