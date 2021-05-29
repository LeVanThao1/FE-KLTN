import React, {useContext, useState, useEffect} from 'react';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import {COLORS} from '../../constants/themes';
import {mutateData} from '../../common';
import {
  SEEN_NOTIFICATION_BOOK,
  SEEN_NOTIFICATION_ORDER,
  SEEN_NOTIFICATION_POST,
} from '../../query/notification';

const icon = {
  book: {
    type: 'FontAwesome',
    name: 'book',
  },
  post: {
    type: 'MaterialCommunityIcons',
    name: 'post',
  },
  order: {
    type: 'MaterialCommunityIcons',
    name: 'sale',
  },
};

const NotificationScreen = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {notification},
    } = useContext(MobXProviderContext);
    const [selected, setSelected] = useState('order');
    const route = {
      book: {
        linkID: (item) => item.commentBook.book.id,
        screen: 'Detail-Product',
        id: 'productId',
        mutate: SEEN_NOTIFICATION_BOOK,
      },
      post: {
        linkID: (item) => item.commentPost.post.id,
        screen: 'PostDetail',
        id: 'postID',
        mutate: SEEN_NOTIFICATION_POST,
      },
      order: {
        linkID: (item) => item.order.id,
        screen: 'OrderDetail',
        id: 'id',
        mutate: SEEN_NOTIFICATION_ORDER,
      },
    };
    useEffect(() => {
      console.log(
        notification[selected].map((item) => item[route[selected].linkID]),
      );
    }, [selected]);
    const SideBarIcon = ({name}) => (
      <TouchableOpacity onPress={() => setSelected(name)}>
        <View
          style={
            name === selected
              ? styles.buttonActiveContainer
              : styles.buttonInactiveContainer
          }>
          {name === selected ? <View style={styles.activeMark} /> : null}
          <Icon
            type={icon[name].type}
            name={icon[name].name}
            style={name === selected ? styles.activeIcon : styles.icon}
          />
        </View>
      </TouchableOpacity>
    );
    const NotificationItem = ({item}) => (
      <TouchableOpacity
        onPress={() => {
          if (!item.seen) {
            mutateData(route[selected].mutate, {id: item.id})
              .then(({data}) => {
                if (selected == 'post') {
                  const findIndex = notification.post.findIndex(
                    (dt) => dt.id + '' === item.id + '',
                  );
                  notification.setPost([
                    ...notification.post.slice(0, findIndex),
                    {...notification.post[findIndex], seen: true},
                    ...notification.post.slice(findIndex + 1),
                  ]);
                }
                if (selected == 'order') {
                  const findIndex = notification.order.findIndex(
                    (dt) => dt.id + '' === item.id + '',
                  );
                  notification.setOrder([
                    ...notification.order.slice(0, findIndex),
                    {...notification.order[findIndex], seen: true},
                    ...notification.order.slice(findIndex + 1),
                  ]);
                }
                if (selected == 'book') {
                  const findIndex = notification.book.findIndex(
                    (dt) => dt.id + '' === item.id + '',
                  );
                  notification.setBook([
                    ...notification.book.slice(0, findIndex),
                    {...notification.book[findIndex], seen: true},
                    ...notification.book.slice(findIndex + 1),
                  ]);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
          navigation.navigate(route[selected].screen, {
            [route[selected].id]: route[selected].linkID(item),
          });
        }}>
        <View
          style={{
            ...styles.itemContainer,
            backgroundColor: !item.seen ? '#e2f7dc' : '#fff',
          }}>
          <View style={styles.itemTopContainer}>
            <View style={styles.itemTypeContainer}>
              <Icon
                type={icon[item.type]?.type}
                name={icon[item.type]?.name}
                style={styles.notificationIcon}
              />
            </View>
            <View style={styles.itemTopTextContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDate}>
                {item.createdAt?.slice(0, 16).replace('T', '  ')}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.bodyContainer}>
          <View>
            <SideBarIcon name="order" />
            <SideBarIcon name="post" />
            <SideBarIcon name="book" />
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={notification[selected].map((e) => ({...e, type: selected}))}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <NotificationItem item={item} />}
            />
          </View>
        </View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
    flexDirection: 'row',
  },
  buttonActiveContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  buttonInactiveContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  activeMark: {
    backgroundColor: '#1e88e5',
    width: 4,
  },
  icon: {
    color: '#949494',
    fontSize: 22,
  },
  activeIcon: {
    padding: 12,
    marginLeft: -4,
    color: '#949494',
    fontSize: 22,
  },
  listContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#e5e5e5',
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  itemTopContainer: {
    flexDirection: 'row',
  },
  itemTypeContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  itemTopTextContainer: {
    marginRight: 40,
    marginLeft: 4,
  },
  itemTitle: {
    color: '#000',
    fontWeight: '700',
  },
  itemDate: {
    color: '#787878',
    fontSize: 12,
    marginTop: 8,
  },
  itemDescription: {
    color: '#787878',
    marginTop: 12,
  },
  notificationIcon: {
    color: '#fff',
    fontSize: 18,
  },
});

export default NotificationScreen;
