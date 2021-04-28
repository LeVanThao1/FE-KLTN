import {StyleSheet} from 'react-native';

export const button = StyleSheet.create({
  btn: {
    padding: 10,
    backgroundColor: 'rgba(68, 108, 179, 1)',
    color: '#fff',
    textAlign: 'center',
    width: 100,
    marginVertical: 20,
  },

  addPost: {
    position: 'absolute',
    // flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(68, 108, 179, 1)',
    borderRadius: 50,
    top: 40,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  btnAdd: {
    width: 60,
    height: 60,
    fontSize: 50,
  },
});
