import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Spinner} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {FlatList, ImageBackground, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import BG from '../../assets/images/dinosaur.png';
import {queryData} from '../../common';
import {COLORS, NOTIFI} from '../../constants';
import {GET_MESSAGE_GROUP} from '../../query/message';
import {Notification} from '../../utils/notifications';
import HeaderRoom from './components/HeaderRoom';
import InputBox from './components/InputBox';
import ChatMessage from './components/Message';

const ChatRoomScreen = ({navigation, route}) => {
  return useObserver(() => {
    const {
      stores: {group, user},
    } = useContext(MobXProviderContext);
    const {messages, setMessagesBegin, groupCurrent, setGroupCurrent} = group;
    const {name, avatar, userIdTo} = route.params;
    const [loading, setLoading] = useState(true);
    const [loadMore, setLoadMore] = useState(false);
    const [option, setOption] = useState({
      limit: 20,
      page: 1,
    });
    const [stop, setStop] = useState(false);

    useEffect(() => {
      if (groupCurrent) {
        setLoading(true);
        queryData(GET_MESSAGE_GROUP, {groupId: groupCurrent, ...option})
          .then(({data}) => {
            setMessagesBegin(data.messagesInGroup);
            if (data.messagesInGroup.length < 20) {
              setStop(true);
            }
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err, 'room');
            Toast.show(Notification(NOTIFI.error, err.message));
          });
      }
      return () => {
        setGroupCurrent(undefined);
        setMessagesBegin(undefined);
        setOption({limit: 20, page: 1});
      };
    }, [groupCurrent]);

    useEffect(() => {
      if (groupCurrent)
        if (option.page != 1 && !stop) {
          setLoadMore(true);
          queryData(GET_MESSAGE_GROUP, {groupId: groupCurrent, ...option})
            .then(({data}) => {
              if (data.messagesInGroup.length > 0) {
                setMessagesBegin([...messages, ...data.messagesInGroup]);
                if (data.messagesInGroup.length < 20) {
                  setStop(true);
                }
              } else {
                setOption((cur) => ({...cur, page: cur.page - 1}));
                setStop(true);
              }
              setLoadMore(false);
            })
            .catch((err) => {
              setLoadMore(false);
              console.log(err);
              Toast.show(Notification(NOTIFI.error, err.message));
            });
        }
    }, [option]);

    return (
      <View style={{marginBottom: 110}}>
        <HeaderRoom name={name} avatar={avatar} userId={userIdTo} />
        <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
          {!loading ? (
            <>
              {messages && messages.length > 0 ? (
                <FlatList
                  data={messages}
                  renderItem={({item}) => (
                    <ChatMessage
                      roomId={groupCurrent}
                      message={item}
                      userId={user.info.id}
                    />
                  )}
                  onEndReached={() => {
                    !stop && setOption((cur) => ({...cur, page: cur.page + 1}));
                  }}
                  onEndReachedThreshold={0.1}
                  inverted
                  ListFooterComponent={() =>
                    loadMore && <Spinner color={COLORS.primary} size="small" />
                  }
                />
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    paddingTop: 10,
                  }}>
                  Chưa có tin nhắn
                </Text>
              )}

              <InputBox roomId={groupCurrent} userId={userIdTo} />
            </>
          ) : (
            <Spinner color={COLORS.primary} size="small" />
          )}
        </ImageBackground>
      </View>
    );
  });
};

export default memo(ChatRoomScreen);
