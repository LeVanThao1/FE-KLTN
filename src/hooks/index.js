import {useLazyQuery, useSubscription} from '@apollo/client';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {useContext, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  COMMENTS_BOOK_NOTIFICATION,
  COMMENTS_ORDER_NOTIFICATION,
  COMMENTS_POST_NOTIFICATION,
} from '../query/notification';
import {NOTIFI} from '../constants';
import {Notification} from '../utils/notifications';
// cai nay la t lam nhan thong bao user ne. m lma admin thi cung nhu ri thoi. tao ra 1 cai hook thoi
// hientai admin chi moi nhan thong bao cua uc tao sach cua store
export const useNotification = () => {
  return useObserver(() => {
    const {
      stores: {notification, user},
    } = useContext(MobXProviderContext);
    const {setOrder, setPost, setBook, post, book, order} = notification;
    const {data: dataPost} = useSubscription(COMMENTS_POST_NOTIFICATION, {
      variables: {
        userId: user.info.id,
      },
    });

    const {data: dataBook} = useSubscription(COMMENTS_BOOK_NOTIFICATION, {
      variables: {
        userId: user.info.id,
      },
    });

    const {data: dataOrder} = useSubscription(COMMENTS_ORDER_NOTIFICATION, {
      variables: {
        userId: user.info.id,
      },
    });

    useEffect(() => {
      if (dataPost) {
        setPost([dataPost.receiveNotificationCommentPost, ...post]);
        if (dataPost.receiveNotificationCommentPost)
          Toast.show(
            Notification(
              NOTIFI.info,
              dataPost.receiveNotificationCommentPost.title,
              dataPost.receiveNotificationCommentPost.description,
            ),
          );
      }
    }, [dataPost]);

    useEffect(() => {
      if (dataBook) {
        setBook([dataBook.receiveNotificationCommentBook, ...book]);
        Toast.show(
          Notification(
            NOTIFI.info,
            dataBook.receiveNotificationCommentBook.title,
            dataBook.receiveNotificationCommentBook.description,
          ),
        );
      }
    }, [dataBook]);

    useEffect(() => {
      if (dataOrder) {
        setOrder([dataOrder.receiveNotificationOrder, ...order]);
        Toast.show(
          Notification(
            NOTIFI.info,
            dataOrder.receiveNotificationOrder.title,
            dataOrder.receiveNotificationOrder.description,
          ),
        );
      }
    }, [dataOrder]);
    return true;
  });
};
