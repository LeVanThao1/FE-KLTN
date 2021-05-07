import React, {memo, useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Icon} from 'native-base';
import {GET_CATEGORIES} from '../../query/category';
import {useLazyQuery} from '@apollo/client';
import {MobXProviderContext, useObserver} from 'mobx-react';
import Toast from 'react-native-toast-message';
import {Notification} from '../../utils/notifications';
import {NOTIFI} from '../../constants';

const CategoryIcon = () => {
  return useObserver(() => {
    const {
      stores: {category},
    } = useContext(MobXProviderContext);
    // const [categories, setCategories] = useState([]);
    const {categories, setCategory} = category;
    const [listItem, setListItem] = useState(null);
    const [getCategories, {called, loading, data, error}] = useLazyQuery(
      GET_CATEGORIES,
      {
        onCompleted: async (data) => {
          setCategory(data.categories);
          setListItem(
            data.categories.map((ct, i) => ({
              id: ct.id,
              name: 'database',
              type: 'AntDesign',
              description: ct.name,
            })),
          );
        },
        onError: (err) => {
          console.log(err);
          Toast.show(Notification(NOTIFI.error, err.message));
        },
      },
    );
    useEffect(() => {
      getCategories();
    }, []);

    const listItem1 = [
      {
        id: 1,
        name: 'database',
        type: 'AntDesign',
        description: 'Danh mục',
      },
      {
        id: 2,
        name: 'database',
        type: 'AntDesign',
        description: 'Danh mục',
      },
      {
        id: 3,
        name: 'database',
        type: 'AntDesign',
        description: 'Danh mục',
      },
      {
        id: 4,
        name: 'database',
        type: 'AntDesign',
        description: 'Danh mục',
      },
      {
        id: 5,
        name: 'database',
        type: 'AntDesign',
        description: 'Danh mục',
      },
    ];
    const listItem2 = [
      {
        id: 6,
        name: 'database',
        type: 'AntDesign',
        description: 'Danh mục',
      },
      {
        id: 7,
        name: 'database',
        type: 'AntDesign',
        description: 'Danh mục',
      },
      {
        id: 8,
        name: 'database',
        type: 'AntDesign',
        description: 'Danh mục',
      },
      {
        id: 9,
        name: 'database',
        type: 'AntDesign',
        description: 'Danh mục',
      },
      {
        id: 10,
        name: 'database',
        type: 'AntDesign',
        description: 'Danh mục',
      },
    ];
    const renderItem = ({item}) => (
      <View
        style={styles.flat_list}
        onPress={() => {
          // navigator
        }}>
        <Icon name={item.name} type={item.type} style={styles.icon} />
        <View>
          <Text numberOfLines={2} style={{textAlign: 'center'}}>
            {item.description}
          </Text>
        </View>
      </View>
    );

    return (
      <>
        {categories && (
          <View style={styles.category__container}>
            <View style={styles.category__row}>
              {/* <FlatList
          //   style={styles.flat_list}
          data={listItem1}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        /> */}
            </View>
            <View style={styles.category__row}>
              <FlatList
                //   style={styles.flat_list}
                data={listItem && listItem}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
              />
            </View>
          </View>
        )}
      </>
    );
  });
};

const styles = StyleSheet.create({
  category__container: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: 20,
  },
  category__row: {
    flexDirection: 'row',
  },
  flat_list: {
    padding: 4,
    margin: 4,
    alignItems: 'center',
    width: 100,
  },
  icon: {
    color: '#f44f4f',
    transform: [{scaleX: 1}],
  },
});

export default memo(CategoryIcon);
