import React, {useContext, useEffect, useState} from 'react';
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
import {useLazyQuery, useMutation} from '@apollo/client';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {ADD_TO_LIKE, REMOVE_TO_LIKE, UPDATE_CART} from '../../query/user';

const DetailProduct = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {user},
    } = useContext(MobXProviderContext);
    const {cart, setCart, likes, addToLike, removeToLike} = user;
    const {productId} = route.params;
    const [book, setBook] = useState(null);
    const [listItem, setListItem] = useState([]);
    const [isHeart, setIsHeart] = useState(
      likes && likes.filter((lk) => lk.id + '' === productId + '').length > 0,
    );
    const [addLike] = useMutation(ADD_TO_LIKE, {
      onCompleted: () => {
        addToLike({
          id: productId,
          name: book.name || null,
          images: book.images || null,
          price: book.price,
          amount: book.amount,
          sold: book.sold,
          book: book.book
            ? {
                id: book.book.id,
                name: book.book.name,
                images: book.book.images,
              }
            : null,
        });
      },
      onError: (err) => console.log(err),
    });

    const [removeLike] = useMutation(REMOVE_TO_LIKE, {
      onCompleted: () => {
        removeToLike(productId);
      },
      onError: (err) => console.log(err),
    });
    const [getBook, {called, loading, data, error}] = useLazyQuery(GET_BOOK, {
      onCompleted: async (data) => {
        console.log("quanggggggggg",data);
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

    const [updateCart, {load}] = useMutation(UPDATE_CART, {
      onCompleted: async (dt) => {
        console.log('dt', dt);
        setCart(dt.updateCart);
      },
      onError: (err) => {
        console.log(err);
      },
    });

    const likeProduct = () => {
      if (isHeart) {
        setIsHeart(false);
        removeLike({
          variables: {
            id: productId,
          },
        });
      } else {
        setIsHeart(true);
        addLike({
          variables: {
            id: productId,
          },
        });
      }
    };
    const [quantity, setQuantity] = React.useState(1);
    const [comment, onChangeComment] = React.useState('');
    const addToCart = () => {
      const found = cart.some((ct) => ct.book.id + '' === productId + '');
      if (found) {
        const dataCart = [...cart].map((ct) => {
          let tamp = {
            book: productId,
            price: book.price,
            amount: ct.amount,
          };
          // tamp
          if (ct.book.id + '' === productId + '') {
            tamp.amount = ct.amount + quantity;
          }
          return tamp;
        });
        updateCart({
          variables: {
            dataCart,
          },
        });
      } else {
        const newBook = {
          book: productId,
          price: book.price,
          amount: quantity,
        };
        const cartData = [...cart].map((ct) => {
          return {
            book: ct.book.id,
            price: ct.price,
            amount: ct.amount,
          };
        });
        updateCart({
          variables: {
            dataCart: [newBook, ...cartData],
          },
        });
      }
    };
    const renderProduct = ({item}) => {
      return (
        <TouchableOpacity
          style={styles.list_product}
          onPress={() =>
            navigation.push('Detail-Product', {productId: item.id})
          }>
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
              <Text style={{color: '#f57f1a', fontSize: 12}}>
                {item.price}đ
              </Text>
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
                  ...(book ? book.images : []),
                  Images.onepiece1,
                ]}
                autoplay={true}
              />
            </View>
            <View style={styles.detail__content}>
              <View style={styles.detail__information}>
                <Text style={styles.detail__content_name}>
                  {book.name ? book.name : "Tên sách"}
                </Text>
                <Text style={{...styles.detail__content_name, fontSize: 16}}>{book.publisher}đ</Text>
                <Text style={styles.current__price}>Giá bán: {book.price}đ</Text>
                <View style={styles.detail__content_rate}>
                  <View style={styles.quantity_sold}>
                    <Text style={styles.quantity__sold_text}>Đã bán: {book.sold}</Text>
                    {/* sản phẩm được yêu thích */}
                    <TouchableOpacity onPress={likeProduct}>
                      <Icon
                        style={[styles.icon__heart, styles.icon__heart_active]}
                        name={isHeart ? 'heart' : 'hearto'}
                        type="AntDesign"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.detail__buy_control}>
                <View style={styles.detail__buying}>
                  <Text>Số lượng sẵn có : {book.amount}</Text>
                  <View style={styles.product__quantity}>
                    <TouchableOpacity onPress={() => setQuantity(quantity - 1)}>
                      <Text style={{...styles.buy__action_text, fontSize: 18}}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.input__quantity}
                      keyboardType="numeric"
                      value={quantity + ''}
                      // editable={false}
                      onChangeText={setQuantity}
                    />
                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                      <Text style={{...styles.buy__action_text, fontSize: 18}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.control__buy_action}>
                  <TouchableOpacity onPress={addToCart}>
                    <Text style={{...styles.buy__action_text, fontWeight: "500"}}>
                      Thêm vào giỏ hàng
                    </Text>
                  </TouchableOpacity>
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
                <View style={styles.detail__book_commnet}>
                  <TextInput
                    style={styles.comment}
                    value={comment}
                    // editable={false}
                    placeholder="Nhập bình luận của bạn"
                    onChangeText={onChangeComment}
                  />
                  <TouchableOpacity>
                    <Text style={{...styles.buy__action_text, fontSize: 14, fontWeight: "500"}}>Bình luận</Text>
                  </TouchableOpacity>
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
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
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
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8
  },
  current__price: {
    color: 'rgba(68, 108, 179, 1)',
    fontSize: 16,
    textAlign: "center"
  },
  detail__content_rate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: 25,
  },
  icon__heart_active: {
    color: 'rgba(68, 108, 179, 1)',
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
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  btn_quantity: {
    width: 40,
    height: '80%',
  },
  btn__quantity_text: {
    color: 'white',
  },
  buy__action_text: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(68, 108, 179, 1)',
    color: '#ffffff',
    borderRadius: 16,
    fontSize: 16,
    fontWeight: "bold"
  },
  control__buy_action: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    fontSize: 16,
    fontWeight: "bold"
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
  quantity__sold_text:{
    fontSize: 16
  }
});

export default DetailProduct;
