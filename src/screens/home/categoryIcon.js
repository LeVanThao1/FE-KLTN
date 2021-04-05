import React, {memo} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Icon} from 'native-base';

const CategoryIcon = () => {
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
        console.log('sadasdads');
      }}>
      <Icon name={item.name} type={item.type} style={styles.icon} />
      <View>
        <Text>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.category__container}>
      <View style={styles.category__row}>
        <FlatList
          //   style={styles.flat_list}
          data={listItem1}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
      <View style={styles.category__row}>
        <FlatList
          //   style={styles.flat_list}
          data={listItem2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    </View>
  );
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
  },
  icon: {
    color: 'rgba(68, 108, 179, 1)',
    transform: [{scaleX: 1}],
  },
});

export default memo(CategoryIcon);
