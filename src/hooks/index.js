import {useLazyQuery, useSubscription} from '@apollo/client';
import { MobXProviderContext, useObserver } from 'mobx-react';
import {useContext, useEffect, useState} from 'react';
import {COMMENTS_BOOK_NOTIFICATION, COMMENTS_POST_NOTIFICATION} from '../query/notification';

export const useNotification = () => {
    return useObserver(() => {
        const {
          stores: {notification, user},
        } = useContext(MobXProviderContext);
    const {setOrder, setPost, setBook,post ,book, order} = notification
  const { data: dataPost  } = useSubscription(COMMENTS_POST_NOTIFICATION, {
      variables: {
          userId: user.info.id
      },
  });

  const { data: dataBook  } = useSubscription(COMMENTS_BOOK_NOTIFICATION, {
    variables: {
        userId: user.info.id
    },
});

const { data: dataOrder  } = useSubscription(COMMENTS_POST_NOTIFICATION, {
    variables: {
        userId: user.info.id
    },
});

  useEffect(() => {
    if (dataPost) {
        setPost([dataPost.receiveNotificationCommentPost, ...post])
    }
  }, [dataPost]);

  useEffect(() => {
    if (dataBook) {
        setBook([dataBook.receiveNotificationCommentBook, ...book])
    }
  }, [dataBook]);

  useEffect(() => {
    if (dataOrder) {
        setOrder([dataOrder, ...order])
    }
  }, [dataOrder]);
  return true;
})
};
