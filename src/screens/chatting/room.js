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
    useEffect(() => {
      if (groupCurrent)
        queryData(GET_MESSAGE_GROUP, {groupId: groupCurrent})
          .then(({data}) => {
            setMessagesBegin(data.messagesInGroup);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            Toast.show(Notification(NOTIFI.error, err.message));
          });
      return () => {
        setGroupCurrent(undefined);
      };
    }, [groupCurrent]);

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
                  inverted
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
