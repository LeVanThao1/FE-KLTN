import React, {useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import styles from './styles';
import {COLORS} from '../../../../constants';
import ImageView from 'react-native-image-viewing';
import ImageFooter from '../ImageFooter';
const ChatMessage = (props) => {
  const {message, roomId, userId} = props;

  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const isMyMessage = () => {
    return message.from.id + '' === userId + '';
  };
  const formatTime = (date) => {
    if (moment().format('L') === moment(date).format('L')) {
      return moment(date).format('hh:mm a');
    } else if (moment().year() !== moment(date).year()) {
      return moment(date).format('hh:mm a DD/MM/YY');
    } else {
      return moment(date).format('hh:mm a DD/MM');
    }
  };
  return (
    <View
      style={{
        ...styles.container,
        alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
        alignItems: 'flex-end',
      }}>
      {!isMyMessage() && (
        <Image
          source={{uri: message.from.avatar}}
          style={{width: 20, height: 20, borderRadius: 20, marginRight: 2}}
        />
      )}
      {message.type === 'IMAGE' && (
        <ImageView
          images={message.images.map((t) => ({uri: t}))}
          imageIndex={index}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
          FooterComponent={({imageIndex}) => (
            <ImageFooter imageIndex={imageIndex} imagesCount={images.length} />
          )}
        />
      )}
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? COLORS.primary : 'white',
            marginLeft: isMyMessage() ? 80 : 0,
            marginRight: isMyMessage() ? 0 : 80,
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
          },
        ]}>
        {message.type === 'IMAGE' ? (
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}>
            {message.images.map((ig, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setIndex(i);
                  setIsVisible(true);
                }}>
                <Image
                  source={{uri: ig}}
                  style={{width: 70, height: 70, borderRadius: 10, margin: 5}}
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text
            style={{
              ...styles.message,
              color: isMyMessage() ? '#fff' : '#000',
            }}>
            {message.content}
          </Text>
        )}

        <Text
          style={{
            ...styles.time,
            color: isMyMessage() ? '#fff' : '#000',
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
          }}>
          {formatTime(message.createdAt)}
        </Text>
      </View>
      {isMyMessage() && (
        <Image
          source={{uri: message.from.avatar}}
          style={{width: 20, height: 20, borderRadius: 20, marginLeft: 2}}
        />
      )}
    </View>
  );
};

export default ChatMessage;
