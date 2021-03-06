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
import RNReactNativeSoundToast from 'react-native-sound-toast';
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
      setIsActive,
    } = group;
    const [loading, setLoading] = useState(true);
    const [loadMore, setLoadMore] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [option, setOption] = useState({
      limit: 20,
      page: 1,
    });
    const [stop, setStop] = useState(false);
    // const {data} = useSubscription(RECEIVE_MESSAGE, {
    //   variables: {
    //     userId: user.info.id,
    //   },
    // });
    // useEffect(() => {
    //   if (data) {
    //     if (groupCurrent) {
    //       setMessages(data.receiveMessage);
    //       queryData(SEEN_MESSAGE, {id: data.receiveMessage.id})
    //         .then((dt) => {
    //           console.log(dt.data);
    //           setSeenMessage(dt.data.seenMessage, groupCurrent);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     } else {
    //       if (
    //         groups.find((it) => it.id + '' === data.receiveMessage.to.id + '')
    //       ) {
    //         const tamp = [...groups].filter(
    //           (it) => it.id + '' !== data.receiveMessage.to.id + '',
    //         );
    //         setGroups([data.receiveMessage.to, ...tamp]);
    //       } else {
    //         setGroups([data.receiveMessage.to, ...groups]);
    //       }
    //       RNReactNativeSoundToast.playSound('message', 'wav');
    //     }
    //   }

    //   return () => {
    //     // cleanup;
    //   };
    // }, [data]);
    useEffect(() => {
      setIsActive(true);
      setLoading(true);
      queryData(GET_GROUP, option)
        .then(({data}) => {
          setGroups(data.groups);
          if (data.groups.length < 20) {
            setStop(true);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          Toast.show(Notification(NOTIFI.error, err.message));
        });
      return () => {
        setIsActive(false);
      };
    }, []);
    useEffect(() => {
      if (option.page != 1 && !stop) {
        setLoadMore(true);
        queryData(GET_GROUP, option)
          .then(({data}) => {
            if (data.groups.length > 0) {
              setGroups((cur) => [...cur, ...data.groups]);
              if (data.groups.length < 20) {
                setStop(true);
              }
            } else {
              setOption((cur) => ({
                ...cur,
                page: cur.page - 1,
              }));
            }
            setLoadMore(false);
          })
          .catch((err) => {
            setLoadMore(false);
            console.log(err, 'chat');
            Toast.show(Notification(NOTIFI.error, err.message));
          });
      }
    }, [option]);

    useEffect(() => {
      if (refresh) {
        setOption({limit: 20, page: 1});
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
          moment(date).format('L')
        ) {
          return moment(date).format('hh:mm a');
        } else if (
          moment().year() !== moment(date).year()
        ) {
          return moment(date).format('DD/MM/YY');
        } else {
          return moment(date).format('DD/MM');
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
              name: currentUser?.store?.name
                ? currentUser?.store?.name
                : currentUser?.name,
              avatar: currentUser?.store?.avatar
                ? currentUser?.store?.avatar
                : currentUser?.avatar,
              userIdTo: currentUser.id,
              storeId: currentUser?.store?.id,
            });
          }}>
          <Image
            source={{
              uri: currentUser?.store?.avatar
                ? currentUser?.store?.avatar
                : currentUser?.avatar,
            }}
            style={styles.avatar}
          />
          <View style={styles.main}>
            <View style={styles.detail}>
              <Text style={styles.name} numberOfLines={1}>
                {currentUser?.store?.name
                  ? currentUser?.store?.name
                  : currentUser?.name}
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
                  ? `${checkIsMyMessage() ? 'B???n' : currentUser.name} ${
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
                {formatTime(item.lastMassage.createdAt)}
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
                onEndReached={() => {
                  !stop && setOption((cur) => ({...cur, page: cur.page + 1}));
                }}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() =>
                  loadMore && <Spinner color={COLORS.primary} size="small" />
                }
                keyExtractor={(item) => item.id}></FlatList>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  paddingTop: 10,
                }}>
                Ch??a c?? cu???c tr?? chuy???n
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
