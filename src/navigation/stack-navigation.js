import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import Home from '../screens/home';
import About from '../screens/about';
import DetailProduct from '../screens/detail-product';
import Contact from '../screens/contact';
import Payment from '../screens/payment/payment';
import Login from '../screens/login';
import Register from '../screens/register';
import ForgotPassword from '../screens/forgot-password';
import HeaderStack, {HeaderLogo, HeaderMessage} from '../header';
import Store from '../screens/myStore/store';
import SreateStore from '../screens/myStore/store';
import {NavigationContainer} from '@react-navigation/native';
import ViewAll from '../screens/myStore/viewAll';
import Statistics from '../screens/myStore/finance/statistics';
import Revenue from '../screens/myStore/finance/revenue';
import CreateBook from '../screens/myStore/book/createBook';
import Address from '../screens/payment/address';
import BottomTabNavigator from './tab-navigation';
import VerifyCode from '../screens/verifyCode';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLazyQuery, useQuery} from '@apollo/client';
import {GET_USER, REFRESH_TOKEN} from '../query/user';
import {Spinner, View} from 'native-base';
import Post from '../screens/post';
import NewPost from '../screens/post/newPost';
import AccountManager from '../screens/account-manager';
import Profile from '../screens/profile';
import Cart from '../screens/cart';
import Feed from '../screens/feed';
import ChangePassword from '../screens/change-password';
import ManageOrder from '../screens/manage-order';
import OrderDetail from '../screens/order-detail';
import {useNotification} from '../hooks';
import BookDetail from '../screens/myStore/bookDetail';
import UpdateBook from '../screens/myStore/book/updateBook';
import PostDetail from '../screens/post/postDetail';
import PostOne from '../screens/post/post';
import ViewSearch from '../screens/viewSearch';
import WishList from '../screens/wishlist';
import ResetPassword from '../screens/reset-password';
import VerifyForgot from '../screens/verifyFogot';
import Notification from '../screens/notification';
import BooksStore from '../screens/myStore/book/booksStore';
import UpdatePost from '../screens/post/updatePost';
import Products from '../screens/products';
import CreateStore from '../screens/myStore/createStore';
import UserInfo from '../screens/profile/infoUser';
import OrdersByStore from '../screens/myStore/order';
import OrderDetailStore from '../screens/myStore/order/order_detail';
import UpdateStore from '../screens/myStore/updateStore';
import ListStoreFound from '../screens/listStoreFound';
import StoreDetail from '../screens/myStore/storeDetail';
import Chatting from '../screens/chatting/chats';
import * as Notifi from '../utils/notifications';
import PostFb from '../screens/post/posts';
import PostOfFeed from '../screens/post/postOfFeed';
import Toast from 'react-native-toast-message';
import {NOTIFI} from '../constants';
import {COLORS} from '../constants/themes';
import Room from '../screens/chatting/room';
import ImagesView from '../screens/chatting/imagesView';
import App from '../screens/app';
import {createCompatNavigatorFactory} from '@react-navigation/compat';
import UpdateProfile from '../screens/profile/updateProfile';
const Stack = createStackNavigator();

