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
          title: 'Danh sách sản phẩm',
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
          title: 'Tin nhắn',
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
    title: 'Chi tiết sản phẩm',
    header: false,
    show: true,
    component: DetailProduct,
  },
  {
    name: 'Store',
    title: 'Cửa hàng',
    header: false,
    show: true,
    component: Store,
  },
  {
    name: 'CreateBook',
    title: 'Tạo sản phẩm',
    header: false,
    show: true,
    component: CreateBook,
  },
  {
    name: 'CreateStore',
    title: 'Tạo cửa hàng',
    header: false,
    show: true,
    component: CreateStore,
  },
  {
    name: 'UpdateStore',
    title: 'Cập nhật cửa hàng',
    header: false,
    show: true,
    component: UpdateStore,
  },
  {
    name: 'StoreDetail',
    title: 'Cửa hàng',
    header: false,
    show: true,
    component: StoreDetail,
  },
  {
    name: 'ViewAllProduct',
    title: 'Sản phẩm',
    header: false,
    show: true,
    component: ViewAll,
  },
  {
    name: 'Statistics',
    title: 'Thống kê',
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
    title: 'Thanh toán',
    header: false,
    show: true,
    component: Payment,
  },
  {
    name: 'Andress',
    title: 'Địa chỉ',
    header: false,
    show: true,
    component: Address,
  },
  {
    name: 'PostUser',
    title: 'Bài viết cá nhân',
    header: false,
    show: true,
    component: Post,
  },

  {
    name: 'NewPost',
    title: 'Tạo bài viết',
    header: false,
    show: true,
    component: NewPost,
  },
  {
    name: 'UpdatePost',
    title: 'Cập nhật bài viết',
    header: false,
    show: true,
    component: UpdatePost,
  },
  {
    name: 'Personal',
    title: 'Quản lý cá nhân',
    header: false,
    show: true,
    component: AccountManager,
  },
  {
    name: 'Profile',
    title: 'Thông tin cá nhân',
    header: false,
    show: true,
    component: Profile,
  },

  {
    name: 'UpdateProfile',
    title: 'Cập nhật thông tin cá nhân',
    header: false,
    show: true,
    component: UpdateProfile,
  },

  {
    name: 'UserInfo',
    title: 'Thông tin người dùng',
    header: false,
    show: true,
    component: UserInfo,
  },

  {
    name: 'Contact',
    title: 'Liên hệ',
    header: false,
    show: true,
    component: Contact,
  },
  {name: 'Cart', title: 'Giỏ hàng', header: false, show: true, component: Cart},
  {name: 'Feed', title: 'Bài đăng', header: false, show: true, component: Feed},
  {
    name: 'BookDetail',
    title: 'Chi tiết sách',
    header: false,
    show: true,
    component: BookDetail,
  },
  {
    name: 'PostDetail',
    title: 'Chi tiết bài viết',
    header: false,
    show: true,
    component: PostDetail,
  },
  {name: 'Post', title: 'Bài đăng', header: false, show: true, component: Post},
  {
    name: 'PostOne',
    title: 'Chi tiết bài viết',
    header: false,
    show: true,
    component: PostOne,
  },
  {
    name: 'PostOfFeed',
    title: 'Chi tiết bài viết',
    header: false,
    show: true,
    component: PostOfFeed,
  },
  {
    name: 'ChangePassword',
    title: 'Thay đổi mật khẩu',
    header: false,
    show: true,
    component: ChangePassword,
  },

  {
    name: 'OrdersByStore',
    title: 'Quản lý đơn hàng',
    header: false,
    show: true,
    component: OrdersByStore,
  },
  {
    name: 'OrderDetailStore',
    title: 'Chi tiết đơn hàng',
    header: false,
    show: true,
    component: OrderDetailStore,
  },
  {
    name: 'ManageOrder',
    title: 'Đơn hàng của bạn',
    header: false,
    show: true,
    component: ManageOrder,
  },
  {
    name: 'OrderDetail',
    title: 'Chi tiết đơn hàng',
    header: false,
    show: true,
    component: OrderDetail,
  },
  {
    name: 'WishList',
    title: 'Sản phẩm yêu thích',
    header: false,
    show: true,
    component: WishList,
  },
  {
    name: 'BooksStore',
    title: 'Quản lý sách',
    header: false,
    show: true,
    component: BooksStore,
  },
  {
    name: 'Notification',
    title: 'Thông báo',
    header: false,
    show: true,
    component: Notification,
  },
  {
    name: 'ListStoreFound',
    title: 'Tìm quanh đây',
    header: false,
    show: true,
    component: ListStoreFound,
  },
  {
    name: 'Chatting',
    title: 'Tin nhắn',
    header: false,
    show: true,
    component: Chatting,
  },
  {
    name: 'Room',
    title: 'Tin nhắn',
    header: false,
    show: false,
    component: Room,
  },
  {
    name: 'ImagesView',
    title: 'Tất cả hình ảnh',
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
