import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Textarea from 'react-native-textarea';

import Images from '../../assets/images/images';

const CreateStore = () => {
  const [text, setText] = useState('');
  return (
    <View>
      <View style={styles.images}>
        <ImageBackground source={Images.slider1} style={styles.image}>
          <Image source={Images.onepiece1} style={styles.avatar} />
        </ImageBackground>
      </View>
      <View style={styles.content}>
        <Text>Tên shop: </Text>
        <TextInput styles={styles.text} />
      </View>
      <View style={styles.des}>
        <Text>Mô tả shop:</Text>
        <Textarea
          containerStyle={styles.textareacont}
          style={styles.textarea}
          // onChangeText={this.onChange}
          // defaultValue={this.state.text}
          maxLength={120}
          placeholder={'ádasdasdasdas'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
  },
  image: {
    // flex: 1,
    width: '100%',
    height: 150,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 50,
    margin: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    height: 20,
    borderWidth: 1,
    borderColor: '#111',
  },
  textareacont: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
});

export default CreateStore;
