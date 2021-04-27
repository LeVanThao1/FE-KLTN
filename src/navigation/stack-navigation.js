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
import Store from '../screens/myStore/index';
import HeaderStack, {HeaderLogo} from '../header';
import CreateStore from '../screens/myStore/createStore';
import SreateStore from '../screens/myStore/createStore';
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

import PostFb from '../screens/post/posts';
const Stack = createStackNavigator();

const HomeStack = ({navigation, initialRoute}) => {
  const notification = useNotification();
  return (
    <Stack.Navigator initialRouteName={initialRoute || 'Home'}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'My home',
          headerTitle: () => <HeaderLogo navigation={navigation} />,
          headerStyle: {
            backgroundColor: 'rgba(68, 108, 179, 1)',
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
            backgroundColor: 'rgba(68, 108, 179, 1)',
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
            backgroundColor: 'rgba(68, 108, 179, 1)',
          },
          headerLeft: null,
        }}
      />
      {routes.map((rt, i) => (
        <Stack.Screen
          key={i}
          name={rt.name}
          component={rt.component}
          options={{
            title: rt.title,
            // headerTitle: () =>
            //   rt.header && <HeaderStack navigation={navigation} />,
          }}
        />
      ))}
      {/* <Stack.Screen name="Login" component={Login} /> */}
      {/* <Stack.Screen name="Detail-Product" component={DetailProduct} /> */}
      {/* <Stack.Screen name="Tab" component={BottomTabNavigator} /> */}
      {/* <Stack.Screen name="Store" component={CreateStore} /> */}
      {/* <Stack.Screen name="CreateProduct" component={CreateProduct} /> */}
      {/* <Stack.Screen name="CreateStore" component={CreateStore} /> */}
      {/* <Stack.Screen name="ViewAllProduct" component={ViewAll} />
      <Stack.Screen name="BooksStore" component={BooksStore} />
      <Stack.Screen name="StoreManageOrder" component={ViewAllOrder} />
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="Revenue" component={Revenue} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Andress" component={Address} />
      <Stack.Screen name="PostUser" component={Post} />
      <Stack.Screen name="AddPost" component={NewPost} />
      <Stack.Screen name="Personal" component={AccountManager} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="BookDetail" component={BookDetail} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="PostOne" component={PostOne} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ManageOrder" component={ManageOrder} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} /> */}
    </Stack.Navigator>
  );
};

