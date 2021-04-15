import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Images from '../../assets/images/images';
import {Button, Icon, Text as TextNT} from 'native-base';
import {TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GET_BOOK, GET_BOOKS, GET_BOOKS_STORE} from '../../query/book';
import {useLazyQuery} from '@apollo/client';
const DetailProduct = ({navigation, route}) => {
  const {productId} = route.params;
  const [book, setBook] = useState(null);
  const [listItem, setListItem] = useState(null);
  const [getBook, {called, loading, data, error}] = useLazyQuery(GET_BOOK, {
    onCompleted: async (data) => {
      setBook(data.book);
      setListItem(
        data.book.store.books.map((ct, i) => ({
          id: ct.id,
          name: ct.book ? ct.book?.name : ct.name,
          price: ct.price,
          image: ct.book ? ct.book.images[0] : ct.images[0],
          selled: ct.amount,
        })),
      );
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    getBook({
      variables: {
        id: productId,
      },
    });
  }, [productId]);

  console.log(book);
  const [quantity, setQuantity] = React.useState(0);
  const [comment, onChangeComment] = React.useState('');
  // const images = [Images.onepiece1, Images.onepiece2];

  const renderProduct = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.list_product}
        onPress={() => navigation.push('Detail-Product', {productId: item.id})}>
        <Image
          source={{uri: item.image}}
          style={{width: 80, height: 100}}
          // onPress={() => ProductHandler()}
        />
        <View>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.content}>
            <Text style={{color: '#f57f1a', fontSize: 12}}>{item.price}đ</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {!loading && book && (
        <ScrollView>
          <View style={styles.slide__image_wrap}>
            <SliderBox
              style={styles.slide__image}
              images={[
                ...(book.images ? book.images : book.book.images),
                Images.onepiece1,
              ]}
              autoplay={true}
            />
          </View>
          <View style={styles.detail__content}>
            <View style={styles.detail__information}>
              <Text style={styles.detail__content_name}>
                {book.name ? book.name : book.book.name}
              </Text>
              <View style={styles.detail__content_price}>
                <Text style={styles.current__price}>{book.price}đ</Text>
                <Text style={styles.old__price}>500.000đ</Text>
              </View>
              <View style={styles.detail__content_rate}>
                <View style={styles.rate}>
                  <View style={styles.rate_start}>
                    <Icon
                      style={styles.icon__start}
                      name="star"
                      type="AntDesign"
                    />
                    <Icon
                      style={styles.icon__start}
                      name="star"
                      type="AntDesign"
                    />
                    <Icon
                      style={styles.icon__start}
                      name="star"
                      type="AntDesign"
                    />
                    <Icon
                      style={styles.icon__start}
                      name="star"
                      type="AntDesign"
                    />
                    <Icon
                      style={styles.icon__start}
                      name="star"
                      type="AntDesign"
                    />
                  </View>
                  <Text style={styles.rate_text}>4.8</Text>
                </View>
                <View style={styles.quantity_sold}>
                  <Text style={styles.quantity__sold_text}>{book.sold}</Text>
                  {/* sản phẩm được yêu thích */}
                  <Icon
                    style={[styles.icon__heart, styles.icon__heart_active]}
                    name="heart"
                    type="AntDesign"
                  />
                  {/* sản phẩm chưa được yêu thích */}
                  {/* <Icon
                  style={styles.icon__heart}
                  name="hearto"
                  type="AntDesign"
                /> */}
                </View>
              </View>
            </View>
            <View style={styles.detail__content_delivery}>
              <View style={styles.delivery__wrap}>
                <Icon
                  style={styles.delivery__icon}
                  name="rocket1"
                  type="AntDesign"
                />
                <Text>Phí vận chuyển : {0}đ</Text>
              </View>
              <View style={styles.delivery__wrap}>
                <Icon
                  style={styles.delivery__icon}
                  name="book"
                  type="AntDesign"
                />
                <Text>Trả hàng / Hoàn tiền trong 3 ngày</Text>
              </View>
            </View>
            <View style={styles.detail__buy_control}>
              <View style={styles.detail__buying}>
                <Text>Số lượng sẵn có : {book.amount}</Text>
                <View style={styles.product__quantity}>
                  <Button
                    style={styles.btn_quantity}
                    rounded
                    warning
                    onPress={() => setQuantity(quantity - 1)}>
                    <TextNT style={styles.btn__quantity_text}>-</TextNT>
                  </Button>
                  <TextInput
                    style={styles.input__quantity}
                    keyboardType="numeric"
                    value={quantity + ''}
                    // editable={false}
                    onChangeText={setQuantity}
                  />
                  <Button
                    style={styles.btn_quantity}
                    rounded
                    warning
                    onPress={() => setQuantity(quantity + 1)}>
                    <TextNT style={styles.btn__quantity_text}>+</TextNT>
                  </Button>
                </View>
              </View>
              <View style={styles.control__buy_action}>
                <Button style={styles.store__btn} bordered warning>
                  <TextNT style={styles.buy__action_text}>
                    Thêm vào giỏ hàng
                  </TextNT>
                </Button>
                <Button style={styles.store__btn} bordered warning>
                  <TextNT style={styles.buy__action_text}>Mua ngay</TextNT>
                </Button>
              </View>
            </View>
            <View style={styles.detail__store}>
              <View style={styles.detail__store_info}>
                <View style={styles.store__header}>
                  <View style={styles.store__wrapper}>
                    <Image
                      style={styles.store__avatar}
                      source={{
                        uri: book.store.avatar,
                      }}
                    />
                    <Text style={styles.store__name}>{'AppStore'}</Text>
                  </View>
                  <Button
                    style={styles.btn__view_store}
                    bordered
                    warning
                    onPress={() => navigation.navigate('/')}>
                    <TextNT style={styles.buy__action_text}>Xem Shop</TextNT>
                  </Button>
                </View>
                <View style={styles.store__statistical}>
                  <View style={styles.store__statistical_wrap}>
                    <Text style={styles.store__statistical_text}>
                      {book.store.books.length}
                    </Text>
                    <Text style={styles.store__statistical_code}>Sản phẩm</Text>
                  </View>
                  <Text style={styles.separator}>|</Text>
                  <View style={styles.store__statistical_wrap}>
                    <Text style={styles.store__statistical_text}>4.7</Text>
                    <Text style={styles.store__statistical_code}>Đánh giá</Text>
                  </View>
                  <Text style={styles.separator}>|</Text>
                  <View style={styles.store__statistical_wrap}>
                    <Text style={styles.store__statistical_text}>91%</Text>
                    <Text style={styles.store__statistical_code}>
                      Phản hồi chat
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.store__products}>
                <View style={styles.store__products_header}>
                  <Text>Các sản phẩm khác của shop</Text>
                  <Text style={styles.buy__action_text}>Xem tất cả</Text>
                </View>
                <View style={styles.store__products_list}>
                  <FlatList
                    //   style={styles.flat_list}
                    data={listItem && listItem}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                  />
                </View>
              </View>
            </View>
            <View style={styles.detail__book_description}>
              <Text style={styles.detail__book_description_title}>
                Chi tiết sản phẩm
              </Text>
              <View style={styles.detail__book_description_wrap}>
                <Text style={styles.book_description_text}>Nhà xuất bản</Text>
                <Text>
                  {book.publisher ? book.publisher : book.book.publisher}
                </Text>
              </View>
              <View style={styles.detail__book_description_wrap}>
                <Text style={styles.book_description_text}>Tác giả</Text>
                <Text>
                  {book.publisher ? book.publisher : book.book.publisher}
                </Text>
              </View>
              <View style={styles.detail__book_description_wrap}>
                <Text style={styles.book_description_text}>Năm xuất bản</Text>
                <Text>{book.year ? book.year : book.book.year}</Text>
              </View>
              <Text style={styles.book_description}>
                {book.description ? book.description : book.book.description}
              </Text>
            </View>
            <View style={styles.detail__book_rate}>
              <Text style={styles.detail__book_description_title}>
                Đánh giá sản phẩm
              </Text>
              <View style={[styles.rate, styles.rate__start_wrap]}>
                <View style={styles.rate_start}>
                  <Icon
                    style={styles.icon__start}
                    name="staro"
                    type="AntDesign"
                  />
                  <Icon
                    style={styles.icon__start}
                    name="staro"
                    type="AntDesign"
                  />
                  <Icon
                    style={styles.icon__start}
                    name="staro"
                    type="AntDesign"
                  />
                  <Icon
                    style={styles.icon__start}
                    name="staro"
                    type="AntDesign"
                  />
                  <Icon
                    style={styles.icon__start}
                    name="staro"
                    type="AntDesign"
                  />
                </View>
                <Text>Đánh giá của bạn</Text>
              </View>
              <View style={styles.detail__book_commnet}>
                <TextInput
                  style={styles.comment}
                  value={comment}
                  // editable={false}
                  placeholder="Nhập bình luận của bạn"
                  onChangeText={onChangeComment}
                />
                <Button
                  style={[styles.btn__view_store, styles.btn_comment]}
                  rounded
                  warning
                  onPress={() => navigation.navigate('/')}>
                  <TextNT style={styles.btn_comment_text}>Bình luận</TextNT>
                </Button>
              </View>
              <View style={styles.book__comment_wrap}>
                <View style={styles.comment__user}>
                  <View style={styles.store__wrapper}>
                    <Image
                      style={styles.user__avatar}
                      source={{
                        uri:
                          'https://theme.hstatic.net/1000361048/1000460005/14/slideshow_3.jpg?v=444',
                      }}
                    />
                    <Text style={styles.user__name}>{'AppStore'}</Text>
                  </View>
                  <Text style={styles.comment__user_content}>
                    Sách hay lắm bạn
                  </Text>
                  <Text style={styles.comment__user_date}>05/04/2021</Text>
                </View>
                <View style={styles.comment__user}>
                  <View style={styles.store__wrapper}>
                    <Image
                      style={styles.user__avatar}
                      source={{
                        uri:
                          'https://theme.hstatic.net/1000361048/1000460005/14/slideshow_3.jpg?v=444',
                      }}
                    />
                    <Text style={styles.user__name}>{'AppStore'}</Text>
                  </View>
                  <Text style={styles.comment__user_content}>
                    Sách hay lắm bạn
                  </Text>
                  <Text style={styles.comment__user_date}>05/04/2021</Text>
                </View>
                <View style={styles.comment__user}>
                  <View style={styles.store__wrapper}>
                    <Image
                      style={styles.user__avatar}
                      source={{
                        uri:
                          'https://theme.hstatic.net/1000361048/1000460005/14/slideshow_3.jpg?v=444',
                      }}
                    />
                    <Text style={styles.user__name}>{'AppStore'}</Text>
                  </View>
                  <Text style={styles.comment__user_content}>
                    Sách hay lắm bạn
                  </Text>
                  <Text style={styles.comment__user_date}>05/04/2021</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#f6f6f6',
  },
  slide__image_wrap: {
    width: '100%',
    backgroundColor: 'white',
    height: 280,
  },
  detail__content: {
    // paddingTop: 10,
  },
  detail__information: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  detail__content_name: {
    fontSize: 16,
  },
  detail__content_price: {
    marginVertical: 8,
  },
  current__price: {
    color: '#ee4d2d',
    fontSize: 14,
  },
  old__price: {
    textDecorationLine: 'line-through',
    fontWeight: '300',
    color: '#414141',
  },
  detail__content_rate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '34%',
    justifyContent: 'space-between',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    paddingRight: 5,
  },
  rate_start: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity_sold: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'space-between',
  },
  icon__start: {
    fontSize: 16,
    color: '#ffe31b',
  },
  icon__heart: {
    fontSize: 16,
  },
  icon__heart_active: {
    color: '#e21f1f',
  },
  detail__content_delivery: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  delivery__wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  delivery__icon: {
    fontSize: 16,
    paddingRight: 4,
    color: 'green',
  },
  detail__store: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 10,
  },
  detail__store_info: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  store__header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  store__wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  store__avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 5,
  },
  detail__buy_control: {
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  detail__buying: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  product__quantity: {
    flexDirection: 'row',
    // width: '40%',
    marginTop: 5,
    alignItems: 'center',
  },
  input__quantity: {
    width: 30,
    marginHorizontal: 2,
  },
  btn_quantity: {
    width: 40,
    height: '80%',
  },
  btn__quantity_text: {
    color: 'white',
  },
  buy__action_text: {
    color: '#f57f1a',
  },
  control__buy_action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  store__btn: {
    height: 34,
  },
  btn__view_store: {
    height: 28,
    marginTop: 6,
  },
  store__statistical: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  store__statistical_text: {
    color: '#ee4d2d',
  },
  store__statistical_code: {
    color: '#757575',
  },
  store__products_list: {
    flexDirection: 'row',
  },
  list_product: {
    width: 100,
    height: 150,
    padding: 5,
    margin: 4,
    alignItems: 'center',
    borderWidth: 0.2,
    borderRadius: 6,
  },
  store__products_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  store__products: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 5,
  },
  detail__book_description: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  detail__book_description_title: {
    paddingVertical: 4,
    borderBottomColor: '#888',
    borderBottomWidth: 1,
  },
  detail__book_description_wrap: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 2,
  },
  book_description_text: {
    width: '40%',
    marginRight: 10,
    fontWeight: '200',
    color: '#555',
  },
  book_description: {
    color: 'black',
  },
  detail__book_rate: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  rate__start_wrap: {
    width: '60%',
    borderRightWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  detail__book_commnet: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  comment: {
    flex: 1,
  },
  btn_comment: {
    width: 60,
  },
  btn_comment_text: {
    fontSize: 8,
  },
  user__avatar: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginRight: 5,
  },
  comment__user: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  comment__user_content: {
    fontSize: 12,
    marginLeft: 25,
  },
  comment__user_date: {
    fontSize: 10,
    marginLeft: 25,
  },
});

export default DetailProduct;
