export const Notification = (type, msg1, msg2) => ({
  type: type,
  position: 'top',
  text1: msg1,
  text2: msg2,
  visibilityTime: 300,
  autoHide: true,
  topOffset: 10,
});
