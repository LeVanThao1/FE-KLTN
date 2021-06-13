import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {COLORS} from '../constants/themes';
import HeaderStack, {HeaderLogo} from '../header';
import {useNotification} from '../hooks';
import AccountManager from '../screens/account-manager';
import Cart from '../screens/cart';
import ChangePassword from '../screens/change-password';
import Chatting from '../screens/chatting/chats';
import ImagesView from '../screens/chatting/imagesView';
import Room from '../screens/chatting/room';
import Contact from '../screens/contact';
import DetailProduct from '../screens/detail-product';
import Feed from '../screens/feed';
import ForgotPassword from '../screens/forgot-password';
import Home from '../screens/home';
import ListStoreFound from '../screens/listStoreFound';
import Login from '../screens/login';
import ManageOrder from '../screens/manage-order';
import BooksStore from '../screens/myStore/book/booksStore';
import CreateBook from '../screens/myStore/book/createBook';
import UpdateBook from '../screens/myStore/book/updateBook';
import BookDetail from '../screens/myStore/bookDetail';
import CreateStore from '../screens/myStore/createStore';
import Revenue from '../screens/myStore/finance/revenue';
import Statistics from '../screens/myStore/finance/statistics';
import OrdersByStore from '../screens/myStore/order';
import OrderDetailStore from '../screens/myStore/order/order_detail';
import Store from '../screens/myStore/store';
import StoreDetail from '../screens/myStore/storeDetail';
import UpdateStore from '../screens/myStore/updateStore';
import ViewAll from '../screens/myStore/viewAll';
import Notification from '../screens/notification';
import OrderDetail from '../screens/order-detail';
import Address from '../screens/payment/address';
import Payment from '../screens/payment/payment';
import Post from '../screens/post';
import NewPost from '../screens/post/newPost';
import PostOne from '../screens/post/post';
import PostDetail from '../screens/post/postDetail';
import PostOfFeed from '../screens/post/postOfFeed';
import UpdatePost from '../screens/post/updatePost';
import Products from '../screens/products';
import Profile from '../screens/profile';
import UserInfo from '../screens/profile/infoUser';
import UpdateProfile from '../screens/profile/updateProfile';
import Register from '../screens/register';
import ResetPassword from '../screens/reset-password';
import VerifyCode from '../screens/verifyCode';
import VerifyForgot from '../screens/verifyFogot';
import ViewSearch from '../screens/viewSearch';
import WishList from '../screens/wishlist';
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
    title: 'Cập nhật thông tin',
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
    name: 'UpdateBook',
    title: 'Cập nhật sách',
    header: false,
    show: true,
    component: UpdateBook,
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
};

export {HomeStack, AuthStack};
