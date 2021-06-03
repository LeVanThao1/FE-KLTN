import {ReactNativeFile} from 'apollo-upload-client';
import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Icon} from 'native-base';
import React, {useContext, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SpeechToText from 'react-native-google-speech-to-text';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {mutateData} from '../../../../common';
import {COLORS, NOTIFI} from '../../../../constants';
import {
  SEND_MESSAGE,
  SEND_MESSAGE_GET_TO,
  SEND_MESSAGE_IMAGE,
  SEND_MESSAGE_IMAGE_GET_TO,
} from '../../../../query/message';
import {Notification} from '../../../../utils/notifications';
import styles from './styles';
const InputBox = ({userId}) => {
  return useObserver(() => {
    const {
      stores: {group},
    } = useContext(MobXProviderContext);
    const {
      messages,
      setMessages,
      setGroups,
      groups,
      setGroupCurrent,
      groupCurrent,
    } = group;
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
            to: groupCurrent,
            user: groupCurrent ? null : userId,
          },
        })
          .then(({data}) => {
            setMessages(data.sendMessageImage, groupCurrent);
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
        if (groupCurrent) {
          mutateData(SEND_MESSAGE_IMAGE, {
            dataMessageImage: {
              files: [
                new ReactNativeFile({
                  uri: res.path,
                  name: new Date() + '',
                  type: res.mime,
                }),
              ],
              to: groupCurrent,
            },
          })
            .then(({data}) => {
              setMessages(data.sendMessageImage, groupCurrent);
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
              setMessages(data.sendMessageImage);
              setGroupCurrent(sendMessageImage.to.id);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };
    const onSendPress = async () => {
      try {
        if (groupCurrent) {
          const {
            data: {sendMessage},
          } = await mutateData(SEND_MESSAGE, {
            dataMessage: {
              to: groupCurrent,
              content: message,
              type: 'TEXT',
              user: groupCurrent ? null : userId,
            },
          });
          setMessages(sendMessage, groupCurrent);
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
          setMessages(sendMessage);
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
        return;
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
            onPress={!message.trim() ? speechToTextHandler : onPress}
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
