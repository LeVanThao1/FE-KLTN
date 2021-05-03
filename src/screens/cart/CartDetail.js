import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Icon} from 'native-base';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import {useMutation} from '@apollo/client';
import {UPDATE_CART} from '../../query/user';
import Toast from 'react-native-toast-message';
import {Notification} from '../../utils/notifications';
import {NOTIFI} from '../../constants';

const imageURL =
  'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2';
export default function CartDetail({data}) {
  return useObserver(() => {
    const {
      stores: {user},
    } = useContext(MobXProviderContext);
    const {cart, setCart} = user;
    const typeRef = useRef(null);
    const [amount, setAmount] = React.useState(0);
    const [updateCart, {loading}] = useMutation(UPDATE_CART, {
      onCompleted: async (dt) => {
        // if(typeRef.current) {
        //   const datat = [...cart].map((ct) => {
        //     let tamp = {...ct}
        //     if(ct.book.id === data.book.id) {
        //       tamp.amount = typeRef.current === "i" ? ct.amount + 1 :  ct.amount - 1
        //     }
        //     return tamp;
        //   })
        //   setCart(datat)
        // }
        // else {
        //   const datat = [...cart].filter(ct => ct.book.id !== data.book.id)
        //   setCart(datat)
        //   setAmount(0)
        // }
      },
      onError: (err) => {
        console.log(err);
        Toast.show(Notification(NOTIFI.error, err.message));
      },
    });
    useEffect(() => {
      setAmount(data.amount);
    }, [data]);
    const changeAmount = (type) => {
      const dataCart = cart.map((ct) => {
        let tamp = {
          book: ct.book.id,
          price: ct.price,
        };
        if (ct.book.id === data.book.id) {
          tamp.amount = type ? ct.amount + 1 : ct.amount - 1;
        }
        return tamp;
      });
      if (type) {
        if (amount < data.book.amount) {
          typeRef.current = 'i';
          updateCart({
            variables: {
              dataCart,
            },
          });
          setAmount((cur) => cur + 1);
          const datat = [...cart].map((ct) => {
            let tamp = {...ct};
            if (ct.book.id === data.book.id) {
              tamp.amount =
                typeRef.current === 'i' ? ct.amount + 1 : ct.amount - 1;
            }
            return tamp;
          });
          setCart([...datat]);
        }
      } else {
        if (amount > 1) {
          typeRef.current = 'd';
          updateCart({
            variables: {
              dataCart,
            },
          });
          setAmount((cur) => cur - 1);
          const datat = [...cart].map((ct) => {
            let tamp = {...ct};
            if (ct.book.id === data.book.id) {
              tamp.amount =
                typeRef.current === 'i' ? ct.amount + 1 : ct.amount - 1;
            }
            return tamp;
          });
          setCart([...datat]);
        } else {
          typeRef.current = false;
          const cartStore = [...cart].filter(
            (ct) => ct.book.id !== data.book.id,
          );
          const dataCart = [...cartStore].map((ct) => {
            return {
              book: ct.book.id,
              price: ct.price,
              amount: ct.amount,
            };
          });
          updateCart({
            variables: {
              dataCart,
            },
          });
          const datat = [...cart].filter((ct) => ct.book.id !== data.book.id);
          setCart([...datat]);
        }
      }
    };

    return (
      <>
        {cart.length > 0 && (
          <View style={styles.container}>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: data.book.book
                    ? data.book.book.images[0]
                    : data.book.images[0],
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                height: '100%',
              }}>
              <TouchableOpacity>
                <Text style={{fontSize: 16, color: '#000000'}}>
                  {data.book.name ? data.book.name : data.book.book.name}
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: 14, color: 'rgba(68, 108, 179, 1)'}}>
                {data.book.price}đ
              </Text>
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  // height: '50%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => changeAmount(false)}>
                  <Icon name="arrow-back" type="Ionicons" style={styles.icon} />
                </TouchableOpacity>
                <TextInput
                  style={styles.amountInput}
                  value={amount + ''}
                  keyboardType="numeric"
                  editable={false}
                />
                <TouchableOpacity onPress={() => changeAmount(true)}>
                  <Icon
                    name="arrow-forward"
                    type="Ionicons"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 24,
                    backgroundColor: 'rgba(68, 108, 179, 1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="delete"
                    type="MaterialIcons"
                    style={{fontSize: 15, color: '#ffffff'}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    borderColor: '#696969',
    borderWidth: 0.2,
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {width: 80, height: 80},
  icon: {
    fontSize: 20,
    color: '#000000',
  },
  amountInput: {
    padding: 2,
    margin: 4,
    borderWidth: 0.2,
    borderColor: '#696969',
    textAlign: 'center',
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
