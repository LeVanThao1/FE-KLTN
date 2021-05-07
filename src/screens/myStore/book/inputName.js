import {useLazyQuery, useMutation} from '@apollo/client';
import {MobXProviderContext, useObserver} from 'mobx-react';
import {Icon, Text, View} from 'native-base';
import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {ScrollView} from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import {Form, Item, Picker, Button} from 'native-base';
import {CREATE_BOOK, GET_RECOMMENT_BY_NAME} from '../../../query/book';
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {UPLOAD_MULTI_FILE} from '../../../query/upload';
import {ReactNativeFile} from 'extract-files';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {queryData} from '../../../common';
import Menu, {MenuItem} from 'react-native-material-menu';
import {styles} from './styles';
import Toast from 'react-native-toast-message';
import {Notification} from '../../../utils/notifications';
import {NOTIFI} from '../../../constants';
import Voice from '@react-native-community/voice';

const InputName = () => {
  return useObserver(() => {
    const {
      stores: {createBook},
    } = useContext(MobXProviderContext);
    const {
      name,
      setName,
      book,
      setBook,
      booksRecomment,
      setBooksRecomment,
    } = createBook;

    const [isModalVisible, setIsModalVisible] = useState(true);

    const refName = useRef(null);
    const [isVoice, setIsVoice] = useState(false);

    const onChangeTextName = (value, type) => {
      if (refName.current) {
        clearTimeout(refName.current);
      }
      setName({
        error: '',
        value: value,
      });
      if (value.length === 0) {
        setBooksRecomment(undefined);
        return;
      }

      refName.current = setTimeout(() => {
        queryData(GET_RECOMMENT_BY_NAME, {
          name: value,
          type: 'unsignedName',
        })
          .then(({data}) => {
            setBooksRecomment(data.getRecommentByName);
          })
          .catch((err) => console.log(err));
      }, 300);
    };

    const filterNumber = (data) => {
      if (!isNaN(data[0].replace('.', ''))) return +data.replace('.', '');
      return data.filter((dt, i) => {
        const tamp = dt.replace('.', '');
        if (!isNaN(tamp)) return +tamp;
      })[0];
    };

    useEffect(() => {
      function onSpeechStart(e) {}
      function onSpeechResults(e) {
        console.log('onSpeechResults: ', e);
        setName({...name, value: e.value[0]});
      }
      function onSpeechPartialResults(e) {}
      function onSpeechVolumeChanged(e) {}
      function onSpeechEnd(e) {
        console.log('end', e);
        Voice.removeAllListeners();
        setIsVoice(false);
      }
      function onSpeechError(e) {
        console.log('error', e);
        setIsVoice(false);
      }
      Voice.onSpeechStart = onSpeechStart;
      Voice.onSpeechEnd = onSpeechEnd;
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechPartialResults = onSpeechPartialResults;
      Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    }, []);
    const voice = async () => {
      setIsVoice(true);
      await Voice.start('vi-VN');
    };
    const stop = async () => {
      setIsVoice(false);
      await Voice.stop();
    };
    return (
      <>
        <View>
          <TextInput
            style={styles.txtMaxWidth}
            placeholder="Nhập tên sản phẩm"
            value={name.value}
            onFocus={() => {
              setIsModalVisible(true);
              onChangeTextName(name.value, 'unsignedName');
              setName({...name, error: ''});
              setBook(undefined);
            }}
            onChangeText={(value) => {
              onChangeTextName(value, 'unsignedName');
            }}
            onEndEditing={() => {}}
          />
          {isVoice ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                height: '100%',
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                stop();
              }}>
              <Icon
                type="FontAwesome"
                name="stop"
                style={{
                  fontSize: 30,
                  color: 'red',
                }}></Icon>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                height: '100%',
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                voice();
              }}>
              <Icon
                type="FontAwesome"
                name="microphone"
                style={{
                  fontSize: 30,
                }}></Icon>
            </TouchableOpacity>
          )}
        </View>
        {isModalVisible && booksRecomment && booksRecomment.length > 0 && (
          <ScrollView style={styles.listRecomment}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
              }}>
              <Text>Gợi ý</Text>
              <TouchableOpacity
                style={{paddingVertical: 3}}
                onPress={() => {
                  setAuthor({...author, value: ''});
                  setIsModalVisible(false);
                }}>
                <Icon
                  type="AntDesign"
                  name="close"
                  style={{
                    fontSize: 22,
                    // color: 'red',
                  }}></Icon>
              </TouchableOpacity>
            </View>
            {booksRecomment.map((bk) => (
              <TouchableOpacity
                style={styles.recomment}
                onPress={() => {
                  setBook(bk);
                  setName({...name, value: bk.name});
                  setIsModalVisible(false);
                }}>
                <Image
                  source={require('../../../assets/images/dinosaurRevert.png')}
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'stretch',
                  }}></Image>
                <View style={styles.content}>
                  <View style={styles.content_main}>
                    <Text style={styles.content_name} numberOfLines={1}>
                      {bk.name}
                    </Text>
                    <Text style={styles.content_author}>
                      Tác giả: {bk.author}
                    </Text>
                    <Text style={styles.content_description} numberOfLines={2}>
                      Mô tả: {bk.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </>
    );
  });
};

export default memo(InputName);
