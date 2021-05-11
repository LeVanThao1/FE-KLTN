import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Icon} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {mutateData} from '../../../../common';
import {COLORS, NOTIFI} from '../../../../constants';
import {
  SEND_MESSAGE,
  SEND_MESSAGE_IMAGE,
  SEND_MESSAGE_IMAGE_GET_TO,
} from '../../../../query/message';
import {Notification} from '../../../../utils/notifications';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import {ReactNativeFile} from 'apollo-upload-client';
import SpeechToText from 'react-native-google-speech-to-text';
import {useNavigation} from '@react-navigation/native';
const InputBox = ({roomId, userId}) => {
  return useObserver(() => {
    const {
      stores: {group},
    } = useContext(MobXProviderContext);
    const {messages, setMessages, setGroups, groups, setGroupCurrent} = group;
    const [message, setMessage] = useState('');
    const handleChoosePhoto = () => {
      ImagePicker.openPicker({
        multiple: true,
        maxFiles: 10,
        mediaType: 'photo',
      }).then((res) => {
        const files = res.map(
          (r) =>
            new ReactNativeFile({
              uri: r.path,
              name: new Date() + '',
              type: r.mime,
            }),
        );
        mutateData(SEND_MESSAGE_IMAGE, {
          dataMessageImage: {
            files,
            to: roomId,
            user: roomId ? null : userId,
          },
        })
          .then(({data}) => {
            setMessages(data.sendMessageImage, roomId);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };
    const handleTakenPhoto = () => {
      ImagePicker.openCamera({
        width: 1024,
        height: 720,
      }).then((res) => {
        if (roomId) {
          mutateData(SEND_MESSAGE_IMAGE, {
            dataMessageImage: {
              files: [
                new ReactNativeFile({
                  uri: res.path,
                  name: new Date() + '',
                  type: res.mime,
                }),
              ],
              to: roomId,
            },
          })
            .then(({data}) => {
              setMessages(data.sendMessageImage, roomId);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          mutateData(SEND_MESSAGE_IMAGE_GET_TO, {
            dataMessageImage: {
              files: [
                new ReactNativeFile({
                  uri: res.path,
                  name: new Date() + '',
                  type: res.mime,
                }),
              ],
              user: userId,
            },
          })
            .then(({data}) => {
              setMessages([data.sendMessageImage]);
              setGroupCurrent(sendMessage.to.id);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };
    const onSendPress = async () => {
      try {
        if (roomId) {
          const {
            data: {sendMessage},
          } = await mutateData(SEND_MESSAGE, {
            dataMessage: {
              to: roomId,
              content: message,
              type: 'TEXT',
              user: roomId ? null : userId,
            },
          });
          setMessages(sendMessage, roomId);
          setMessage('');
        } else {
          const {
            data: {sendMessage},
          } = await mutateData(SEND_MESSAGE_GET_TO, {
            dataMessage: {
              content: message,
              type: 'TEXT',
              user: userId,
            },
          });
          setMessages([sendMessage]);
          setGroupCurrent(sendMessage.to.id);
          setMessage('');
        }
      } catch (err) {
        console.log(err);
        Toast.show(Notification(NOTIFI.error, err.message));
      }
    };

    const onPress = () => {
      if (!message.trim()) {
        console.log(1);
      } else {
        onSendPress();
      }
    };

    const speechToTextHandler = async (field) => {
      try {
        const speechToTextData = await SpeechToText.startSpeech(
          'Please saying something',
          'vi-VN',
        );
        setMessage(speechToTextData);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={{width: '100%'}}>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            {/* <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
              }}>
              <Icon
                type="AntDesign"
                name="smile-circle"
                style={{color: COLORS.primary, fontSize: 20}}
              />
            </View> */}
            <TextInput
              placeholder={'Type a message'}
              style={styles.textInput}
              multiline
              value={message}
              onChangeText={setMessage}
            />
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
              }}>
              <TouchableOpacity onPress={handleChoosePhoto}>
                <Icon
                  type="Entypo"
                  name="images"
                  style={{color: COLORS.primary, fontSize: 20}}
                />
              </TouchableOpacity>

              {!message && (
                <TouchableOpacity onPress={handleTakenPhoto}>
                  <Icon
                    name="camera"
                    size={24}
                    type="Entypo"
                    style={{color: COLORS.primary, fontSize: 20}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={speechToTextHandler}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
            }}>
            <View style={styles.buttonContainer}>
              {!message.trim() ? (
                <Icon
                  type="FontAwesome"
                  name="microphone"
                  style={{color: '#fff', fontSize: 20}}
                />
              ) : (
                <Icon
                  type="FontAwesome"
                  name="send"
                  style={{color: '#fff', fontSize: 20}}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  });
};

export default InputBox;
