import {Text, View} from 'native-base';
import React from 'react';
import CreateStore from './createStore';
import ManageStore from './manageStore';

const Store = () => {
  return (
    <View>
      <CreateStore />
      <ManageStore />
    </View>
  );
};

export default Store;
