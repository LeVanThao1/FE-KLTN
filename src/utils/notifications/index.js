import {Toast} from 'native-base';

export const NotiError = (title, position = 'top') => {
  Toast.show({
    text: title,
    type: 'danger',
    position: position,
  });
};

export const NotiSuccess = (title, position = 'top') => {
  Toast.show({
    text: title,
    type: 'success',
    position: position,
    style: {
      backgroundColor: 'rgba(68, 108, 179, 1)',
    },
  });
};
