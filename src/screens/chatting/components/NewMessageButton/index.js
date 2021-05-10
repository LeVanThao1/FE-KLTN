import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';

const NewMessageButton = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Contacts');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon type="Entypo" name="new-message" style={{color: '#fff'}} />
      </TouchableOpacity>
    </View>
  );
};

export default NewMessageButton;