const HomeStack = ({navigation, initialRoute}) => {
  const notification = useNotification();
  return (
    <Stack.Navigator
      initialRouteName={initialRoute || 'Home'}
      screenOptions={{
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'My home',
          headerTitle: () => <HeaderLogo navigation={navigation} />,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="ViewSearch"
        component={ViewSearch}
        options={{
          title: 'search',
          headerTitle: () => <HeaderStack navigation={navigation} />,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          title: 'Danh s??ch s???n ph???m',
          headerTitle: () => <HeaderStack navigation={navigation} />,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerLeft: null,
        }}
      />
      {/* <Stack.Screen
        name="Chatting"
        component={Chatting}
        options={{
          title: 'Tin nh???n',
          headerTitle: () => <HeaderMessage />,
          headerStyle: {
            backgroundColor: '#f44f4f',
          },
          headerLeft: null,
        }}
      /> */}
      {routes.map((rt, i) => (
        <Stack.Screen
          key={i}
          name={rt.name}
          component={rt.component}
          options={{
            title: rt.title,
            headerShown: rt.show,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: COLORS.white,
            },
            headerBackTitleStyle: {
              color: COLORS.white,
            },
            headerTintColor: COLORS.white,
            // headerTitle: () =>
            //   rt.header && <HeaderStack navigation={navigation} />,
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

const routes = [
  {
    name: 'Detail-Product',
    title: 'Chi ti???t s???n ph???m',
    header: false,
    show: true,
    component: DetailProduct,
  },
  {
    name: 'Store',
    title: 'C???a h??ng',
    header: false,
    show: true,
    component: Store,
  },
  {
    name: 'CreateBook',
    title: 'T???o s???n ph???m',
    header: false,
    show: true,
    component: CreateBook,
  },
  {
    name: 'CreateStore',
    title: 'T???o c???a h??ng',
    header: false,
    show: true,
    component: CreateStore,
  },
  {
    name: 'UpdateStore',
    title: 'C???p nh???t c???a h??ng',
    header: false,
    show: true,
    component: UpdateStore,
  },
  {
    name: 'StoreDetail',
    title: 'C???a h??ng',
    header: false,
    show: true,
    component: StoreDetail,
  },
  {
    name: 'ViewAllProduct',
    title: 'S???n ph???m',
    header: false,
    show: true,
    component: ViewAll,
  },
  {
    name: 'Statistics',
    title: 'Th???ng k??',
    header: false,
    show: true,
    component: Statistics,
  },
  {
    name: 'Revenue',
    title: 'Doanh thu',
    header: false,
    show: true,
    component: Revenue,
  },
  {
    name: 'Payment',
    title: 'Thanh to??n',
    header: false,
    show: true,
    component: Payment,
  },
  {
    name: 'Andress',
    title: '?????a ch???',
    header: false,
    show: true,
    component: Address,
  },
  {
    name: 'PostUser',
    title: 'B??i vi???t c?? nh??n',
    header: false,
    show: true,
    component: Post,
  },

  {
    name: 'NewPost',
    title: 'T???o b??i vi???t',
    header: false,
    show: true,
    component: NewPost,
  },
  {
    name: 'UpdatePost',
    title: 'C???p nh???t b??i vi???t',
    header: false,
    show: true,
    component: UpdatePost,
  },
  {
    name: 'Personal',
    title: 'Qu???n l?? c?? nh??n',
    header: false,
    show: true,
    component: AccountManager,
  },
  {
    name: 'Profile',
    title: 'Th??ng tin c?? nh??n',
    header: false,
    show: true,
    component: Profile,
  },

  {
    name: 'UpdateProfile',
    title: 'C???p nh???t th??ng tin c?? nh??n',
    header: false,
    show: true,
    component: UpdateProfile,
  },

  {
    name: 'UserInfo',
    title: 'Th??ng tin ng?????i d??ng',
    header: false,
    show: true,
    component: UserInfo,
  },

  {
    name: 'Contact',
    title: 'Li??n h???',
    header: false,
    show: true,
    component: Contact,
  },
  {name: 'Cart', title: 'Gi??? h??ng', header: false, show: true, component: Cart},
  {name: 'Feed', title: 'B??i ????ng', header: false, show: true, component: Feed},
  {
    name: 'BookDetail',
    title: 'Chi ti???t s??ch',
    header: false,
    show: true,
    component: BookDetail,
  },
  {
    name: 'UpdateBook',
    title: 'C???p nh???t s??ch',
    header: false,
    show: true,
    component: UpdateBook,
  },

  {
    name: 'PostDetail',
    title: 'Chi ti???t b??i vi???t',
    header: false,
    show: true,
    component: PostDetail,
  },
  {name: 'Post', title: 'B??i ????ng', header: false, show: true, component: Post},
  {
    name: 'PostOne',
    title: 'Chi ti???t b??i vi???t',
    header: false,
    show: true,
    component: PostOne,
  },
  {
    name: 'PostOfFeed',
    title: 'Chi ti???t b??i vi???t',
    header: false,
    show: true,
    component: PostOfFeed,
  },
  {
    name: 'ChangePassword',
    title: 'Thay ?????i m???t kh???u',
    header: false,
    show: true,
    component: ChangePassword,
  },

  {
    name: 'OrdersByStore',
    title: 'Qu???n l?? ????n h??ng',
    header: false,
    show: true,
    component: OrdersByStore,
  },
  {
    name: 'OrderDetailStore',
    title: 'Chi ti???t ????n h??ng',
    header: false,
    show: true,
    component: OrderDetailStore,
  },
  {
    name: 'ManageOrder',
    title: '????n h??ng c???a b???n',
    header: false,
    show: true,
    component: ManageOrder,
  },
  {
    name: 'OrderDetail',
    title: 'Chi ti???t ????n h??ng',
    header: false,
    show: true,
    component: OrderDetail,
  },
  {
    name: 'WishList',
    title: 'S???n ph???m y??u th??ch',
    header: false,
    show: true,
    component: WishList,
  },
  {
    name: 'BooksStore',
    title: 'Qu???n l?? s??ch',
    header: false,
    show: true,
    component: BooksStore,
  },
  {
    name: 'Notification',
    title: 'Th??ng b??o',
    header: false,
    show: true,
    component: Notification,
  },
  {
    name: 'ListStoreFound',
    title: 'T??m quanh ????y',
    header: false,
    show: true,
    component: ListStoreFound,
  },
  {
    name: 'Chatting',
    title: 'Tin nh???n',
    header: false,
    show: true,
    component: Chatting,
  },
  {
    name: 'Room',
    title: 'Tin nh???n',
    header: false,
    show: false,
    component: Room,
  },
  {
    name: 'ImagesView',
    title: 'T???t c??? h??nh ???nh',
    header: false,
    show: true,
    component: ImagesView,
  },
];
const AuthStack = () => {
  // return useObserver(() => {
  //   const {
  //     stores: {auth, user, shop, notification},
  //   } = useContext(MobXProviderContext);
  //   const [loading, setLoading] = useState(true);
  //   const [refreshToken, {dt, err}] = useLazyQuery(REFRESH_TOKEN, {
  //     onCompleted: async (data) => {
  //       shop.setInfo(data.refreshToken.user.store);
  //       user.setCart(data.refreshToken.user.cart);
  //       notification.setAllNotification(data.refreshToken.user.notifications);
  //       user.setLikes(data.refreshToken.user.likes);
  //       delete data.refreshToken.user.likes;
  //       delete data.refreshToken.user.notifications;
  //       delete data.refreshToken.user.store;
  //       delete data.refreshToken.user.cart;
  //       user.setInfo(data.refreshToken.user);
  //       auth.setLogin(data.refreshToken.token, data.refreshToken.refreshToken);
  //       await AsyncStorage.setItem('token', data.refreshToken.token);
  //       await AsyncStorage.setItem(
  //         'refreshToken',
  //         data.refreshToken.refreshToken,
  //       );
  //     },
  //     onError: (err) => {
  //       setLoading(false);
  //       // Toast.show(Notifi.Notification(NOTIFI.error, err.message));
  //     },
  //   });
  //   const [getProfile, {called, load, data, error}] = useLazyQuery(GET_USER, {
  //     onCompleted: async (data) => {
  //       shop.setInfo(data.profile.store);
  //       user.setCart(data.profile.cart);
  //       notification.setAllNotification(data.profile.notifications);
  //       user.setLikes(data.profile.likes);
  //       delete data.profile.likes;
  //       delete data.profile.notifications;
  //       delete data.profile.store;
  //       delete data.profile.cart;
  //       user.setInfo(data.profile);
  //       auth.setIsAuth(true);
  //       setLoading(false);
  //     },
  //     onError: (err) => {
  //       refreshToken();
  //       // AsyncStorage.clear().then(() => {
  //       //   auth.setLogout();
  //       //   setLoading(false);
  //       // });
  //     },
  //   });

  //   useEffect(() => {
  //     AsyncStorage.getItem('token').then((data) => {
  //       AsyncStorage.getItem('refreshToken').then((dt) => {
  //         if (data && dt) {
  //           // auth.setLogin(data,dt)
  //           auth.setToken(data);
  //           auth.setRefreshToken(dt);
  //         } else {
  //           setLoading(false);
  //         }
  //       });
  //     });
  //   }, []);
  //   useEffect(() => {
  //     if (auth) {
  //       getProfile();
  //     }
  //   }, [auth]);
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="SignUp" component={Register} />
        <Stack.Screen name="Verify" component={VerifyCode} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="VerifyForgot" component={VerifyForgot} />
      </Stack.Navigator>
    </>
  );
  // });
};

// const AppStack = () => {
//   // return useObserver(() => {
//   //   const {
//   //     stores: {auth},
//   //   } = useContext(MobXProviderContext);
//   return (
//     <Stack.Navigator
//       initialRouteName="Loading"
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Loading" component={Loading} />
//       <Stack.Screen name="App" component={BottomTabNavigator} />
//       <Stack.Screen name="Auth" component={AuthStack} />
//     </Stack.Navigator>
//   );
//   // });
// };

// () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         // headerLeft: null,
//         headerLeft: false,
//       }}
//       initialRouteName="Loading">
//       <Stack.Screen name="Loading" component={Loading} />
//       <Stack.Screen
//         name="App"
//         component={BottomTabNavigator}
//         options={{headerLeft: null}}
//       />
//       <Stack.Screen
//         name="Auth"
//         component={AuthStack}
//         options={{headerLeft: null}}
//       />
//     </Stack.Navigator>
//   );
// };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {
  HomeStack,
  // AppStack,
  // ContactStack,
  AuthStack,
  // PaymentStack,
  // StoreStack,
  // PostStack,
  // ProductStack,
};
