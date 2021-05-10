import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Icon, Spinner} from 'native-base';
import React, {useState, useEffect, useContext} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {queryData} from '../../common';
import {COLORS, NOTIFI} from '../../constants';
import {GET_GROUP} from '../../query/group';
import {Notification} from '../../utils/notifications';
import NewMessageButton from './components/NewMessageButton';
import moment from 'moment';
import {RECEIVE_MESSAGE, SEEN_MESSAGE, SEND_MESSAGE} from '../../query/message';
import {useSubscription} from '@apollo/client';
const {width, height} = Dimensions.get('screen');
const Chats = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {group, user},
    } = useContext(MobXProviderContext);
    const {
      groups,
      setGroups,
      setGroupCurrent,
      groupCurrent,
      setMessages,
      setSeenMessage,
    } = group;
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const {data} = useSubscription(RECEIVE_MESSAGE, {
      variables: {
        userId: user.info.id,
      },
    });
    useEffect(() => {
      if (data) {
        if (groupCurrent) {
          setMessages(data.receiveMessage);
          queryData(SEEN_MESSAGE, {id: data.receiveMessage.id})
            .then((dt) => {
              console.log(dt.data);
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
        }
      }

      return () => {
        // cleanup;
      };
    }, [data]);
    useEffect(() => {
      setLoading(true);
      queryData(GET_GROUP)
        .then(({data}) => {
          setGroups(data.groups);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          Toast.show(Notification(NOTIFI.error, err.message));
        });
    }, []);

    useEffect(() => {
      if (refresh) {
        queryData(GET_GROUP)
          .then(({data}) => {
            setGroups(data.groups);
            setRefresh(false);
          })
          .catch((err) => {
            setRefresh(false);
            console.log(err);
            Toast.show(Notification(NOTIFI.error, err.message));
          });
      }
    }, [refresh]);

    const renderItem = ({item}) => {
      const currentUser = item.members.filter(
        (it) => it.id + '' !== user.info.id + '',
      )[0];

      const formatTime = (date) => {
        if (
          moment().format('L') ===
          moment(item.lastMassage.createdAt).format('L')
        ) {
          return moment(item.lastMassage.createdAt).format('HH:MM A');
        } else if (
          moment().year() !== moment(item.lastMassage.createdAt).year()
        ) {
          return moment(item.lastMassage.createdAt).format('DD/MM/YY');
        } else {
          return moment(item.lastMassage.createdAt).format('DD/MM');
        }
      };
      const checkIsMyMessage = () =>
        item.lastMassage.from.id + '' === user.info.id + '';

      return (
        <TouchableOpacity
          style={styles.message}
          onPress={() => {
            setGroupCurrent(item.id);
            if (!item.lastMassage.seen) {
              queryData(SEEN_MESSAGE, {id: item.lastMassage.id})
                .then(({data}) => {
                  console.log(data);
                  setSeenMessage(data.seenMessage, item.id);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            navigation.navigate('Room', {
              name: currentUser.name,
              avatar: currentUser.avatar,
              userIdTo: currentUser.id,
            });
          }}>
          <Image source={{uri: currentUser.avatar}} style={styles.avatar} />
          <View style={styles.main}>
            <View style={styles.detail}>
              <Text style={styles.name} numberOfLines={1}>
                {currentUser.name}
              </Text>
              {!checkIsMyMessage() && !item.lastMassage.seen && (
                <Image
                  source={require('../../assets/images/black-circle.png')}
                  style={{
                    width: 10,
                    height: 10,
                  }}
                />
              )}
            </View>
            <View style={styles.detail}>
              <Text
                numberOfLines={1}
                style={{
                  ...styles.content,
                  fontWeight: checkIsMyMessage()
                    ? 'normal'
                    : item.lastMassage.seen
                    ? 'normal'
                    : 'bold',
                }}>
                {item.lastMassage.type === 'IMAGE'
                  ? `${checkIsMyMessage() ? 'Bạn' : currentUser.name} ${
                      item.lastMassage.content
                    }`
                  : item.lastMassage.content}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...styles.createdAt,
                  fontWeight: checkIsMyMessage()
                    ? 'normal'
                    : item.lastMassage.seen
                    ? 'normal'
                    : 'bold',
                }}>
                {formatTime()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.containerChat}>
        {!loading ? (
          <>
            {groups && groups.length > 0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    colors={[COLORS.primary]}
                    refreshing={refresh}
                    onRefresh={() => setRefresh(true)}
                  />
                }
                data={groups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}></FlatList>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  paddingTop: 10,
                }}>
                Chưa có cuộc trò chuyện
              </Text>
            )}
            {/* <NewMessageButton /> */}
          </>
        ) : (
          <Spinner color={COLORS.primary} size="small" />
        )}
      </View>
    );
  });
};

export default Chats;

const styles = StyleSheet.create({
  containerChat: {
    marginVertical: 7,
    marginHorizontal: 12,
    flex: 1,
  },
  message: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  main: {
    marginLeft: 10,
    width: width - 24 - 65,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-around',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    width: width - 80 - 20,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    width: width - 80 - 100,
    fontSize: 15,
  },
  createdAt: {
    width: 80,
    textAlign: 'right',
    fontSize: 13,
  },
  active: {
    fontWeight: 'bold',
  },
});