const routes = [
  {
    name: 'Detail-Product',
    title: 'Chi tiết sản phẩm',
    header: false,
    component: DetailProduct,
  },
  {
    name: 'Store',
    title: 'Cửa hàng',
    header: false,
    component: CreateStore,
  },
  {
    name: 'CreateBook',
    title: 'Tạo sản phẩm',
    header: false,
    component: CreateBook,
  },
  {
    name: 'CreateStore',
    title: 'Tạo cửa hàng',
    header: false,
    component: CreateStore,
  },
  {
    name: 'ViewAllProduct',
    title: 'Sản phẩm',
    header: false,
    component: ViewAll,
  },
  // {
  //   name: 'StoreManageOrder',
  //   title: 'Quản lý đơn hàng',
  //   header: false,
  //   component: ViewAllOrder,
  // },
  {
    name: 'Statistics',
    title: 'Thống kê',
    header: false,
    component: Statistics,
  },
  {
    name: 'Revenue',
    title: 'Doanh thu',
    header: false,
    component: Revenue,
  },
  {
    name: 'Payment',
    title: 'Thanh toán',
    header: false,
    component: Payment,
  },
  {
    name: 'Andress',
    title: 'Địa chỉ',
    header: false,
    component: Address,
  },
  {
    name: 'PostUser',
    title: 'Bài viết cá nhân',
    header: false,
    component: Post,
  },

  {
    name: 'AddPost',
    title: 'Tạo bài viết',
    header: false,
    component: NewPost,
  },
  {
    name: 'UpdatePost',
    title: 'Cập nhật bài viết',
    header: false,
    component: UpdatePost,
  },
  {
    name: 'Personal',
    title: 'Quản lý cá nhân',
    header: false,
    component: AccountManager,
  },
  {
    name: 'Profile',
    title: 'Thông tin cá nhân',
    header: false,
    component: Profile,
  },
  {
    name: 'Contact',
    title: 'Liên hệ',
    header: false,
    component: Contact,
  },
  {name: 'Cart', title: 'Giỏ hàng', header: false, component: Cart},

  // {name: 'Feed', title: 'Bài đăng', header: false, component: Feed},
  {name: 'Feed', title: 'Bài đăng', header: false, component: PostFb},

  {
    name: 'BookDetail',
    title: 'Chi tiết sách',
    header: false,
    component: BookDetail,
  },
  {
    name: 'PostDetail',
    title: 'Chi tiết bài viết',
    header: false,
    component: PostDetail,
  },
  {name: 'Post', title: 'Bài đăng', header: false, component: Post},
  {
    name: 'PostOne',
    title: 'Chi tiết bài viết',
    header: false,
    component: PostOne,
  },
  {
    name: 'ChangePassword',
    title: 'Thay đổi mật khẩu',
    header: false,
    component: ChangePassword,
  },
  {
    name: 'ManageOrder',
    title: 'Quản lý đơn hàng',
    header: false,
    component: ManageOrder,
  },
  {
    name: 'OrderDetail',
    title: 'Chi tiết đơn hàng',
    header: false,
    component: OrderDetail,
  },
  {
    name: 'WishList',
    title: 'Sản phẩm yêu thích',
    header: false,
    component: WishList,
  },
  {
    name: 'BooksStore',
    title: 'Quản lý sách',
    header: false,
    component: BooksStore,
  },
  // {
  //   name: 'ViewSearch',
  //   title: 'Tất cả sản phẩm',
  //   header: false,
  //   component: ViewSearch,
  // },
  {
    name: 'Notification',
    title: 'Thông báo',
    header: false,
    component: Notification,
  },
];
const AuthStack = () => {
  return useObserver(() => {
    const {
      stores: {auth, user, shop, notification},
    } = useContext(MobXProviderContext);
    const [loading, setLoading] = useState(true);
    const [refreshToken, {dt, err}] = useLazyQuery(REFRESH_TOKEN, {
      onCompleted: async (data) => {
        shop.setInfo(data.refreshToken.user.store);
        user.setCart(data.refreshToken.user.cart);
        notification.setAllNotification(data.refreshToken.user.notifications);
        user.setLikes(data.refreshToken.user.likes);
        delete data.refreshToken.user.likes;
        delete data.refreshToken.user.notifications;
        delete data.refreshToken.user.store;
        delete data.refreshToken.user.cart;
        user.setInfo(data.refreshToken.user);
        auth.setLogin(data.refreshToken.token, data.refreshToken.refreshToken);
        await AsyncStorage.setItem('token', data.refreshToken.token);
        await AsyncStorage.setItem(
          'refreshToken',
          data.refreshToken.refreshToken,
        );
      },
      onError: (err) => {
        setLoading(false);
      },
    });
    const [getProfile, {called, load, data, error}] = useLazyQuery(GET_USER, {
      onCompleted: async (data) => {
        shop.setInfo(data.profile.store);
        user.setCart(data.profile.cart);
        notification.setAllNotification(data.profile.notifications);
        user.setLikes(data.profile.likes);
        delete data.profile.likes;
        delete data.profile.notifications;
        delete data.profile.store;
        delete data.profile.cart;
        user.setInfo(data.profile);
        auth.setIsAuth(true);
        setLoading(false);
      },
      onError: (err) => {
        refreshToken();
        // AsyncStorage.clear().then(() => {
        //   auth.setLogout();
        //   setLoading(false);
        // });
      },
    });

    useEffect(() => {
      AsyncStorage.getItem('token').then((data) => {
        AsyncStorage.getItem('refreshToken').then((dt) => {
          if (data && dt) {
            // auth.setLogin(data,dt)
            auth.setToken(data);
            auth.setRefreshToken(dt);
          } else {
            setLoading(false);
          }
        });
      });
    }, []);
    useEffect(() => {
      if (auth) {
        getProfile();
      }
    }, [auth]);
    return (
      <>
        {!loading ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="Home" component={Home} /> */}
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="SignUp" component={Register} />
            <Stack.Screen name="Verify" component={VerifyCode} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="VerifyForgot" component={VerifyForgot} />
          </Stack.Navigator>
        ) : (
          <View style={styles.container}>
            <Spinner color="blue" />
          </View>
        )}
      </>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {
  HomeStack,
  // ContactStack,
  AuthStack,
  // PaymentStack,
  // StoreStack,
  // PostStack,
  // ProductStack,
};
