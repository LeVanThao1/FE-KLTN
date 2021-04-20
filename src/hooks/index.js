import {useLazyQuery, useSubscription} from '@apollo/client';
import { MobXProviderContext, useObserver } from 'mobx-react';
import {useContext, useEffect, useState} from 'react';
import {COMMENTS_POST_NOTIFICATION} from '../query/notification';

export const useNotification = () => {
    return useObserver(() => {
        const {
          stores: {notification, user},
        } = useContext(MobXProviderContext);
//   const [result, setResult] = useState();
    const {setOrder, setPost, setBook,post ,book, order} = notification
  const { data , loading } = useSubscription(COMMENTS_POST_NOTIFICATION, {
      variables: {
          userId: user.info.id
      },
    //   onSubscriptionData: (data) => {
    //       console.log("custom hook",data.client, "\n", Object.keys(data.client))
    //     // setPost([data?.receiveNotificationCommentPost, ...post])
    //   } 
  });

  useEffect(() => {
    if (data) {
        setPost([data.receiveNotificationCommentPost, ...post])
    }
  }, [data]);
  console.log(post.length)
  return true;
})
};
