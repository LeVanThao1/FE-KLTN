import {useSubscription} from '@apollo/client';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {useContext, useEffect} from 'react';
import RNReactNativeSoundToast from 'react-native-sound-toast';
import Toast from 'react-native-toast-message';
import {queryData} from '../common';
import {NOTIFI} from '../constants';
import {RECEIVE_MESSAGE, SEEN_MESSAGE} from '../query/message';
import {
  COMMENTS_BOOK_NOTIFICATION,
  COMMENTS_ORDER_NOTIFICATION,
  COMMENTS_POST_NOTIFICATION,
} from '../query/notification';
import {Notification} from '../utils/notifications';

export const useNotification = () => {
  return useObserver(() => {
    const {
      stores: {notification, user, group},
    } = useContext(MobXProviderContext);
    const {
      groups,
      setGroups,
      setGroupCurrent,
      groupCurrent,
      setMessages,
      setSeenMessage,
      isActive,
    } = group;
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
    const {data} = useSubscription(RECEIVE_MESSAGE, {
      variables: {
        userId: user.info.id,
      },
    });
    useEffect(() => {
      if (data) {
        if (!isActive) {
          Toast.show(
            Notification(
              NOTIFI.info,
              `${data.receiveMessage.from.name} đã gửi bạn tin nhắn`,
            ),
          );
          RNReactNativeSoundToast.playSound('message', 'wav');
        } else {
          if (groupCurrent) {
            setMessages(data.receiveMessage);
            queryData(SEEN_MESSAGE, {id: data.receiveMessage.id})
              .then((dt) => {
                setSeenMessage(dt.data.seenMessage, groupCurrent);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            if (
              groups.find((it) => it.id + '' === data.receiveMessage.to.id + '')
            ) {
              const tamp = [...groups].filter(
                (it) => it.id + '' !== data.receiveMessage.to.id + '',
              );
              setGroups([data.receiveMessage.to, ...tamp]);
            } else {
              setGroups([data.receiveMessage.to, ...groups]);
            }
            RNReactNativeSoundToast.playSound('message', 'wav');
          }
        }
      }

      return () => {
        // cleanup;
      };
    }, [data]);
    useEffect(() => {
      if (dataPost && dataPost?.receiveNotificationCommentPost) {
        setPost([dataPost.receiveNotificationCommentPost, ...post]);
        RNReactNativeSoundToast.playSound('notification', 'wav');
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
      if (dataBook && dataBook?.receiveNotificationCommentBook) {
        setBook([dataBook.receiveNotificationCommentBook, ...book]);
        RNReactNativeSoundToast.playSound('notification', 'wav');
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
      if (dataOrder && dataOrder?.receiveNotificationOrder) {
        setOrder([dataOrder.receiveNotificationOrder, ...order]);
        RNReactNativeSoundToast.playSound('notification', 'wav');
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
