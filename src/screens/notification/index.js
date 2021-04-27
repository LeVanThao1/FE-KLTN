import React, {useContext, useState, useEffect} from 'react';
import {useObserver} from 'mobx-react-lite';
import {MobXProviderContext} from 'mobx-react';
import {StyleSheet, View, StatusBar, FlatList, Text, TouchableOpacity} from 'react-native';
import {Icon} from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const icon = {
  book: {
    type: "FontAwesome",
    name: "book"
  },
  post: {
    type: "MaterialCommunityIcons",
    name: "post"
  },
  order: {
    type: "MaterialCommunityIcons",
    name: "sale"
  },
}

const route = {
  book: {
    linkID: "commentBook",
    screen: "Detail-Product",
    id: "productId"
  },
  post: {
    linkID: "commentPost",
    screen: "PostUser",
    id: "postId"
  },
  order: {
    linkID: "order",
    screen: "OrderDetail",
    id: "id"
  }
}

const NotificationScreen = ({navigation}) => {
  return useObserver(()=>{
    const {
      stores: {
        user: {
          info:{notifications}
        },
      },
    } = useContext(MobXProviderContext);
    const [noti, setNoti] = useState(notifications);
    const [selected, setSelected] = useState("order")
    useEffect(() => {
     console.log(noti[selected]);
    }, [selected])
    const SideBarIcon = ({name}) =>(
      <TouchableOpacity onPress={()=>setSelected(name)}>
        <View style={name === selected ? styles.buttonActiveContainer : styles.buttonInactiveContainer}>
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
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <View style={styles.itemTopContainer}>
            <View
              style={styles.itemTypeContainer}
            >
              <Icon
                type={icon[item.type]?.type}
                name={icon[item.type]?.name}
                style={styles.notificationIcon}
              />
            </View>
            <View style={styles.itemTopTextContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDate}>{item.createdAt?.slice(0,16).replace("T", "  ")}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.itemDescription} >{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.bodyContainer}>
          <View>
            <SideBarIcon name="order"/>
            <SideBarIcon name="post"/>
            <SideBarIcon name="book"/>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={noti[selected].map(e=> ({...e, type: selected}))}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <NotificationItem item={item} />}
            />
          </View>
        </View>
      </View>
    );

  })
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#ededed"
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
  icon:{
    color:"#949494",
    fontSize: 22
  },
  activeIcon: {
    padding: 12,
    // trick
    marginLeft: -4,
    color:"#949494",
    fontSize: 22
  },
  //
  listContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#e5e5e5',
  },
  //
  itemContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    marginBottom: 8
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
    backgroundColor: 'rgba(68, 108, 179, 1)',
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
    // fontSize: 12,
    marginTop: 12,
  },
  notificationIcon:{
    color: "#fff",
    fontSize: 18
  }
});

export default NotificationScreen;